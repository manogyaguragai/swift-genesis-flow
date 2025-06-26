
import React from 'react';
import { Mail, Clock, Send, MessageSquare, Linkedin } from 'lucide-react';
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
    <div className="pt-32 min-h-screen bg-white overflow-hidden animate-fade-in">
      {/* Background decorations - same as HomePage */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-20 left-10 w-4 h-4 border-l-4 border-t-4 border-primary/20 rotate-45"></div>
        <div className="absolute top-40 right-20 w-6 h-6 border-2 border-secondary/20 rounded-full"></div>
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-primary/10 rotate-45"></div>
        <div className="absolute top-1/3 right-10 w-4 h-4 border-r-4 border-b-4 border-primary/15 rotate-12"></div>
      </div>

      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-float will-change-transform"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-secondary/20 to-purple-300/20 rounded-full blur-3xl animate-float will-change-transform" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 w-full">
        {/* Hero Section - Full Width */}
        <div className="w-full px-6 py-12 text-center animate-fade-in">
          <h1 className="text-5xl font-bold font-inter text-slate-900 mb-8">
            Contact <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Us</span>
          </h1>
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-glass border border-white/50 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <p className="text-lg text-black font-open-sans-thin font-medium leading-relaxed">
                Get in touch with our team to learn more about how Kandidex can transform your hiring process. 
                We're here to help you find the perfect candidates with AI-powered precision.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form and Info Section - Original Width */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="animate-fade-in h-full" style={{ animationDelay: '0.4s' }}>
              <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-glass border border-white/50 h-full flex flex-col">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold font-inter text-slate-900">Send us a Message</h2>
                </div>
                
                {state.succeeded ? (
                  <div className="text-center py-8 flex-1 flex flex-col justify-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Thank you for your message!</h3>
                    <p className="text-black font-open-sans-thin font-medium">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 flex-1">
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
                    
                    <div className="flex-1">
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
            <div className="space-y-6 animate-fade-in h-full flex flex-col" style={{ animationDelay: '0.6s' }}>
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-glass border border-white/50 hover:shadow-glass-lg transition-all duration-300 group animate-scale-in flex-1" style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                  {info.action ? (
                    <a href={info.action} className="flex items-start space-x-4 h-full">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-glow-blue group-hover:shadow-glow-purple transition-all duration-300">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold font-inter text-slate-900 mb-1">{info.title}</h3>
                        <p className="text-primary font-medium mb-1">{info.content}</p>
                        <p className="text-sm text-black font-open-sans-thin font-medium">{info.description}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-start space-x-4 h-full">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-glow-blue">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold font-inter text-slate-900 mb-1">{info.title}</h3>
                        <p className="text-slate-700 font-medium mb-1">{info.content}</p>
                        <p className="text-sm text-black font-open-sans-thin font-medium">{info.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* LinkedIn Button */}
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-glass border border-white/50 hover:shadow-glass-lg transition-all duration-300 group animate-scale-in flex-1" style={{ animationDelay: '1s' }}>
                <a 
                  href="https://www.linkedin.com/in/manogya-guragai-1bb318200/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start space-x-4 group h-full"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-glow-blue group-hover:shadow-glow-purple transition-all duration-300">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold font-inter text-slate-900 mb-1">Connect on LinkedIn</h3>
                    <p className="text-primary font-medium mb-1">Manogya Guragai</p>
                    <p className="text-sm text-black font-open-sans-thin font-medium">Let's connect professionally</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
