import axios from 'axios';
import JSZip from 'jszip';
import { Candidate } from '../store/dashboardStore';
import { useAuthStore } from '../store/authStore';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const { accessToken, checkTokenValidity, logout } = useAuthStore.getState();
    
    // Check token validity before each request
    if (accessToken && !checkTokenValidity()) {
      console.log('Token expired during request, logging out');
      logout();
      window.location.href = '/login';
      return Promise.reject(new Error('Token expired'));
    }
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log('Added authorization header to request');
    } else {
      console.log('No access token available');
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Response error:', error.response?.status, error.response?.data);
    
    if (error.response?.status === 401) {
      console.log('401 Unauthorized - redirecting to login');
      const { logout } = useAuthStore.getState();
      logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface RankRequest {
  job_desc: string;
  job_role: string;
  files: File[];
}

export interface InterviewQuestion {
  question: string;
  skill_type: string;
  difficulty: string;
}

export interface InterviewQuestionsResponse {
  candidate_name: string;
  questions: InterviewQuestion[];
}

export interface GenerateQuestionsRequest {
  screening_run_id: string;
  resume_id: string;
  num_questions: number;
  soft_skills_flag: boolean;
  hard_skills_flag: boolean;
  soft_skills_focus: string;
  hard_skills_focus: string;
  include_coding: boolean;
}

export interface RankResponse {
  run_id: string;
  user_id?: string; // Make user_id optional since backend might not always return it
  candidates: Candidate[];
}

export interface ScreeningRun {
  id: string;
  job_details_id: string;
  job_role: string;
  job_description: string;
  batch_id: string;
  run_start_time: string;
  run_end_time: string;
  time_taken: number;
  created_at: string;
  candidates: ScreeningCandidate[];
}

export interface ScreeningCandidate {
  resume_id: string;
  candidate_name: string;
  file_name: string;
  ai_fit_score: number;
  skill_similarity: number;
  candidate_summary: string;
  skill_assessment: {
    exact_matches: string[];
    transferable_skills: string[];
    non_technical_skills: string[];
  };
  experience_highlights: string;
  education_highlights: string;
  gaps: string[];
  ai_justification: string;
  resume_content_preview: string;
  questions_generated: boolean;
  generated_questions: {
    question: string;
    skill_type: string;
    difficulty: string;
  }[];
}

export interface ScreeningRunsResponse {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  results: ScreeningRun[];
}

export interface ScreeningRunsRequest {
  user_id: string;
  start_date: string;
  end_date: string;
  page?: number;
  limit?: number;
}

export interface UserSettingsRequest {
  user_id: string;
  phase1_ranking_number: number;
  phase2_ranking_number: number;
  number_of_questions_to_generate: number;
}

export interface UserSettingsResponse {
  status: string;
  message: string;
  user_id: string;
  phase1_ranking_number: number;
  phase2_ranking_number: number;
  number_of_questions_to_generate: number;
}

export interface ResetPasswordRequest {
  email: string;
  old_password: string;
  new_password: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export const rankCandidates = async (request: RankRequest): Promise<RankResponse> => {
  console.log('rankCandidates called with:', { 
    job_desc_length: request.job_desc.length, 
    job_role_length: request.job_role.length,
    files_count: request.files.length 
  });

  // Verify authentication before proceeding
  const { isAuthenticated, accessToken, checkTokenValidity, user } = useAuthStore.getState();
  
  if (!isAuthenticated || !accessToken || !checkTokenValidity() || !user?.userId) {
    throw new Error('User not authenticated or missing user ID');
  }

  console.log('Current user from auth store:', user.userId);

  const formData = new FormData();
  formData.append('user_id', user.userId);
  formData.append('job_desc', request.job_desc);
  formData.append('job_role', request.job_role);

  // Create zip only if files are provided
  if (request.files.length > 0) {
    const zip = new JSZip();
    
    // Process each file - if it's already a ZIP, extract and re-add PDFs, otherwise add directly
    for (const file of request.files) {
      if (file.name.toLowerCase().endsWith('.zip')) {
        // If it's already a ZIP file, extract it and add individual PDFs
        try {
          const zipContent = await JSZip.loadAsync(file);
          
          // Process each file in the ZIP
          await Promise.all(Object.keys(zipContent.files).map(async (relativePath) => {
            const zipEntry = zipContent.files[relativePath];
            
            // Skip directories
            if (zipEntry.dir) return;
            
            // Only process PDF files
            if (relativePath.toLowerCase().endsWith('.pdf')) {
              try {
                const content = await zipEntry.async('arraybuffer');
                // Use just the filename, not the full path
                const filename = relativePath.split('/').pop() || relativePath;
                zip.file(filename, content);
                console.log(`Added PDF from ZIP: ${filename}`);
              } catch (e) {
                console.error(`Error processing ${relativePath}:`, e);
              }
            }
          }));
        } catch (e) {
          console.error(`Error processing ZIP file ${file.name}:`, e);
        }
      } else if (file.name.toLowerCase().endsWith('.pdf')) {
        // Add PDF files directly
        const arrayBuffer = await file.arrayBuffer();
        zip.file(file.name, arrayBuffer);
        console.log(`Added PDF: ${file.name}`);
      }
    }
    
    // Check if we have any files in the ZIP
    const zipFiles = Object.keys(zip.files);
    console.log(`ZIP contains ${zipFiles.length} files:`, zipFiles);
    
    if (zipFiles.length === 0) {
      throw new Error('No PDF files found to process');
    }
    
    // Generate zip file with optimal settings for backend processing
    const zipBlob = await zip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 1 // Minimal compression for faster processing
      }
    });
    
    const zipFile = new File([zipBlob], 'resumes.zip', {
      type: 'application/zip',
    });
    
    console.log(`Final ZIP size: ${zipFile.size} bytes`);
    
    // Append zip to form data with the correct field name
    formData.append('files', zipFile);
  }

  try {
    // Debug: Log form data keys and file info
    console.log('FormData entries:');
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: ${value.name} (${value.type}, ${value.size} bytes)`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }

    console.log('Making API request to /rank/');
    const response = await api.post('/rank/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
      },
    });
    
    console.log('API response received:', response.data);
    console.log('Response user_id:', response.data.user_id);
    console.log('Current user_id:', user.userId);
    
    if (!response.data.candidates || !Array.isArray(response.data.candidates)) {
      console.error('Invalid response format:', response.data);
      throw new Error('Invalid response format: Expected candidates array');
    }

    // Always validate user ID since all backend APIs include it
    if (response.data.user_id !== user.userId) {
      console.error('User ID mismatch - Response user_id:', response.data.user_id, 'Current user_id:', user.userId);
      throw new Error('USER_ID_MISMATCH');
    }
    
    console.log('User IDs match, proceeding with results');
    
    // Transform backend response to match frontend Candidate interface and return with run_id
    const transformedCandidates = response.data.candidates.map((candidate: any) => ({
      id: candidate.id,
      name: candidate.name,
      file_name: candidate.file_name,
      fitScore: candidate.fitScore,
      overall_similarity: candidate.overall_similarity,
      llm_fit_score: candidate.llm_fit_score,
      total_experience: candidate.total_experience,
      skills: {
        exact_matches: candidate.skills.exact_matches || [],
        transferable: candidate.skills.transferable || [],
        non_technical: candidate.skills.non_technical || [],
      },
      education_highlights: candidate.education_highlights,
      experience_highlights: candidate.experience_highlights,
      summary: candidate.summary,
      justification: candidate.justification,
      email: candidate.email,
      mobile_number: candidate.mobile_number,
      resume_content: candidate.resume_content || ''
    }));

    return {
      run_id: response.data.run_id,
      user_id: response.data.user_id,
      candidates: transformedCandidates
    };
  } catch (error: any) {
    console.error('API error details:');
    console.error('URL:', `${API_BASE_URL}/rank/`);
    
    if (error.response) {
      // Server responded with error status
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      console.error('Data:', error.response.data);
      
      let errorMessage = `Server error: ${error.response.status}`;
      if (error.response.data && typeof error.response.data === 'object') {
        errorMessage += ` - ${JSON.stringify(error.response.data)}`;
      } else if (error.response.data) {
        errorMessage += ` - ${error.response.data}`;
      }
      
      throw new Error(errorMessage);
    } else if (error.request) {
      // No response received
      console.error('No response received:', error.request);
      throw new Error('No response from server. Check your network connection.');
    } else {
      // Other errors including USER_ID_MISMATCH
      console.error('Request setup error:', error.message);
      throw new Error(error.message);
    }
  }
};

export const generateInterviewQuestions = async (request: GenerateQuestionsRequest): Promise<InterviewQuestionsResponse> => {
  try {
    // Verify authentication before proceeding
    const { isAuthenticated, user } = useAuthStore.getState();
    
    if (!isAuthenticated || !user?.userId) {
      throw new Error('User not authenticated or missing user ID');
    }

    const params = new URLSearchParams({
      num_questions: request.num_questions.toString(),
      soft_skills_flag: request.soft_skills_flag.toString(),
      hard_skills_flag: request.hard_skills_flag.toString(),
      include_coding: request.include_coding.toString(),
    });

    const formData = new URLSearchParams();
    formData.append('user_id', user.userId);
    formData.append('screening_run_id', request.screening_run_id);
    formData.append('resume_id', request.resume_id);

    console.log('Generating interview questions...');
    
    const response = await api.post(`/questions/?${params}`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
    });
    
    console.log('Interview questions generated:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Interview questions generation error:', error);
    
    if (error.response) {
      throw new Error(`Server error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      throw new Error('No response from server. Check your network connection.');
    } else {
      throw new Error(`Request failed: ${error.message}`);
    }
  }
};

