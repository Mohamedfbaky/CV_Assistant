// responseGenerator.js
import { nlpUtils } from './chatbot-utils';

export class ResponseGenerator {
  constructor(categoryData) {
    this.categoryData = categoryData;
    this.cvData = this.extractCVData();
  }

  extractCVData() {
    return {
      experience: {
        total_years: 10,
        current_role: {
          title: "Operations Supervisor",
          company: "Teleperformance Dubai",
          period: "Oct'21 - Oct'24",
          details: [
            "Managing Majid Al Futtaim Shopping malls Operations",
            "Leading Loyalty Program operations",
            "Team management and development",
            "Process optimization and quality monitoring"
          ]
        }
      },
      achievements: {
        cost_savings: "$51,000 annually ($29,000 through escalation platform, $22,000 via Power BI)",
        improvements: [
          "40% reduction in manual reporting",
          "15% improvement in team performance",
          "85% FCR rate achievement",
          "98% SLA compliance"
        ]
      },
      skills: {
        technical: [
          "Power BI and Advanced Analytics",
          "Excel (VBA, pivot tables)",
          "Genesys Cloud services",
          "Zendesk & Infobip platforms",
          "COPC standards implementation"
        ],
        leadership: [
          "Team management and development",
          "Performance coaching and mentoring",
          "Process optimization",
          "Change management"
        ]
      }
    };
  }

  generateResponse(query) {
    if (!query) return this.generateDefaultResponse();

    const intent = nlpUtils.determineIntent(query.toLowerCase());
    switch(intent) {
      case 'experience_duration':
        return this.generateExperienceResponse();
      case 'skills_assessment':
        return this.generateSkillsResponse();
      case 'achievements':
        return this.generateAchievementsResponse();
      case 'leadership':
        return this.generateLeadershipResponse();
      default:
        return this.searchCategoriesForResponse(query);
    }
  }

  generateExperienceResponse() {
    const { experience } = this.cvData;
    return `Mohamed has ${experience.total_years}+ years of experience in Contact Centre operations.

Current Role:
- ${experience.current_role.title} at ${experience.current_role.company} (${experience.current_role.period})
${experience.current_role.details.map(detail => `  - ${detail}`).join('\n')}

Key Achievements in Current Role:
- ${this.cvData.achievements.improvements.join('\n• ')}

Would you like to know more about his specific achievements or responsibilities?`;
  }

  generateSkillsResponse() {
    const { skills } = this.cvData;
    return `Mohamed's key skills include:

Technical Expertise:
${skills.technical.map(skill => `• ${skill}`).join('\n')}

Leadership Abilities:
${skills.leadership.map(skill => `• ${skill}`).join('\n')}

These skills have led to measurable results:
- ${this.cvData.achievements.cost_savings}
- ${this.cvData.achievements.improvements.join('\n• ')}`;
  }

  generateAchievementsResponse() {
    const { achievements } = this.cvData;
    return `Key Achievements:

Financial Impact:
- ${achievements.cost_savings}

Performance Improvements:
${achievements.improvements.map(improvement => `• ${improvement}`).join('\n')}

Would you like to know more about any specific achievement?`;
  }

  generateLeadershipResponse() {
    const { skills, achievements } = this.cvData;
    return `Leadership Capabilities:

Key Leadership Skills:
${skills.leadership.map(skill => `• ${skill}`).join('\n')}

Leadership Achievements:
- ${achievements.improvements[1]}
- Successfully managed teams during peak periods
- Implemented effective recognition programs
- Developed comprehensive training programs

Would you like specific examples of leadership success?`;
  }

  searchCategoriesForResponse(query) {
    // First try exact matches from categories
    for (const category of this.categoryData) {
      for (const question of category.questions) {
        if (nlpUtils.fuzzyMatch(query, question.text)) {
          return question.answer;
        }
      }
    }

    // If no exact match, try to find relevant information
    const topics = nlpUtils.identifyTopics(query);
    if (topics.length > 0) {
      return this.generateTopicBasedResponse(topics);
    }

    return this.generateDefaultResponse();
  }

  generateTopicBasedResponse(topics) {
    let response = '';
    topics.forEach(topic => {
      switch(topic) {
        case 'experience':
          response += this.generateExperienceResponse() + '\n\n';
          break;
        case 'skills':
          response += this.generateSkillsResponse() + '\n\n';
          break;
        case 'leadership':
          response += this.generateLeadershipResponse() + '\n\n';
          break;
        case 'achievements':
          response += this.generateAchievementsResponse() + '\n\n';
          break;
      }
    });
    return response || this.generateDefaultResponse();
  }

  generateDefaultResponse() {
    return `I can tell you about Mohamed's:

- Professional experience (${this.cvData.experience.total_years}+ years)
- Technical skills and achievements
- Leadership and management approach
- Process optimization successes

What specific aspect would you like to know more about?`;
  }
}