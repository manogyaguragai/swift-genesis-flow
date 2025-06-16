import React from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { FileText, Sparkles, Briefcase } from 'lucide-react';

const JOB_TEMPLATES = [
  {
    title: "Software Engineer",
    description: "Full-stack developer position",
    content: `We are seeking a talented Software Engineer to join our dynamic team. The ideal candidate will have 3+ years of experience in full-stack development with expertise in modern web technologies.

Key Requirements:
• Bachelor's degree in Computer Science or related field
• Proficiency in JavaScript, React, Node.js
• Experience with cloud platforms (AWS, Azure, or GCP)
• Strong understanding of database technologies (SQL and NoSQL)
• Excellent problem-solving and communication skills
• Experience with Agile development methodologies

Responsibilities:
• Design and develop scalable web applications
• Collaborate with cross-functional teams
• Write clean, maintainable code
• Participate in code reviews and technical discussions
• Contribute to architectural decisions`
  },
  {
    title: "Medical Officer",
    description: "Healthcare professional position",
    content: `We are looking for a qualified Medical Officer to provide comprehensive medical care and support our healthcare initiatives.

Key Requirements:
• Medical degree (MBBS/MD) from accredited institution
• Valid medical license and board certification
• 2+ years of clinical experience
• Strong diagnostic and treatment skills
• Excellent communication and interpersonal skills
• Commitment to patient-centered care

Responsibilities:
• Conduct patient examinations and diagnoses
• Develop and implement treatment plans
• Maintain accurate medical records
• Collaborate with healthcare team members
• Stay updated with latest medical practices and research`
  },
  {
    title: "HR Manager",
    description: "Human resources leadership",
    content: `Lead our HR department and drive strategic initiatives to support organizational growth and employee development.

Key Requirements:
• Bachelor's degree in Human Resources, Business Administration, or related field
• 5+ years of HR management experience
• Strong knowledge of employment law and regulations
• Experience with HRIS systems and HR analytics
• Excellent interpersonal and communication skills
• Professional HR certification (SHRM-CP/SCP, PHR) preferred

Responsibilities:
• Develop and implement HR policies and procedures
• Oversee recruitment and talent acquisition
• Manage employee relations and performance management
• Lead compensation and benefits programs
• Ensure compliance with labor laws and regulations`
  },
  {
    title: "Finance Officer",
    description: "Financial management role",
    content: `Join our finance team to manage financial operations and provide strategic financial guidance to support business growth.

Key Requirements:
• Bachelor's degree in Finance, Accounting, or related field
• 3+ years of finance/accounting experience
• Strong knowledge of financial principles and practices
• Proficiency in financial software and Excel
• Excellent analytical and problem-solving skills
• Professional certification (CPA, CFA) preferred

Responsibilities:
• Prepare financial statements and reports
• Manage budgeting and forecasting processes
• Oversee accounts payable and receivable
• Conduct financial analysis and variance reporting
• Ensure compliance with financial regulations`
  },
  {
    title: "Maths Teacher",
    description: "Secondary school educator",
    content: `Inspire and educate students in mathematics at the secondary school level. Create engaging learning experiences that build mathematical confidence and skills.

Key Requirements:
• Bachelor's degree in Mathematics, Education, or related field
• Teaching qualification/certification
• 2+ years of classroom teaching experience
• Strong knowledge of mathematics curriculum
• Excellent communication and classroom management skills
• Passion for education and student development

Responsibilities:
• Plan and deliver engaging mathematics lessons
• Assess student progress and provide feedback
• Develop curriculum materials and resources
• Participate in school activities and parent meetings
• Support students with varying learning needs`
  },
  {
    title: "Data Scientist",
    description: "AI/ML specialist role",
    content: `Join our data science team to drive insights and build intelligent solutions using cutting-edge machine learning techniques.

Key Requirements:
• Master's degree in Data Science, Statistics, or related field
• 3+ years experience in Python, R, SQL
• Proficiency in ML frameworks (TensorFlow, PyTorch, Scikit-learn)
• Experience with data visualization tools
• Strong statistical analysis skills
• Knowledge of big data technologies

Responsibilities:
• Develop predictive models and algorithms
• Analyze large datasets for business insights
• Collaborate with product teams on data-driven solutions
• Present findings to stakeholders`
  },
  {
    title: "Product Manager",
    description: "Strategic product leadership",
    content: `Lead product strategy and development for our innovative technology solutions. Drive product vision from concept to launch.

Key Requirements:
• Bachelor's degree in Business, Engineering, or related field
• 4+ years of product management experience
• Strong analytical and strategic thinking skills
• Experience with Agile methodologies
• Excellent communication and leadership abilities
• Data-driven decision making approach

Responsibilities:
• Define product roadmap and strategy
• Collaborate with engineering and design teams
• Conduct market research and user analysis
• Manage product lifecycle from ideation to launch`
  },
  {
    title: "UX Designer",
    description: "User experience design role",
    content: `Create exceptional user experiences through research, design, and testing. Join our design team to shape the future of our products.

Key Requirements:
• Bachelor's degree in Design, HCI, or related field
• 3+ years of UX design experience
• Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)
• Strong portfolio demonstrating user-centered design
• Experience with user research and usability testing
• Understanding of front-end development principles

Responsibilities:
• Conduct user research and create personas
• Design wireframes, prototypes, and user flows
• Collaborate with product and engineering teams
• Conduct usability testing and iterate on designs`
  },
  {
    title: "Marketing Manager",
    description: "Digital marketing specialist",
    content: `Drive marketing strategy and execution across digital channels. Build brand awareness and generate leads through innovative campaigns.

Key Requirements:
• Bachelor's degree in Marketing, Communications, or related field
• 3+ years of digital marketing experience
• Proficiency in marketing tools (Google Analytics, HubSpot, etc.)
• Strong content creation and copywriting skills
• Experience with SEO/SEM and social media marketing
• Data analysis and reporting capabilities

Responsibilities:
• Develop and execute marketing campaigns
• Manage social media presence and content strategy
• Analyze campaign performance and ROI
• Collaborate with sales team on lead generation`
  }
];

