import React from 'react';
import { Header } from '@/components/Header';
import { 
  HelpCircle, 
  Search, 
  FileText, 
  MessageCircle, 
  Mail, 
  ArrowRight,
  Star,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Video,
  Download
} from 'lucide-react';

const HelpCenter = () => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "What file formats does ParsePath support?",
      answer: "ParsePath supports PDF, DOCX, and TXT file formats. We recommend using PDF files for the best parsing results as they maintain consistent formatting across different devices and platforms."
    },
    {
      id: 2,
      question: "How accurate is the resume parsing?",
      answer: "Our AI-powered parsing achieves 70-80% accuracy on average. The accuracy depends on the resume format, structure, and clarity. Well-formatted resumes with clear sections typically yield better results."
    },
    {
      id: 3,
      question: "Is my data secure and private?",
      answer: "Yes, absolutely. We process your resume files securely and do not store them on our servers. Your data is only used for parsing and is automatically deleted after processing. We never share your information with third parties."
    },
    {
      id: 4,
      question: "How long does it take to parse a resume?",
      answer: "Most resumes are parsed within 2-5 seconds. The processing time depends on the file size and complexity. Larger files or resumes with complex formatting may take slightly longer."
    },
    {
      id: 5,
      question: "Can I parse multiple resumes at once?",
      answer: "Currently, we support parsing one resume at a time. For bulk processing needs, please contact us for enterprise solutions or API access."
    },
    {
      id: 6,
      question: "What information does ParsePath extract?",
      answer: "ParsePath extracts key information including name, email, phone number, skills, work experience, and education. The extracted data is presented in a structured, easy-to-read format."
    },
    {
      id: 7,
      question: "Do I need to create an account?",
      answer: "No, ParsePath is completely free to use and does not require account creation. Simply upload your resume and get instant results."
    },
    {
      id: 8,
      question: "Can I use ParsePath for commercial purposes?",
      answer: "Yes, you can use ParsePath for commercial purposes. For high-volume usage or API integration, we offer Pro and Enterprise plans with additional features and support."
    }
  ];

  const helpCategories = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Getting Started",
      description: "Learn the basics of using ParsePath",
      link: "#getting-started"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "File Formats",
      description: "Supported formats and best practices",
      link: "#file-formats"
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      link: "#tutorials"
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "API Documentation",
      description: "Integrate ParsePath into your app",
      link: "/api"
    }
  ];

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
              <HelpCircle className="h-4 w-4 mr-2" />
              Help Center
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight">
              How Can We Help?
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              Find answers to common questions and learn how to get the most out of ParsePath
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search for help articles..." 
                  className="w-full pl-12 pr-4 py-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Help Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Browse our help resources by category
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {helpCategories.map((category, index) => (
              <a 
                key={index}
                href={category.link}
                className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="p-3 bg-primary/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-primary">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find quick answers to the most common questions
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-card rounded-2xl border border-border/50 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                  {openFaq === faq.id ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {openFaq === faq.id && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Still Need Help?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our support team is here to help you get the most out of ParsePath
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
              <div className="p-4 bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Live Chat</h3>
              <p className="text-muted-foreground mb-4">Get instant help from our support team</p>
              <a 
                href="#" 
                className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors font-semibold"
              >
                <span>Start Chat</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
              <div className="p-4 bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Email Support</h3>
              <p className="text-muted-foreground mb-4">Send us a detailed message</p>
              <a 
                href="mailto:support@parsepath.com" 
                className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors font-semibold"
              >
                <span>Send Email</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
              <div className="p-4 bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Documentation</h3>
              <p className="text-muted-foreground mb-4">Browse our comprehensive guides</p>
              <a 
                href="/api" 
                className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors font-semibold"
              >
                <span>View Docs</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Guide */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Getting Started Guide
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Follow these simple steps to get started with ParsePath
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Upload Your Resume</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Drag and drop your resume file (PDF, DOCX, or TXT) onto the upload area, or click to browse and select your file. Make sure your resume is well-formatted for best results.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Wait for Processing</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our AI will analyze your resume and extract key information. This usually takes 2-5 seconds. The processing time depends on the file size and complexity.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Review Results</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    View the extracted information in a clean, organized format. You can copy the results or download them for further use. The data includes contact information, skills, experience, and education.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Ready to Try ParsePath?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Experience the power of AI-powered resume parsing for yourself
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

export default HelpCenter; 