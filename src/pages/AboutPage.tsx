
import React from 'react';
import { Users, Brain, Target, Shield, Award, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { GlareCard } from '../components/ui/glare-card';
import { FeatureCards } from '../components/ui/feature-cards';
import { useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

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

  const handleGetStarted = () => {
    navigate('/screen-candidates');
  };

  return (
    <div className="pt-32 min-h-screen bg-texture animate-fade-in font-open-sans-thin">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Hero Section */}
      <section className="relative z-10 w-full px-6 py-20">
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-5xl lg:text-6xl font-bold font-inter text-slate-900 mb-8 animate-fade-in">
            About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Kandidex</span>
          </h1>
          <div className="max-w-5xl mx-auto">
            <p className="text-xl text-black font-open-sans-thin font-thin leading-relaxed animate-scale-in" style={{ animationDelay: '0.2s' }}>
              Kandidex is revolutionizing the recruitment industry with AI-powered hiring solutions. 
              Our platform helps HR professionals make smarter, faster decisions while reducing bias 
              and improving candidate experience. We believe that the right talent can transform 
              businesses, and our mission is to make that connection seamless and efficient.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 w-full px-6 py-16 bg-white/20 backdrop-blur-sm border-y border-white/30">
        <div className="max-w-none mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {stats.map((stat, index) => (
              <div key={index} className="h-32 animate-scale-in" style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
                <GlareCard>
                  <div className="p-6 text-center h-full flex flex-col justify-center">
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-black font-open-sans-thin font-thin text-sm-thin">{stat.label}</div>
                  </div>
                </GlareCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 w-full px-6 py-20">
        <div className="max-w-none mx-auto px-6">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-16 border border-primary/10 shadow-glass animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-glow-blue">
                  <Sparkles className="w-10 h-10 text-white animate-pulse" />
                </div>
              </div>
              <h2 className="text-4xl font-bold font-inter text-slate-900 mb-8">Our Mission</h2>
              <p className="text-xl text-black font-open-sans-thin font-thin leading-relaxed max-w-5xl mx-auto">
                To democratize talent acquisition by making advanced AI hiring tools accessible to organizations 
                of all sizes. We envision a future where every hiring decision is data-driven, unbiased, 
                and leads to better outcomes for both employers and candidates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 w-full px-6 py-20 bg-gradient-to-br from-slate-100/30 to-blue-100/30">
        <div className="max-w-none mx-auto px-6">
          <h2 className="text-4xl font-bold font-inter text-slate-900 text-center mb-16 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            Why Choose <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Kandidex?</span>
          </h2>
          <div className="animate-fade-in" style={{ animationDelay: '1.4s' }}>
            <FeatureCards features={aboutFeatures} />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative z-10 w-full px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-16 border border-primary/20 shadow-glass animate-fade-in" style={{ animationDelay: '1.6s' }}>
            <h2 className="text-3xl font-bold font-inter text-slate-900 mb-6">
              Ready to Transform Your Hiring Process?
            </h2>
            <p className="text-lg text-black font-open-sans-thin font-thin leading-relaxed mb-8">
              Experience the power of AI-driven recruitment. Try our candidate screening tool 
              and see how Kandidex can help you find the perfect candidates faster than ever.
            </p>
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in" 
              style={{ animationDelay: '1.8s' }}
            >
              Try Kandidex Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
