
import React from 'react';
import { Users, Brain, Target, Shield, Award, Sparkles } from 'lucide-react';
import { GlareCard } from '../components/ui/glare-card';
import { FeatureCards } from '../components/ui/feature-cards';
import ProfileCard from '../components/ui/ProfileCard';

const AboutPage: React.FC = () => {
  const stats = [
    { value: "High", label: "Accuracy Rate" },
    { value: "10x", label: "Faster Screening" },
    { value: "3+", label: "Companies Trust Us" },
    { value: "1k+", label: "Resumes Processed" }
  ];

  const aboutFeatures = [
    {
      title: "AI-Powered Matching",
      description: "Advanced machine learning algorithms analyze resumes and job descriptions to find perfect matches.",
      icon: <Brain className="h-8 w-8 text-primary" />,
      animationDelay: 0,
    },
    {
      title: "Precision Hiring",
      description: "Get highly accurate candidate rankings based on skills, experience, and cultural fit.",
      icon: <Target className="h-8 w-8 text-secondary" />,
      animationDelay: 200,
    },
    {
      title: "Bias Reduction",
      description: "Our AI helps eliminate unconscious bias by focusing on qualifications and merit.",
      icon: <Shield className="h-8 w-8 text-primary" />,
      animationDelay: 400,
    },
    {
      title: "Quality Assurance",
      description: "Consistent, reliable results that improve your hiring success rate.",
      icon: <Award className="h-8 w-8 text-secondary" />,
      animationDelay: 600,
    }
  ];

  const handleContactClick = () => {
    window.open('https://www.linkedin.com/in/manogya-guragai-1bb318200/', '_blank');
  };

  return (
    <div className="pt-32 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 animate-fade-in">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-5xl font-bold font-inter text-slate-900 mb-8 animate-fade-in">
            About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Kandidex</span>
          </h1>
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-glass border border-white/50 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl text-slate-600 font-ibm leading-relaxed max-w-4xl mx-auto">
              Kandidex is revolutionizing the recruitment industry with AI-powered hiring solutions. 
              Our platform helps HR professionals make smarter, faster decisions while reducing bias 
              and improving candidate experience. We believe that the right talent can transform 
              businesses, and our mission is to make that connection seamless and efficient.
            </p>
          </div>
        </div>

        {/* Stats Section with GlareCard */}
        <div className="grid md:grid-cols-4 gap-6 mb-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {stats.map((stat, index) => (
            <div key={index} className="h-32 animate-scale-in" style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
              <GlareCard>
                <div className="p-6 text-center h-full flex flex-col justify-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-slate-600 font-ibm">{stat.label}</div>
                </div>
              </GlareCard>
            </div>
          ))}
        </div>

        {/* Mission Section - Moved above Why Choose Kandidex */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-12 border border-primary/10 shadow-glass animate-fade-in mb-20" style={{ animationDelay: '1s' }}>
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-glow-blue">
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>
            <h2 className="text-3xl font-bold font-inter text-slate-900 mb-6">Our Mission</h2>
            <p className="text-lg text-slate-700 font-ibm leading-relaxed max-w-4xl mx-auto">
              To democratize talent acquisition by making advanced AI hiring tools accessible to organizations 
              of all sizes. We envision a future where every hiring decision is data-driven, unbiased, 
              and leads to better outcomes for both employers and candidates.
            </p>
          </div>
        </div>

        {/* Features Section using FeatureCards */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold font-inter text-slate-900 text-center mb-12 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            Why Choose <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Kandidex?</span>
          </h2>
          <div className="animate-fade-in" style={{ animationDelay: '1.4s' }}>
            <FeatureCards features={aboutFeatures} />
          </div>
        </div>

        {/* Profile Card Section */}
        <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: '1.6s' }}>
          <h2 className="text-3xl font-bold font-inter text-slate-900 mb-6">
            Meet the <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Developer</span>
          </h2>
        </div>
        
        <div className="flex justify-center animate-fade-in" style={{ animationDelay: '1.8s' }}>
          <div className="w-full max-w-sm">
            <ProfileCard
              name="Manogya Guragai"
              title="AI Developer"
              handle="manogyaguragai"
              contactText="Contact Me"
              avatarUrl="/logo.png"
              miniAvatarUrl="/logo.png"
              showUserInfo={true}
              enableTilt={true}
              onContactClick={handleContactClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
