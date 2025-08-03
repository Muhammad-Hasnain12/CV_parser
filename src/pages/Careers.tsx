import React from 'react';
import { Header } from '@/components/Header';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  ArrowRight,
  Star,
  Heart,
  Zap,
  Globe,
  Award
} from 'lucide-react';

const Careers = () => {
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "5+ years",
      description: "Join our core team to build and scale ParsePath's AI-powered resume parsing platform. You'll work with cutting-edge NLP models and modern web technologies.",
      requirements: [
        "Strong experience with React, Node.js, and TypeScript",
        "Experience with AI/ML technologies and APIs",
        "Knowledge of cloud platforms (AWS, Vercel)",
        "Experience with database design and optimization"
      ]
    },
    {
      id: 2,
      title: "AI/ML Engineer",
      department: "AI & Research",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "Help us improve our AI models for resume parsing accuracy. Work with state-of-the-art NLP models and contribute to our research initiatives.",
      requirements: [
        "Experience with Python, PyTorch, and Hugging Face",
        "Knowledge of NLP and document understanding",
        "Experience with model deployment and optimization",
        "Strong background in machine learning"
      ]
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      experience: "4+ years",
      description: "Lead product strategy and development for ParsePath. Work closely with engineering and design teams to build amazing user experiences.",
      requirements: [
        "Experience in B2B SaaS product management",
        "Strong analytical and strategic thinking",
        "Experience with user research and data analysis",
        "Excellent communication and leadership skills"
      ]
    },
    {
      id: 4,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "2+ years",
      description: "Build beautiful, responsive user interfaces for ParsePath. Work with modern React and design systems to create exceptional user experiences.",
      requirements: [
        "Strong React and TypeScript skills",
        "Experience with modern CSS and design systems",
        "Knowledge of accessibility best practices",
        "Experience with testing frameworks"
      ]
    }
  ];

  const benefits = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Flexible Work",
      description: "Remote-first culture with flexible working hours"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Team",
      description: "Work with talented people from around the world"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Growth Opportunities",
      description: "Continuous learning and career development support"
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
              <Star className="h-4 w-4 mr-2" />
              Careers
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight">
              Join Our Team
              <br />
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Build the Future
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Help us revolutionize resume parsing with AI technology. Join a team of passionate developers, designers, and innovators.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-4 bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Passion for Innovation</h3>
              <p className="text-muted-foreground">We're driven by the desire to solve complex problems with cutting-edge technology</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-4 bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
              <p className="text-muted-foreground">We believe the best solutions come from working together and sharing knowledge</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-4 bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-muted-foreground">We strive for excellence in everything we do, from code quality to user experience</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-4 bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Impact</h3>
              <p className="text-muted-foreground">We're building tools that help people worldwide advance their careers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Why Join ParsePath?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We offer competitive benefits and a supportive work environment
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Open Positions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our team and help shape the future of resume parsing
            </p>
          </div>
          
          <div className="space-y-8 max-w-4xl mx-auto">
            {jobOpenings.map((job) => (
              <div key={job.id} className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.department}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{job.type}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                      {job.experience}
                    </span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {job.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Requirements:</h4>
                  <ul className="space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <a 
                  href="#" 
                  className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Our Culture
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We believe in fostering a culture of innovation, collaboration, and continuous learning
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Remote-First Team</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We're a fully remote team spread across different time zones. We believe in the power of asynchronous work and flexible schedules that allow our team members to work when they're most productive.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our communication is primarily through Slack, GitHub, and regular video calls. We use modern tools and processes to ensure effective collaboration regardless of location.
                </p>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Continuous Learning</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We encourage our team members to continuously learn and grow. We provide resources for courses, conferences, and certifications. We also have regular knowledge-sharing sessions where team members present on topics they're passionate about.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We believe in staying up-to-date with the latest technologies and best practices in our field, and we support our team in their learning journey.
                </p>
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
              Don't See the Right Role?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              We're always looking for talented individuals to join our team. Send us your resume and let us know how you can contribute to ParsePath.
            </p>
            <a 
              href="mailto:careers@parsepath.com" 
              className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <span>Send Your Resume</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers; 