/**
 * Extracts, normalizes, and groups candidate skills and competencies
 * @param {string} text - Cleaned resume text
 * @param {object} sections - Discovered resume sections
 * @returns {string[]} - Array of matching skills
 */
function extractSkills(text, sections) {
  try {
    const comprehensiveSkills = [
      // Programming Languages
      'javascript', 'python', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'scala', 'r', 'matlab',
      'typescript', 'dart', 'perl', 'bash', 'powershell', 'assembly', 'cobol', 'fortran', 'elixir', 'clojure', 'haskell',
      
      // Web Technologies & Frameworks
      'html', 'css', 'react', 'angular', 'vue.js', 'node.js', 'express', 'django', 'flask', 'laravel', 'rails',
      'spring', 'asp.net', 'jsp', 'servlets', 'jquery', 'bootstrap', 'sass', 'less', 'webpack', 'babel',
      'next.js', 'nuxt.js', 'gatsby', 'svelte', 'meteor', 'remix', 'solid.js', 'tailwind css', 'tailwindcss',
      
      // Databases & Stores
      'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'oracle', 'sqlite', 'mariadb', 'cassandra', 'neo4j',
      'dynamodb', 'firebase', 'supabase', 'prisma', 'sequelize', 'mongoose', 'hive', 'hbase',
      
      // Cloud Platforms & Services
      'aws', 'azure', 'gcp', 'amazon web services', 'google cloud', 'heroku', 'digitalocean', 'vercel', 'netlify',
      'lambda', 's3', 'ec2', 'rds', 'ecs', 'eks', 'sqs', 'sns', 'cloudfront', 'api gateway',
      
      // DevOps & CI/CD
      'docker', 'kubernetes', 'jenkins', 'git', 'github', 'gitlab', 'bitbucket', 'ci/cd', 'circleci', 'travis ci',
      'terraform', 'ansible', 'chef', 'puppet', 'vagrant', 'nginx', 'apache', 'vault', 'consul', 'prometheus', 'grafana',
      
      // Data Science & AI/ML
      'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy',
      'matplotlib', 'seaborn', 'plotly', 'jupyter', 'spark', 'hadoop', 'kafka', 'elasticsearch',
      'opencv', 'nltk', 'spacy', 'transformers', 'bert', 'gpt', 'xgboost', 'lightgbm', 'artificial intelligence', 'nlp',
      
      // Cybersecurity & Compliance
      'cybersecurity', 'information security', 'pentesting', 'penetration testing', 'ethical hacking', 'wireshark',
      'metasploit', 'owasp', 'firewalls', 'siem', 'soc', 'splunk', 'cryptography', 'iam', 'saml', 'oauth', 'pci-dss', 'gdpr',
      
      // Agile & Management Tools
      'excel', 'powerpoint', 'word', 'jira', 'confluence', 'slack', 'teams', 'trello', 'asana', 'notion',
      'figma', 'tableau', 'power bi', 'clickup', 'linear', 'monday.com'
    ];

    const lowerText = text.toLowerCase();
    const skillsSectionText = (sections.skills || []).join(' ').toLowerCase();

    // Map common acronyms/synonyms to a standard capitalization format
    const capitalizationMap = {
      'javascript': 'JavaScript',
      'typescript': 'TypeScript',
      'python': 'Python',
      'java': 'Java',
      'c++': 'C++',
      'c#': 'C#',
      'php': 'PHP',
      'ruby': 'Ruby',
      'go': 'Go',
      'rust': 'Rust',
      'swift': 'Swift',
      'kotlin': 'Kotlin',
      'scala': 'Scala',
      'react': 'React',
      'angular': 'Angular',
      'vue.js': 'Vue.js',
      'node.js': 'Node.js',
      'express': 'Express.js',
      'django': 'Django',
      'flask': 'Flask',
      'laravel': 'Laravel',
      'next.js': 'Next.js',
      'nuxt.js': 'Nuxt.js',
      'svelte': 'Svelte',
      'tailwind css': 'Tailwind CSS',
      'tailwindcss': 'Tailwind CSS',
      'mysql': 'MySQL',
      'postgresql': 'PostgreSQL',
      'mongodb': 'MongoDB',
      'redis': 'Redis',
      'sqlite': 'SQLite',
      'aws': 'AWS',
      'gcp': 'GCP',
      'docker': 'Docker',
      'kubernetes': 'Kubernetes',
      'git': 'Git',
      'github': 'GitHub',
      'gitlab': 'GitLab',
      'ci/cd': 'CI/CD',
      'terraform': 'Terraform',
      'nginx': 'Nginx',
      'apache': 'Apache',
      'jira': 'Jira',
      'figma': 'Figma',
      'html': 'HTML',
      'css': 'CSS',
      'sql': 'SQL',
      'firebase': 'Firebase',
      'supabase': 'Supabase',
      'graphql': 'GraphQL',
      'rest': 'REST APIs',
      'cybersecurity': 'Cybersecurity'
    };

    const foundSkillsLower = comprehensiveSkills.filter(skill => {
      // Check if skill exists inside main content or skills section
      const hasSkill = lowerText.includes(skill.toLowerCase()) || 
                      skillsSectionText.includes(skill.toLowerCase());
      
      return hasSkill;
    });

    // Map matches to standard display cases
    const formattedSkills = foundSkillsLower.map(skill => {
      const lower = skill.toLowerCase();
      if (capitalizationMap[lower]) {
        return capitalizationMap[lower];
      }
      
      // Fallback: title-case the skill string
      return skill.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    });

    // Remove duplicates
    return [...new Set(formattedSkills)].sort();
  } catch (error) {
    console.error('Skills extraction module error:', error);
    return [];
  }
}

module.exports = { extractSkills };
