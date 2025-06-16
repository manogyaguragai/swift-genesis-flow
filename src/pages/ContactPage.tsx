
import React from 'react';
import { Mail, Clock, Send, Users, MessageSquare } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

const ContactPage: React.FC = () => {
  const [state, handleSubmit] = useForm("mblyybrb");

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "manogyaguragai2@gmail.com",
      description: "Get in touch for any inquiries",
      action: "mailto:manogyaguragai2@gmail.com"
    },
    {
      icon: Clock,
      title: "Response Time",
      content: "Within 24 hours",
      description: "We'll get back to you quickly",
      action: null
    }
  ];

  return (
    <div className="pt-32 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 animate-fade-in">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold font-inter text-slate-900 mb-8">
            Contact <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Us</span>
          </h1>
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-glass border border-white/50 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl text-slate-600 font-ibm leading-relaxed max-w-3xl mx-auto">
              Get in touch with our team to learn more about how Kandidex can transform your hiring process. 
              We're here to help you find the perfect candidates with AI-powered precision.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-glass border border-white/50">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold font-inter text-slate-900">Send us a Message</h2>
              </div>
              
              {state.succeeded ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Thank you for your message!</h3>
                  <p className="text-slate-600">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                      <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all backdrop-blur-sm"
                        placeholder="John"
                      />
                      <ValidationError 
                        prefix="First Name" 
                        field="firstName"
                        errors={state.errors}
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                      <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all backdrop-blur-sm"
                        placeholder="Doe"
                      />
                      <ValidationError 
                        prefix="Last Name" 
                        field="lastName"
                        errors={state.errors}
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all backdrop-blur-sm"
                      placeholder="john@company.com"
                    />
                    <ValidationError 
                      prefix="Email" 
                      field="email"
                      errors={state.errors}
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                    <input
                      id="company"
                      type="text"
                      name="company"
                      className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all backdrop-blur-sm"
                      placeholder="Your Company Name"
                    />
                    <ValidationError 
                      prefix="Company" 
                      field="company"
                      errors={state.errors}
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all backdrop-blur-sm resize-none"
                      placeholder="Tell us about your hiring needs..."
                    ></textarea>
                    <ValidationError 
                      prefix="Message" 
                      field="message"
                      errors={state.errors}
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-xl font-semibold hover:from-secondary hover:to-primary transition-all duration-300 hover:shadow-glow-blue hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <Send className="w-5 h-5" />
                    <span>{state.submitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-glass border border-white/50 hover:shadow-glass-lg transition-all duration-300 group animate-scale-in" style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                {info.action ? (
                  <a href={info.action} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-glow-blue group-hover:shadow-glow-purple transition-all duration-300">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-inter text-slate-900 mb-1">{info.title}</h3>
                      <p className="text-primary font-medium mb-1">{info.content}</p>
                      <p className="text-sm text-slate-600 font-ibm">{info.description}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-glow-blue">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-inter text-slate-900 mb-1">{info.title}</h3>
                      <p className="text-slate-700 font-medium mb-1">{info.content}</p>
                      <p className="text-sm text-slate-600 font-ibm">{info.description}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10 shadow-glass animate-fade-in" style={{ animationDelay: '1.2s' }}>
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-bold font-inter text-slate-900">Ready to Get Started?</h3>
              </div>
              <p className="text-slate-600 font-ibm mb-4">
                Learn more about how Kandidex can revolutionize your hiring process. 
                Our AI-powered platform helps you find the perfect candidates faster and more efficiently.
              </p>
              <div className="bg-gradient-to-r from-primary to-secondary text-white py-2 px-6 rounded-lg font-semibold text-center">
                <span>Experience the Future of Hiring</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
