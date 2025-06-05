
interface ProjectParams {
  language: string;
  timeWilling: number;
  participants: number;
  memberNames?: string[];
  memberExpertise?: string[];
  projectType: string;
  difficulty: string;
}

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_MODEL = import.meta.env.VITE_GROQ_MODEL;

export const generateProjectIdea = async (params: ProjectParams): Promise<string> => {
  const { language, timeWilling, participants, memberNames, memberExpertise, projectType, difficulty } = params;
  
  const timeLabel = timeWilling < 60 ? `${timeWilling} minutes` : 
                   timeWilling < 1440 ? `${Math.floor(timeWilling / 60)} hours` : 
                   `${Math.floor(timeWilling / 1440)} days`;

  const teamInfo = participants > 1 && memberNames && memberExpertise ? 
    `\n**Team Members:**\n${memberNames.map((name, idx) => `- ${name} (${memberExpertise[idx]})`).join('\n')}` : '';

  const prompt = `Generate a detailed and comprehensive coding project idea with the following specifications:

**Requirements:**
- Programming Language: ${language}
- Time Available: ${timeLabel}
- Team Size: ${participants} ${participants === 1 ? 'person (solo)' : 'people'}
- Project Type: ${projectType}
- Difficulty Level: ${difficulty}${teamInfo}

**Instructions:**
Create a project that is:
1. Achievable within the given timeframe
2. Appropriate for the team size and expertise levels
3. Educational, engaging, and fun to build
4. Has clear, actionable implementation steps
5. Includes specific features with detailed descriptions
6. Provides comprehensive resource recommendations
7. Assigns specific roles and responsibilities for team members

**Format your response EXACTLY as follows:**

# 🎯 [Creative Project Title]

## 📋 Project Overview
[3-4 sentences describing what to build, why it's exciting, and what users will learn]

## ✨ Core Features
• **[Feature 1 Name]**: [Detailed description of functionality and implementation approach]
• **[Feature 2 Name]**: [Detailed description of functionality and implementation approach]
• **[Feature 3 Name]**: [Detailed description of functionality and implementation approach]
• **[Feature 4 Name]**: [Detailed description of functionality and implementation approach]

## 🚀 Implementation Roadmap
1. **Phase 1 - Foundation** (${Math.floor(timeWilling * 0.3)} ${timeWilling < 60 ? 'minutes' : timeWilling < 1440 ? 'hours' : 'days'}): [Detailed setup and core structure steps]
2. **Phase 2 - Core Development** (${Math.floor(timeWilling * 0.5)} ${timeWilling < 60 ? 'minutes' : timeWilling < 1440 ? 'hours' : 'days'}): [Main feature implementation steps]
3. **Phase 3 - Polish & Deploy** (${Math.floor(timeWilling * 0.2)} ${timeWilling < 60 ? 'minutes' : timeWilling < 1440 ? 'hours' : 'days'}): [Testing, styling, and deployment steps]

${participants > 1 ? `## 👥 Team Responsibilities
${memberNames && memberExpertise ? memberNames.map((name, idx) => 
  `• **${name}** (${memberExpertise[idx]}): [Specific tasks and responsibilities based on their expertise]`
).join('\n') : '• [Role assignments based on team size and skills]'}` : ''}

## 📚 Learning Resources
• **Documentation**: [Specific official docs and guides]
• **Tutorials**: [Recommended video tutorials and courses]
• **Tools**: [Development tools, IDEs, and extensions]
• **Libraries**: [Specific packages and dependencies with installation commands]

## 🛠️ Tech Stack & Setup
**Required Tools:**
• [Specific development environment setup]
• [Database/storage requirements if applicable]
• [API keys or external services needed]

**Dependencies:**
\`\`\`bash
[Specific installation commands for the project]
\`\`\`

## 💡 Advanced Challenges
• **Level 1**: [Moderate enhancement ideas]
• **Level 2**: [Advanced feature additions]
• **Level 3**: [Expert-level optimizations and integrations]

## 🎯 Success Metrics
• [Specific deliverables to measure completion]
• [Performance benchmarks or user experience goals]
• [Portfolio-worthy outcomes]

---
*Project Complexity: ${difficulty} | Estimated Time: ${timeLabel} | Team Size: ${participants} ${participants === 1 ? 'developer' : 'developers'}*

Make this project exciting, educational, and perfectly tailored to the ${language} ecosystem with ${difficulty} difficulty level!`;

  console.log('Sending detailed request to GROQ API...');

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are an expert coding mentor and project architect who creates comprehensive, detailed project specifications. Always format responses exactly as requested with proper markdown. Make each project unique, specific, inspiring, and perfectly suited to the team composition and skill levels. Include detailed technical guidance and resource recommendations.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 2500,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('GROQ API Error:', errorText);
    throw new Error(`Failed to generate project idea: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log('GROQ API Response:', data);

  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    throw new Error('Invalid response format from GROQ API');
  }

  return data.choices[0].message.content.trim();
};
