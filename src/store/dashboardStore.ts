import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// src/store/dashboardStore.ts
export interface Candidate {
  id: string;               // Use filename as ID
  name: string;
  file_name: string;
  fitScore: number;         // 0-100 percentage
  overall_similarity: number; // 0-1 fraction
  llm_fit_score: number;    // 0-100 percentage
  skills: {
    exact_matches: string[];
    transferable: string[]; // Matches backend's "transferable_skills"
    non_technical: string[];
  };
  education_highlights: string;
  experience_highlights: string;
  summary: string;
  justification: string;
  email: string;
  mobile_number: string;
  resume_content: string;   // Added resume content field
}

export type ProcessingStage = 'upload' | 'screening' | 'analysis' | 'complete' | 'error';

export interface ProcessingState {
  isProcessing: boolean;
  currentStage: ProcessingStage;
  progress: number;
  uploadedFiles: number;
  timings: {
    upload: number;
    screening: number;
    analysis: number;
    total: number;
  };
}

interface DashboardState {
  userId: string | null; // Track which user owns this state
  jobDescription: string;
  jobTitle: string;
  uploadedFiles: File[];
  candidates: Candidate[];
  selectedCandidates: string[];
  processing: ProcessingState;
  selectedCandidate: string | null;
  showComparison: boolean;
  showJobDetails: boolean;
  runId: string | null;
  setUserId: (userId: string | null) => void;
  setJobDescription: (desc: string) => void;
  setJobTitle: (title: string) => void;
  setUploadedFiles: (files: File[]) => void;
  addUploadedFile: (file: File) => void;
  removeUploadedFile: (fileName: string) => void;
  setCandidates: (candidates: Candidate[]) => void;
  setSelectedCandidates: (ids: string[]) => void;
  setProcessing: (processing: ProcessingState) => void;
  setSelectedCandidate: (id: string | null) => void;
  setShowComparison: (show: boolean) => void;
  setShowJobDetails: (show: boolean) => void;
  setRunId: (runId: string | null) => void;
  toggleCandidateSelection: (id: string) => void;
  resetState: () => void;
  clearUserData: () => void; // Clear all user-specific data
}

const initialProcessingState: ProcessingState = {
  isProcessing: false,
  currentStage: 'upload',
  progress: 0,
  uploadedFiles: 0,
  timings: {
    upload: 0,
    screening: 0,
    analysis: 0,
    total: 0,
  },
};

const initialState = {
  userId: null,
  jobDescription: '',
  jobTitle: '',
  uploadedFiles: [],
  candidates: [],
  selectedCandidates: [],
  processing: initialProcessingState,
  selectedCandidate: null,
  showComparison: false,
  showJobDetails: false,
  runId: null,
};

// Single store instance - no complex recreation
const createDashboardStore = () => {
  return create<DashboardState>()(
    persist(
      (set, get) => ({
        ...initialState,

        setUserId: (userId) => {
          const currentState = get();
          // Only clear data if userId actually changed
          if (currentState.userId && currentState.userId !== userId) {
            console.log('User changed, clearing dashboard data');
            set({ ...initialState, userId });
          } else {
            set({ userId });
          }
        },
        
        setJobDescription: (desc) => set({ jobDescription: desc }),
        setJobTitle: (title) => set({ jobTitle: title }),
        
        setUploadedFiles: (files) => {
          console.log('Setting uploaded files:', files.length);
          set({ uploadedFiles: files });
        },
        
        addUploadedFile: (file) => {
          console.log('Adding uploaded file:', file.name);
          set((state) => {
            const newFiles = [file, ...state.uploadedFiles].filter(f => f && f.name);
            console.log('New uploaded files array:', newFiles.length);
            return { uploadedFiles: newFiles };
          });
        },
        
        removeUploadedFile: (fileName) => {
          console.log('Removing uploaded file:', fileName);
          set((state) => ({
            uploadedFiles: state.uploadedFiles.filter(f => f && f.name && f.name !== fileName)
          }));
        },
        
        setCandidates: (candidates) => set({ candidates }),
        
        setSelectedCandidates: (ids) => set({ selectedCandidates: ids }),
        
        setProcessing: (processing) => set({ processing }),
        
        setSelectedCandidate: (id) => set({ selectedCandidate: id }),
        
        setShowComparison: (show) => set({ showComparison: show }),
        
        setShowJobDetails: (show) => set({ showJobDetails: show }),
        
        setRunId: (runId) => set({ runId }),
        
        toggleCandidateSelection: (id) => set((state) => {
          const isSelected = state.selectedCandidates.includes(id);
          const newSelection = isSelected 
            ? state.selectedCandidates.filter(cId => cId !== id)
            : state.selectedCandidates.length < 3 
              ? [...state.selectedCandidates, id] 
              : state.selectedCandidates;
          
          return { selectedCandidates: newSelection };
        }),
        
        resetState: () => set({
          ...initialState,
          userId: get().userId,
        }),

        clearUserData: () => set({
          ...initialState,
          userId: null,
        }),
      }),
      {
        name: 'dashboard-storage',
        partialize: (state) => ({
          userId: state.userId,
          jobDescription: state.jobDescription,
          jobTitle: state.jobTitle,
          uploadedFiles: state.uploadedFiles,
          candidates: state.candidates,
          processing: state.processing,
          runId: state.runId,
        }),
      }
    )
  );
};

// Single store instance
const dashboardStore = createDashboardStore();

// Export the hook that properly subscribes to changes
export const useDashboardStore = () => {
  return dashboardStore();
};

// Function to initialize dashboard store for a specific user
export const initializeDashboardStore = (userId: string | null) => {
  console.log('Initializing dashboard store for user:', userId);
  
  // Set the user ID without recreation
  const store = dashboardStore.getState();
  store.setUserId(userId);
  
  return dashboardStore;
};

// Function to clear dashboard store (for logout)
export const clearDashboardStore = () => {
  console.log('Clearing dashboard store data');
  const store = dashboardStore.getState();
  store.clearUserData();
};
