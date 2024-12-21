// chatbot-data.js

export const WELCOME_MESSAGE = `Hi! 👋 

I'm Mohamed's AI assistant. I can help you learn about his:

• Professional Summary
• Work Experience
• Leadership & Team Management
• Technical Skills & Innovation
• Process Optimization
• Contact Information

Please select a category below or ask me any question about Mohamed's profile!`;

export const END_MESSAGE = `Thank you for your interest in Mohamed's profile! 

If you'd like to get in touch directly:
• Phone: +971586409291
• Email: mohamed.fbaky@gmail.com
• LinkedIn: linkedin.com/in/mohamedamin2025

Have a great day! 👋`;

export const createCategories = () => [
  {
    id: 'SUMMARY',
    name: "Professional Summary",
    icon: "📋",
    questions: [
      {
        text: "What is Mohamed's professional summary?",
        answer: `A results-driven professional with extensive experience in leadership, system integration, and cost optimization:

• Professional Experience
  - 10+ years in Telecommunications/Loyalty/Shopping malls Contact Centre operations
  - Deep knowledge in COPC standards & Metrics
  - Advanced skills in Access, Excel, and Power BI
  - Six Sigma/DMAIC standards expertise

• Key Strengths
  - Strong background in team leadership
  - Process optimization specialist
  - Data analysis and visualization expert
  - System integration professional

• Cultural Competency
  - Deep insight into UAE culture and society
  - Bilingual proficiency (Arabic & English)
  - Strong cross-cultural communication skills
  - International business experience`
      },
      {
        text: "What makes you an ideal candidate for leadership roles?",
        answer: `My expertise in contact center operations, familiarity with COPC standards, and advanced technical skills like Power BI and Genesys Cloud uniquely position me to excel as a supervisor. I have a proven track record of:

• Team Development
  - Reduced attrition by 15%
  - Improved team performance by 20%
  - Enhanced employee satisfaction

• Process Optimization
  - Saved $22,000 annually
  - Reduced manual effort by 40%
  - Improved FCR to 85%

• Technical Implementation
  - Successfully migrated to Genesys Cloud
  - Implemented automated solutions
  - Developed Power BI dashboards`
      }
    ]
  },
  {
    id: 'EXPERIENCE',
    name: "Work Experience",
    icon: "💼",
    questions: [
      {
        text: "What is Mohamed's current role?",
        answer: `Recent Position: Operations Supervisor at Teleperformance Dubai
Period: Oct'21 till Oct'24

Role Evolution:
• Aug'23 - Oct'24: Majid Al Futtaim Shopping malls Operations
• Oct'21 - July'23: Majid Al Futtaim Loyalty Program

Key Responsibilities:
• Team Management
  - Target formulation and monitoring
  - Staff hiring and onboarding
  - Performance guidance
  - Team motivation
  - Training and development

• Operations Management
  - Call center operations oversight
  - Escalation handling
  - Process optimization
  - Quality monitoring
  - SLA compliance`
      },
      {
        text: "What significant projects have you led?",
        answer: `Key Project Achievements:

• System Migration
  - Led Genesys Cloud implementation
  - Managed CRM system transition
  - Completed ahead of schedule
  - Minimal operational disruption

• Process Optimization
  - Developed automated reporting
  - Created escalation platform
  - Reduced resolution time by 30%
  - Saved $29,000 annually

• Team Development
  - Implemented new training program
  - Reduced onboarding time by 20%
  - Improved team performance by 15%`
      }
    ]
  },
  {
    id: 'LEADERSHIP',
    name: "Leadership & Team Management",
    icon: "👥",
    questions: [
      {
        text: "How do you ensure team motivation and productivity?",
        answer: `I believe motivation comes from clear communication, recognition, and fostering a supportive environment. I set realistic yet challenging goals, celebrate achievements, and maintain open communication to address concerns. For example, in my role at Majid Al Futtaim, I implemented a recognition program where high-performing agents were rewarded monthly, which boosted team morale and productivity.`
      },
      {
        text: "What's your approach to coaching and mentoring?",
        answer: `My coaching style is collaborative and tailored to individual needs. I regularly hold one-on-one sessions to discuss performance, provide constructive feedback, and set improvement plans. For instance, I helped a struggling agent enhance their FCR rate by developing a personalized coaching plan, leading to a 15% improvement within three months.`
      },
      {
        text: "How do you manage underperforming team members?",
        answer: `I start by identifying the root cause through one-on-one discussions. Then, I create an improvement plan with clear milestones and provide ongoing coaching and support. For instance, I helped an agent improve their adherence rate by implementing a tailored coaching strategy.`
      },
      {
        text: "What's your process for conducting performance reviews?",
        answer: `I use performance metrics and qualitative feedback to provide a balanced assessment. Reviews include recognizing achievements, identifying areas for improvement, and setting actionable goals. For example, my structured reviews increased agent engagement and reduced attrition by 15%.`
      }
    ]
  },
  {
    id: 'TECHNICAL',
    name: "Technical Skills & Innovation",
    icon: "💻",
    questions: [
      {
        text: "What is your experience with workforce management tools?",
        answer: `I have extensive experience using tools like Genesys Cloud and Zendesk for workforce management. These tools helped me optimize scheduling and maintain agent availability in real time, ensuring consistent service quality during peak hours.`
      },
      {
        text: "How do you leverage Power BI in decision-making?",
        answer: `I use Power BI to analyze performance metrics, track trends, and present actionable insights to management. For example, I developed a dashboard that identified bottlenecks in call handling, which helped reduce average handling time by 10%.`
      },
      {
        text: "What role does automation play in your operations?",
        answer: `Automation streamlines repetitive tasks, improves response times, and reduces errors. For instance, I implemented an automated escalation tracking system, cutting manual intervention by 40%.`
      }
    ]
  },
  {
    id: 'PROCESS',
    name: "Process Optimization",
    icon: "📈",
    questions: [
      {
        text: "How have you improved operational efficiency?",
        answer: `I developed a Power BI dashboard for real-time monitoring, reducing manual reporting efforts and saving $22,000 annually. This approach maintained performance while cutting unnecessary expenses.`
      },
      {
        text: "How do you identify and resolve process bottlenecks?",
        answer: `At Majid Al Futtaim, I noticed delays in escalation handling due to a lack of clear ownership. I created an escalation management platform to streamline assignments and monitor progress, reducing resolution time by 30%.`
      },
      {
        text: "How do you balance efficiency with quality?",
        answer: `I strike this balance by focusing on agent training and process optimization. For example, I streamlined workflows and improved resolution times without compromising the quality of interactions.`
      }
    ]
  },
  {
    id: 'CONTACT',
    name: "Contact Information",
    icon: "📞",
    questions: [
      {
        text: "What is Mohamed's contact information?",
        answer: `You can reach Mohamed through:

• Phone Numbers: 
  - Primary: +971503441020
  - Secondary: +971586409291
• Email: mohamed.fbaky@gmail.com
• LinkedIn: linkedin.com/in/mohamedamin2025
• Current Location: Dubai, UAE`
      },
      {
        text: "Who are Mohamed's references?",
        answer: `Professional References:

• Direct Manager: 
  - Hossam Raslan (0544281544)
• Majid Al-Futtaim Client: 
  - Rima Soliman (0505608989)

References are available upon request for additional verification.`
      }
    ]
  }
];