import React from 'react';
import { Header } from '@/components/Header';
import { 
  Shield, 
  Lock, 
  Eye, 
  FileText, 
  ArrowRight,
  Star,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const Privacy = () => {
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
              <Shield className="h-4 w-4 mr-2" />
              Privacy Policy
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight">
              Privacy Policy
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Your privacy is important to us. Learn how we protect and handle your data.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Overview */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Our Privacy Commitment
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are committed to protecting your privacy and ensuring the security of your data
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-4 bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Data Security</h3>
              <p className="text-muted-foreground">Your data is encrypted and processed securely using industry-standard protocols</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-4 bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">No Data Storage</h3>
              <p className="text-muted-foreground">We don't store your resume files. They are processed and immediately deleted</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-4 bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
              <p className="text-muted-foreground">We never share your information with third parties without your consent</p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Information We Collect</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>When you use ParsePath, we may collect the following information:</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Resume files you upload for parsing (temporarily processed, not stored)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Usage data to improve our service (anonymized)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Technical information about your device and browser</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">How We Use Your Information</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>We use the collected information for the following purposes:</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>To provide resume parsing services</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>To improve our AI models and parsing accuracy</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>To maintain and enhance our service</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>To provide customer support</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">Data Security</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>We implement the following security measures to protect your data:</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>End-to-end encryption for all data transmission</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Secure cloud infrastructure with industry-standard security</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Automatic deletion of uploaded files after processing</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Regular security audits and updates</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">Data Retention</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>Our data retention policy is designed to protect your privacy:</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Resume files are deleted immediately after processing</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Parsed results are not stored on our servers</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Usage analytics are anonymized and retained for service improvement</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">Third-Party Services</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>We may use third-party services for specific functions:</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start space-x-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span>Cloud hosting services (AWS, Vercel) for infrastructure</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span>AI/ML services (Hugging Face) for resume parsing</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span>Analytics services for service improvement (anonymized data only)</span>
                    </li>
                  </ul>
                  <p className="mt-4">These services have their own privacy policies, and we recommend reviewing them.</p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">Your Rights</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>You have the following rights regarding your data:</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Right to access any personal data we may have</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Right to request deletion of your data</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Right to opt-out of data collection for analytics</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Right to contact us with privacy concerns</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>If you have any questions about this Privacy Policy, please contact us:</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Email: hasnainmemon04@outlook.com</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>GitHub: github.com/Muhammad-Hasnain12</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">Updates to This Policy</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>We may update this Privacy Policy from time to time. We will notify users of any material changes by:</p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Posting the updated policy on our website</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Updating the "Last Updated" date at the bottom of this policy</span>
                    </li>
                  </ul>
                  <p className="mt-4">Your continued use of ParsePath after any changes constitutes acceptance of the updated policy.</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-muted/30 border border-border/50">
                <p className="text-sm text-muted-foreground">
                  <strong>Last Updated:</strong> December 15, 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Questions About Privacy?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              If you have any questions about our privacy practices, don't hesitate to reach out
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <span>Contact Us</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy; 