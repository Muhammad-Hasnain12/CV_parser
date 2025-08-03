import React from 'react';
import { Header } from '@/components/Header';
import { 
  Check, 
  Star, 
  Zap, 
  Target, 
  Brain, 
  Lock, 
  ArrowRight,
  Crown,
  Users,
  Clock,
  Shield,
  Globe
} from 'lucide-react';

const Pricing = () => {
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
              <Star className="h-4 w-4 mr-2" />
              Pricing
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight">
              Simple Pricing
              <br />
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                for Everyone
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Choose the perfect plan for your resume parsing needs. All plans include our advanced AI technology.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="text-4xl font-bold text-primary mb-2">$0</div>
                <p className="text-muted-foreground">Perfect for individual users</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Up to 10 resumes per month</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Basic AI parsing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>PDF, DOCX, TXT support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Standard accuracy</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Email support</span>
                </div>
              </div>
              
              <a 
                href="/" 
                className="w-full inline-flex items-center justify-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Pro Plan */}
            <div className="relative p-8 rounded-2xl bg-card border-2 border-primary/50 hover:border-primary transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <Crown className="h-4 w-4" />
                  <span>Most Popular</span>
                </div>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="text-4xl font-bold text-primary mb-2">$9</div>
                <p className="text-muted-foreground">per month</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Up to 100 resumes per month</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Advanced AI parsing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>All file formats supported</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Enhanced accuracy</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Priority support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>API access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Bulk processing</span>
                </div>
              </div>
              
              <a 
                href="/" 
                className="w-full inline-flex items-center justify-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                <span>Start Pro Plan</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Enterprise Plan */}
            <div className="relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-primary mb-2">$29</div>
                <p className="text-muted-foreground">per month</p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Unlimited resumes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Premium AI parsing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>All file formats + custom</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Maximum accuracy</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>24/7 support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Full API access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Custom integrations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Dedicated account manager</span>
                </div>
              </div>
              
              <a 
                href="/" 
                className="w-full inline-flex items-center justify-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                <span>Contact Sales</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Feature Comparison
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Compare the features across all our plans to find the perfect fit for your needs
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="font-semibold p-4">Feature</div>
              <div className="font-semibold p-4 text-center">Free</div>
              <div className="font-semibold p-4 text-center">Pro</div>
              <div className="font-semibold p-4 text-center">Enterprise</div>
              
              <div className="p-4 border-t border-border">Resumes per month</div>
              <div className="p-4 border-t border-border text-center">10</div>
              <div className="p-4 border-t border-border text-center">100</div>
              <div className="p-4 border-t border-border text-center">Unlimited</div>
              
              <div className="p-4 border-t border-border">AI Accuracy</div>
              <div className="p-4 border-t border-border text-center">Standard</div>
              <div className="p-4 border-t border-border text-center">Enhanced</div>
              <div className="p-4 border-t border-border text-center">Maximum</div>
              
              <div className="p-4 border-t border-border">File Formats</div>
              <div className="p-4 border-t border-border text-center">Basic</div>
              <div className="p-4 border-t border-border text-center">All</div>
              <div className="p-4 border-t border-border text-center">Custom</div>
              
              <div className="p-4 border-t border-border">API Access</div>
              <div className="p-4 border-t border-border text-center">-</div>
              <div className="p-4 border-t border-border text-center">✓</div>
              <div className="p-4 border-t border-border text-center">Full</div>
              
              <div className="p-4 border-t border-border">Support</div>
              <div className="p-4 border-t border-border text-center">Email</div>
              <div className="p-4 border-t border-border text-center">Priority</div>
              <div className="p-4 border-t border-border text-center">24/7</div>
              
              <div className="p-4 border-t border-border">Bulk Processing</div>
              <div className="p-4 border-t border-border text-center">-</div>
              <div className="p-4 border-t border-border text-center">✓</div>
              <div className="p-4 border-t border-border text-center">✓</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to know about our pricing and plans
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <h3 className="text-xl font-semibold mb-3">Can I upgrade or downgrade my plan?</h3>
              <p className="text-muted-foreground">Yes, you can change your plan at any time. Changes will be prorated and reflected in your next billing cycle.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <h3 className="text-xl font-semibold mb-3">Is there a free trial?</h3>
              <p className="text-muted-foreground">Yes! Our free plan allows you to try ParsePath with up to 10 resumes per month at no cost.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <h3 className="text-xl font-semibold mb-3">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">We accept all major credit cards, PayPal, and bank transfers for enterprise plans.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <h3 className="text-xl font-semibold mb-3">Can I cancel anytime?</h3>
              <p className="text-muted-foreground">Absolutely! You can cancel your subscription at any time with no cancellation fees.</p>
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
              Start with our free plan and upgrade as your needs grow
            </p>
            <a 
              href="/" 
              className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing; 