export const JobDescriptionInput: React.FC = () => {
  const { jobDescription, setJobDescription, jobTitle, setJobTitle } = useDashboardStore();

  const handleTemplateSelect = (template: typeof JOB_TEMPLATES[0]) => {
    setJobDescription(template.content);
    setJobTitle(template.title);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 h-[480px] flex flex-col">
      <div className="flex items-center space-x-2 mb-4">
        <FileText className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold font-inter text-slate-900">Job Details</h2>
      </div>

      {/* Job Title Input */}
      <div className="mb-4 flex-shrink-0">
        <div className="flex items-center space-x-2 mb-2">
          <Briefcase className="w-4 h-4 text-primary" />
          <label className="text-sm font-medium font-ibm text-slate-700">Job Title</label>
        </div>
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="e.g., Senior Software Engineer, Product Manager..."
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-ibm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Quick Templates */}
      <div className="mb-4 flex-shrink-0">
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles className="w-4 h-4 text-secondary" />
          <span className="text-sm font-medium font-ibm text-slate-700">Quick Templates</span>
        </div>
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            {JOB_TEMPLATES.map((template, index) => (
              <button
                key={index}
                onClick={() => handleTemplateSelect(template)}
                className="px-3 py-2 text-sm bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex-shrink-0 min-w-[140px]"
              >
                <div className="font-medium font-inter text-left">{template.title}</div>
                <div className="text-xs text-slate-500 font-ibm text-left">{template.description}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Job Description Textarea */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center space-x-2 mb-2">
          <FileText className="w-4 h-4 text-secondary" />
          <label className="text-sm font-medium font-ibm text-slate-700">Job Description</label>
        </div>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Enter detailed job description including requirements, responsibilities, and qualifications..."
          className="w-full h-full p-4 border border-slate-200 rounded-lg font-ibm text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
    </div>
  );
};
