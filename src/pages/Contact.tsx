import React from 'react';
import { Header } from '@/components/Header';
import { 
  Mail, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Send, 
  ArrowRight,
  Star,
  Clock,
  Globe
} from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        </div>
        
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-6 py-3 text-sm font-medium text-primary mb-8">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Us
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight">
              Get in Touch
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Have questions about ParsePath? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Contact Information
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Reach out to us through any of these channels
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-4 bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Email</h3>
              <p className="text-muted-foreground mb-4">Send us a detailed message</p>
              <a 
                href="mailto:hasnainmemon04@outlook.com" 
                className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors font-semibold"
              >
                <span>hasnainmemon04@outlook.com</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-4 bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">GitHub</h3>
              <p className="text-muted-foreground mb-4">Check out our open source work</p>
              <a 
                href="https://github.com/Muhammad-Hasnain12" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors font-semibold"
              >
                <span>GitHub Profile</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-4 bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Support</h3>
              <p className="text-muted-foreground mb-4">Get help with technical issues</p>
              <a 
                href="/help" 
                className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors font-semibold"
              >
                <span>Help Center</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Send Us a Message
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Fill out the form below and we'll get back to you as soon as possible
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Get in Touch</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Whether you have a question about ParsePath, need help with integration, or want to discuss a partnership, we're here to help.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">hasnainmemon04@outlook.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Response Time</p>
                      <p className="text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-muted-foreground">Karachi, Pakistan</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold mb-2">
                        First Name
                      </label>
                      <input 
                        type="text" 
                        id="firstName"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold mb-2">
                        Last Name
                      </label>
                      <input 
                        type="text" 
                        id="lastName"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">
                      Email
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                      Subject
                    </label>
                    <select 
                      id="subject"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="api">API Integration</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      Message
                    </label>
                    <textarea 
                      id="message"
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full inline-flex items-center justify-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    <span>Send Message</span>
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Common Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Quick answers to frequently asked questions
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <h3 className="text-xl font-semibold mb-3">How quickly do you respond to inquiries?</h3>
              <p className="text-muted-foreground">We typically respond to all inquiries within 24 hours. For urgent technical issues, we aim to respond within 4-6 hours during business hours.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <h3 className="text-xl font-semibold mb-3">Do you offer custom solutions for enterprise clients?</h3>
              <p className="text-muted-foreground">Yes, we offer custom solutions for enterprise clients. Please contact us with your specific requirements and we'll work with you to create a tailored solution.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <h3 className="text-xl font-semibold mb-3">Can I schedule a demo or consultation?</h3>
              <p className="text-muted-foreground">Absolutely! We're happy to schedule a demo or consultation to discuss your needs. Please reach out to us and we'll arrange a convenient time.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <h3 className="text-xl font-semibold mb-3">Do you provide API documentation and support?</h3>
              <p className="text-muted-foreground">Yes, we provide comprehensive API documentation and support for developers. Visit our API page for detailed documentation and code examples.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Try ParsePath today and experience the power of AI-powered resume parsing
            </p>
            <a 
              href="/" 
              className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <span>Try ParsePath</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 