import React, { useState, useEffect } from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { generateInterviewQuestions, InterviewQuestionsResponse } from '../../services/api';
import { X, MessageSquare, Code, Users, Target, Sparkles, Brain, ChevronDown } from 'lucide-react';

interface InterviewQuestionsModalProps {
  candidateId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const InterviewQuestionsModal: React.FC<InterviewQuestionsModalProps> = ({
  candidateId,
  isOpen,
  onClose
}) => {
  const { candidates, jobDescription, runId } = useDashboardStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState<InterviewQuestionsResponse | null>(null);
  const [formData, setFormData] = useState({
    num_questions: 10,
    soft_skills_flag: true,
    hard_skills_flag: true,
    soft_skills_focus: 'team collaboration, communication, leadership',
    hard_skills_focus: 'programming, technical expertise, problem solving',
    include_coding: false
  });

  const candidate = candidates.find(c => c.id === candidateId);

  // Reset form data when candidate changes
  useEffect(() => {
    if (candidateId) {
      setQuestions(null);
      setFormData({
        num_questions: 10,
        soft_skills_flag: true,
        hard_skills_flag: true,
        soft_skills_focus: 'team collaboration, communication, leadership',
        hard_skills_focus: 'programming, technical expertise, problem solving',
        include_coding: false
      });
    }
  }, [candidateId]);

  if (!isOpen || !candidate) return null;

  const handleGenerate = async () => {
    if (!runId) {
      console.error('No run_id available for generating questions');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await generateInterviewQuestions({
        screening_run_id: runId, // Use the stored run_id
        resume_id: candidate.id,
        ...formData
      });
      setQuestions(response);
    } catch (error) {
      console.error('Failed to generate questions:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getSkillTypeIcon = (skillType: string) => {
    switch (skillType.toLowerCase()) {
      case 'soft skill':
        return <Users className="w-4 h-4 text-blue-500" />;
      case 'hard skill':
        return <Brain className="w-4 h-4 text-purple-500" />;
      default:
        return <Code className="w-4 h-4 text-green-500" />;
    }
  };

  const getSkillTypeColor = (skillType: string) => {
    switch (skillType.toLowerCase()) {
      case 'soft skill':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'hard skill':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-green-50 text-green-700 border-green-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-6 h-6" />
              <div>
                <h2 className="text-xl font-bold font-inter">Interview Questions</h2>
                <p className="text-blue-100 font-ibm">{candidate.name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {!questions ? (
            /* Configuration Form */
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Number of Questions
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={formData.num_questions}
                    onChange={(e) => setFormData(prev => ({ ...prev, num_questions: parseInt(e.target.value) || 10 }))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="soft_skills"
                      checked={formData.soft_skills_flag}
                      onChange={(e) => setFormData(prev => ({ ...prev, soft_skills_flag: e.target.checked }))}
                      className="w-4 h-4 text-primary focus:ring-primary border-slate-300 rounded"
                    />
                    <label htmlFor="soft_skills" className="text-sm font-medium text-slate-700">
                      Include Soft Skills Questions
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="hard_skills"
                      checked={formData.hard_skills_flag}
                      onChange={(e) => setFormData(prev => ({ ...prev, hard_skills_flag: e.target.checked }))}
                      className="w-4 h-4 text-primary focus:ring-primary border-slate-300 rounded"
                    />
                    <label htmlFor="hard_skills" className="text-sm font-medium text-slate-700">
                      Include Hard Skills Questions
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="include_coding"
                      checked={formData.include_coding}
                      onChange={(e) => setFormData(prev => ({ ...prev, include_coding: e.target.checked }))}
                      className="w-4 h-4 text-primary focus:ring-primary border-slate-300 rounded"
                    />
                    <label htmlFor="include_coding" className="text-sm font-medium text-slate-700">
                      Include Coding Problems
                    </label>
                  </div>
                </div>
              </div>

              {formData.soft_skills_flag && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Soft Skills Focus Areas
                  </label>
                  <input
                    type="text"
                    value={formData.soft_skills_focus}
                    onChange={(e) => setFormData(prev => ({ ...prev, soft_skills_focus: e.target.value }))}
                    placeholder="e.g., team collaboration, communication, leadership"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              )}

              {formData.hard_skills_flag && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Hard Skills Focus Areas
                  </label>
                  <input
                    type="text"
                    value={formData.hard_skills_focus}
                    onChange={(e) => setFormData(prev => ({ ...prev, hard_skills_focus: e.target.value }))}
                    placeholder="e.g., programming, technical expertise, problem solving"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || (!formData.soft_skills_flag && !formData.hard_skills_flag)}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Questions</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Generated Questions Display */
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900 font-inter">
                    Generated Interview Questions for {questions.candidate_name}
                  </h3>
                  <button
                    onClick={() => setQuestions(null)}
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    Generate New Questions
                  </button>
                </div>
                <p className="text-sm text-slate-600 font-ibm">
                  {questions.questions.length} questions generated based on your criteria
                </p>
              </div>

              <div className="space-y-4">
                {questions.questions.map((question, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-sm font-bold text-slate-500 font-fira">
                        Question {index + 1}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getSkillTypeColor(question.skill_type)}`}>
                          {getSkillTypeIcon(question.skill_type)}
                          <span className="capitalize">{question.skill_type}</span>
                        </span>
                        <span className="px-2 py-1 bg-slate-200 text-slate-700 rounded-full text-xs font-medium">
                          {question.difficulty}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-800 font-ibm leading-relaxed">
                      {question.question}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