export const getScreeningRuns = async (request: ScreeningRunsRequest): Promise<ScreeningRunsResponse> => {
  try {
    // Verify authentication before proceeding
    const { isAuthenticated, user } = useAuthStore.getState();
    
    if (!isAuthenticated || !user?.userId) {
      throw new Error('User not authenticated or missing user ID');
    }

    const params = new URLSearchParams({
      user_id: request.user_id,
      start_date: request.start_date,
      end_date: request.end_date,
    });

    if (request.page) {
      params.append('page', request.page.toString());
    }

    if (request.limit) {
      params.append('limit', request.limit.toString());
    }

    console.log('Fetching screening runs...');
    
    const response = await api.get(`/screening_runs/?${params}`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    
    console.log('Screening runs fetched:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Screening runs fetch error:', error);
    
    if (error.response) {
      throw new Error(`Server error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      throw new Error('No response from server. Check your network connection.');
    } else {
      throw new Error(`Request failed: ${error.message}`);
    }
  }
};

export const saveUserSettings = async (request: UserSettingsRequest): Promise<UserSettingsResponse> => {
  try {
    // Verify authentication before proceeding
    const { isAuthenticated, user } = useAuthStore.getState();
    
    if (!isAuthenticated || !user?.userId) {
      throw new Error('User not authenticated or missing user ID');
    }

    const formData = new URLSearchParams();
    formData.append('user_id', request.user_id);
    formData.append('phase1_ranking_number', request.phase1_ranking_number.toString());
    formData.append('phase2_ranking_number', request.phase2_ranking_number.toString());
    formData.append('number_of_questions_to_generate', request.number_of_questions_to_generate.toString());

    console.log('Saving user settings...');
    
    const response = await api.post('/settings/', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
    });
    
    console.log('User settings saved:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('User settings save error:', error);
    
    if (error.response) {
      throw new Error(`Server error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      throw new Error('No response from server. Check your network connection.');
    } else {
      throw new Error(`Request failed: ${error.message}`);
    }
  }
};

export const resetPassword = async (request: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
  try {
    // Verify authentication before proceeding
    const { isAuthenticated, user } = useAuthStore.getState();
    
    if (!isAuthenticated || !user?.userId) {
      throw new Error('User not authenticated or missing user ID');
    }

    console.log('Resetting password...');
    
    const response = await api.post('/reset-password', request, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    console.log('Password reset successful:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Password reset error:', error);
    
    if (error.response) {
      throw new Error(`Server error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      throw new Error('No response from server. Check your network connection.');
    } else {
      throw new Error(`Request failed: ${error.message}`);
    }
  }
};
