// chatbot-utils.js
import _ from 'lodash';

// NLP utilities
export const nlpUtils = {
  // Analyze query for intent and topics
  analyzeQuery(query) {
    if (!query) return { intent: 'general', topics: [] };
    
    const lowerQuery = query.toLowerCase();
    const topics = this.identifyTopics(lowerQuery);
    const intent = this.determineIntent(lowerQuery);
    
    return {
      intent,
      topics,
      isQuestionFormat: this.isQuestion(lowerQuery)
    };
  },

  // Determine the intent of the query
  determineIntent(query) {
    if (this.isExperienceQuery(query)) return 'experience_duration';
    if (this.isSkillsQuery(query)) return 'skills_assessment';
    if (this.isAchievementQuery(query)) return 'achievements';
    if (this.isLeadershipQuery(query)) return 'leadership';
    return 'general';
  },

  // Check if query is about experience
  isExperienceQuery(query) {
    const expPatterns = ['year', 'experience', 'how long', 'worked', 'working'];
    return expPatterns.some(pattern => query.includes(pattern));
  },

  // Check if query is about skills
  isSkillsQuery(query) {
    const skillPatterns = ['skill', 'can you', 'able to', 'capability', 'proficient'];
    return skillPatterns.some(pattern => query.includes(pattern));
  },

  // Check if query is about achievements
  isAchievementQuery(query) {
    const achievePatterns = ['achieve', 'accomplishment', 'success', 'improve'];
    return achievePatterns.some(pattern => query.includes(pattern));
  },

  // Check if query is about leadership
  isLeadershipQuery(query) {
    const leaderPatterns = ['lead', 'manage', 'team', 'supervise'];
    return leaderPatterns.some(pattern => query.includes(pattern));
  },

  // Check if text is in question format
  isQuestion(text) {
    return text.includes('?') || 
           text.startsWith('what') || 
           text.startsWith('how') || 
           text.startsWith('why') ||
           text.startsWith('can');
  },

  // Identify topics in text
  identifyTopics(text) {
    const topicKeywords = {
      experience: ['work', 'job', 'role', 'position', 'career'],
      skills: ['skill', 'ability', 'technology', 'tool', 'expertise'],
      education: ['study', 'degree', 'certification', 'qualification'],
      achievements: ['achieve', 'accomplish', 'success', 'award'],
      leadership: ['lead', 'manage', 'team', 'supervise']
    };

    return Object.entries(topicKeywords).reduce((topics, [topic, keywords]) => {
      if (keywords.some(keyword => text.includes(keyword))) {
        topics.push(topic);
      }
      return topics;
    }, []);
  },

  // Fuzzy matching
  fuzzyMatch(text, pattern, threshold = 0.7) {
    if (!text || !pattern) return false;
    
    const words = text.toLowerCase().split(' ');
    const patternWords = pattern.toLowerCase().split(' ');
    
    const matches = patternWords.map(pWord => 
      words.some(word => {
        const distance = this.levenshteinDistance(word, pWord);
        const similarity = 1 - (distance / Math.max(word.length, pWord.length));
        return similarity >= threshold;
      })
    );
    
    return matches.filter(Boolean).length / patternWords.length >= threshold;
  },

  // Calculate Levenshtein distance
  levenshteinDistance(str1, str2) {
    const track = Array(str2.length + 1).fill(null).map(() =>
      Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) track[0][i] = i;
    for (let j = 0; j <= str2.length; j++) track[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j][i - 1] + 1,
          track[j - 1][i] + 1,
          track[j - 1][i - 1] + indicator
        );
      }
    }
    return track[str2.length][str1.length];
  }
};

// In chatbot-utils.js, update the ConversationContext class
export class ConversationContext {
  constructor() {
    this.shortTermMemory = [];
    this.topics = new Set();
    this.preferences = {
      detailedResponses: false,
      technicalDetails: false
    };
    this.followUps = [];
  }

  addMessage(message) {
    this.shortTermMemory.push({
      ...message,
      timestamp: Date.now(),
      topics: nlpUtils.identifyTopics(message.content)
    });
    
    if (this.shortTermMemory.length > 10) {
      this.shortTermMemory.shift();
    }
    
    message.topics?.forEach(topic => this.topics.add(topic));
  }

  getRelevantContext(query) {
    const queryTopics = nlpUtils.identifyTopics(query);
    return this.shortTermMemory
      .filter(msg => msg.topics.some(topic => queryTopics.includes(topic)))
      .slice(-3);
  }

  // Add this method
  generateFollowUp(topic) {
    // Only generate follow-up if we haven't asked about this topic recently
    if (this.followUps.includes(topic)) return null;

    const followUps = {
      experience: [
        "Would you like to know about specific projects in this role?",
        "Would you like details about my responsibilities?",
        "Should I tell you about my achievements in this position?"
      ],
      skills: [
        "Would you like more details about any specific technical skill?",
        "Should I explain how I apply these skills in practice?",
        "Would you like to know about the results I've achieved with these skills?"
      ],
      leadership: [
        "Would you like to hear about my team management approach?",
        "Should I share specific leadership challenges I've overcome?",
        "Would you like examples of successful team initiatives?"
      ],
      technical: [
        "Would you like to know more about my experience with specific tools?",
        "Should I explain how I use these technologies in practice?",
        "Would you like to hear about technical projects I've led?"
      ],
      process: [
        "Would you like to hear about specific process improvements?",
        "Should I share the results of these optimizations?",
        "Would you like more details about my approach to efficiency?"
      ]
    };

    const topicFollowUps = followUps[topic];
    if (topicFollowUps) {
      const followUp = topicFollowUps[Math.floor(Math.random() * topicFollowUps.length)];
      this.followUps.push(topic);
      return followUp;
    }
    return null;
  }
}