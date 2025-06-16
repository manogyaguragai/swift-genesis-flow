
import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle, Edit3, Copy, Check } from 'lucide-react';
import { Candidate } from '../../store/dashboardStore';
import { Textarea } from '../ui/textarea';

interface EmailModalProps {
  candidate: Candidate;
  onClose: () => void;
}

export const EmailModal: React.FC<EmailModalProps> = ({ candidate, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<'selection' | 'rejection' | 'custom' | null>(null);
  const [customMessage, setCustomMessage] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderTitle, setSenderTitle] = useState('');
  const [editableContent, setEditableContent] = useState('');
  const [copied, setCopied] = useState(false);

  const selectionTemplate = `Subject: Congratulations! Next Steps for the ${position} Position at ${companyName}

Dear ${candidate.name},

We are pleased to inform you that you have been selected to move forward in our hiring process for the ${position} position at ${companyName}.

After reviewing your qualifications and experience, our team believes you would be an excellent fit for this role. Your background in ${candidate.skills.exact_matches.slice(0, 3).join(', ')} particularly stood out to us.

Next Steps:
• We will be scheduling a follow-up interview within the next few days
• Please confirm your availability for the coming week
• Feel free to prepare any questions you may have about the role or our company

We look forward to speaking with you soon and learning more about how you can contribute to our team.

Best regards,
${senderName}
${senderTitle}
${companyName}`;

  const rejectionTemplate = `Subject: Thank you for your interest in the ${position} position

Dear ${candidate.name},

Thank you for taking the time to apply for the ${position} position at ${companyName}. We truly appreciate your interest in joining our team.

After careful consideration of all applications, we have decided to move forward with other candidates whose experience more closely aligns with our current needs.

We were impressed by your background in ${candidate.skills.exact_matches.slice(0, 2).join(' and ')}, and we encourage you to apply for future opportunities that may be a better match for your skills.

We will keep your resume on file and will reach out if a suitable position becomes available.

Thank you again for your interest in ${companyName}.

Best regards,
${senderName}
${senderTitle}
${companyName}`;

  // Set editable content when template is selected and fields are filled
  React.useEffect(() => {
    if (selectedTemplate === 'selection' && companyName && position && senderName && senderTitle) {
      setEditableContent(selectionTemplate);
    } else if (selectedTemplate === 'rejection' && companyName && position && senderName && senderTitle) {
      setEditableContent(rejectionTemplate);
    }
  }, [selectedTemplate, companyName, position, senderName, senderTitle]);

  const handleCopyEmail = async () => {
    const content = selectedTemplate === 'custom' ? customMessage : editableContent;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email content');
    }
  };

  const handleSendEmail = () => {
    let emailBody = '';
    let subject = '';

    if (selectedTemplate === 'selection') {
      emailBody = editableContent;
      subject = `Congratulations! Next Steps for the ${position} Position at ${companyName}`;
    } else if (selectedTemplate === 'rejection') {
      emailBody = editableContent;
      subject = `Thank you for your interest in the ${position} position`;
    } else if (selectedTemplate === 'custom') {
      emailBody = customMessage;
      subject = `Regarding your application for ${position} at ${companyName}`;
    }

    const mailtoLink = `mailto:${candidate.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden border border-white/50">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-xl border-b border-white/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-glow-blue">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-inter text-slate-900">Send Email</h2>
                <p className="text-slate-600">To: {candidate.name} ({candidate.email})</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors group"
            >
              <X className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {!selectedTemplate ? (
            /* Template Selection */
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-inter text-slate-900 mb-6">
                Choose Email Type
              </h3>
              
              <div className="grid gap-4">
                <button
                  onClick={() => setSelectedTemplate('selection')}
                  className="p-6 border-2 border-green-200/50 rounded-xl hover:border-green-400/50 hover:bg-green-50/50 transition-all text-left group bg-white/50 backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-800 group-hover:text-green-900 text-lg">Selection Email</h4>
                      <p className="text-sm text-green-600">Congratulate and invite for next steps</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedTemplate('rejection')}
                  className="p-6 border-2 border-red-200/50 rounded-xl hover:border-red-400/50 hover:bg-red-50/50 transition-all text-left group bg-white/50 backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                      <X className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-red-800 group-hover:text-red-900 text-lg">Rejection Email</h4>
                      <p className="text-sm text-red-600">Politely decline with encouragement</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedTemplate('custom')}
                  className="p-6 border-2 border-blue-200/50 rounded-xl hover:border-blue-400/50 hover:bg-blue-50/50 transition-all text-left group bg-white/50 backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Edit3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-800 group-hover:text-blue-900 text-lg">Custom Email</h4>
                      <p className="text-sm text-blue-600">Write your own message</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            /* Email Composition */
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
                >
                  ← Back
                </button>
                <h3 className="text-lg font-bold font-inter text-slate-900">
                  {selectedTemplate === 'selection' && 'Selection Email'}
                  {selectedTemplate === 'rejection' && 'Rejection Email'}
                  {selectedTemplate === 'custom' && 'Custom Email'}
                </h3>
              </div>

              {(selectedTemplate === 'selection' || selectedTemplate === 'rejection') && (
                <div className="grid md:grid-cols-2 gap-4 p-6 bg-gradient-to-r from-slate-50/50 to-blue-50/50 rounded-xl border border-white/50 backdrop-blur-sm">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300/50 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 backdrop-blur-sm"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Position</label>
                    <input
                      type="text"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300/50 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 backdrop-blur-sm"
                      placeholder="Job Title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300/50 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 backdrop-blur-sm"
                      placeholder="Your Full Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Your Title</label>
                    <input
                      type="text"
                      value={senderTitle}
                      onChange={(e) => setSenderTitle(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300/50 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white/80 backdrop-blur-sm"
                      placeholder="HR Manager, etc."
                    />
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-slate-700">Email Content</label>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center space-x-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-sm"
                    disabled={!editableContent && !customMessage}
                  >
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                
                {selectedTemplate === 'custom' ? (
                  <Textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="w-full h-64 p-4 border border-slate-300/50 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none bg-white/80 backdrop-blur-sm"
                    placeholder="Write your custom message here..."
                  />
                ) : (
                  <Textarea
                    value={editableContent}
                    onChange={(e) => setEditableContent(e.target.value)}
                    className="w-full h-64 p-4 border border-slate-300/50 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none bg-white/80 backdrop-blur-sm font-mono text-sm"
                    placeholder="Email content will appear here once you fill in the details above..."
                  />
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleSendEmail}
                  disabled={
                    (selectedTemplate === 'custom' && !customMessage.trim()) ||
                    ((selectedTemplate === 'selection' || selectedTemplate === 'rejection') && 
                     (!companyName || !position || !senderName || !senderTitle || !editableContent))
                  }
                  className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-xl font-semibold hover:from-secondary hover:to-primary transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2 shadow-glow-blue"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Email</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-slate-300/50 text-slate-700 rounded-xl hover:bg-slate-50/50 transition-colors bg-white/80 backdrop-blur-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
