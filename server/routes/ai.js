const express = require('express');
const OpenAI = require('openai');
const auth = require('../middleware/auth');

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

// Analyze CV and provide suggestions
router.post('/analyze', auth, async (req, res) => {
  try {
    const { cvContent } = req.body;

    if (!cvContent) {
      return res.status(400).json({ message: 'CV content is required' });
    }

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-openai-api-key-here') {
      // Return helpful suggestions without AI
      const suggestions = [];
      
      if (!cvContent.professionalSummary || cvContent.professionalSummary.length < 50) {
        suggestions.push({
          section: 'Professional Summary',
          issue: 'Summary is too short or missing',
          suggestion: 'Add a compelling 2-3 sentence summary highlighting your key strengths and career objectives.',
          priority: 'high'
        });
      }
      
      if (!cvContent.workExperience || cvContent.workExperience.length === 0) {
        suggestions.push({
          section: 'Work Experience',
          issue: 'No work experience added',
          suggestion: 'Add your work experience with company names, positions, dates, and key achievements.',
          priority: 'high'
        });
      }
      
      if (!cvContent.skills || cvContent.skills.length === 0) {
        suggestions.push({
          section: 'Skills',
          issue: 'Skills section is empty',
          suggestion: 'List your technical and soft skills. Group them by category for better organization.',
          priority: 'high'
        });
      }
      
      return res.json({
        suggestions: suggestions.length > 0 ? suggestions : [
          {
            section: 'General',
            issue: 'CV needs improvement',
            suggestion: 'Use action verbs, quantify achievements, and ensure all sections are complete.',
            priority: 'medium'
          }
        ],
        missingInfo: [],
        keywords: ['leadership', 'management', 'development', 'implementation', 'optimization'],
        overallScore: '7/10'
      });
    }

    // Extract key CV sections for analysis
    const summary = cvContent.professionalSummary || '';
    const workExp = Array.isArray(cvContent.workExperience) ? cvContent.workExperience : [];
    const education = Array.isArray(cvContent.education) ? cvContent.education : [];
    const skills = Array.isArray(cvContent.skills) ? cvContent.skills : [];
    const projects = Array.isArray(cvContent.projects) ? cvContent.projects : [];
    const personalInfo = cvContent.personalInfo || {};
    
    const prompt = `You are a professional CV/resume advisor. Analyze this CV and provide specific, actionable suggestions.

CV Details:
- Name: ${personalInfo.fullName || 'Not provided'}
- Job Title: ${personalInfo.jobTitle || 'Not provided'}
- Professional Summary: ${summary.substring(0, 200)}${summary.length > 200 ? '...' : ''}
- Work Experience: ${workExp.length} position(s)
- Education: ${education.length} entry/entries
- Skills: ${skills.length} category/categories
- Projects: ${projects.length} project(s)

Analyze and provide suggestions focusing on:
1. Professional Summary: Is it compelling? Does it highlight key strengths?
2. Work Experience: Are achievements quantified? Are action verbs used?
3. Skills: Are they relevant? Are they properly categorized?
4. Missing Information: What important sections or details are missing?
5. Keywords: What industry-relevant keywords should be added?
6. Overall Quality: Rate the CV out of 10

Provide your analysis in JSON format ONLY (no markdown, no code blocks):
{
  "suggestions": [
    {
      "section": "section name",
      "issue": "specific issue found",
      "suggestion": "detailed improvement recommendation",
      "priority": "high/medium/low"
    }
  ],
  "missingInfo": ["list of missing information"],
  "keywords": ["suggested industry keywords"],
  "overallScore": "X/10"
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a professional CV/resume advisor. Always respond with valid JSON only, no markdown code blocks, no explanations. Provide constructive, specific feedback." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    let analysis;
    try {
      const content = completion.choices[0].message.content.trim();
      // Try to parse JSON, handle if it's wrapped in markdown code blocks
      let jsonString = content;
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/```\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        jsonString = jsonMatch[1].trim();
      }
      // Remove any leading/trailing non-JSON text
      const jsonStart = jsonString.indexOf('{');
      const jsonEnd = jsonString.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        jsonString = jsonString.substring(jsonStart, jsonEnd + 1);
      }
      analysis = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.error('Raw content:', completion.choices[0].message.content);
      // Return structured response even if parsing fails
      analysis = {
        suggestions: [
          {
            section: 'General',
            issue: 'AI response parsing error',
            suggestion: 'Review your CV content and ensure all sections are complete with professional language. Use action verbs and quantify achievements.',
            priority: 'medium'
          }
        ],
        missingInfo: [],
        keywords: ['professional', 'experience', 'skills', 'leadership', 'management'],
        overallScore: '7/10'
      };
    }
    
    // Ensure response has correct structure
    if (!analysis.suggestions) {
      analysis.suggestions = [];
    }
    if (!analysis.keywords) {
      analysis.keywords = [];
    }
    if (!analysis.missingInfo) {
      analysis.missingInfo = [];
    }
    if (!analysis.overallScore) {
      analysis.overallScore = '7/10';
    }
    
    res.json(analysis);
  } catch (error) {
    console.error('AI Analysis error:', error);
    
    // Fallback suggestions if AI fails
    res.json({
      suggestions: [
        {
          section: "General",
          issue: "AI service unavailable",
          suggestion: "Use action verbs and quantify achievements",
          priority: "medium"
        }
      ],
      missingInfo: [],
      keywords: ["leadership", "management", "development", "implementation"],
      overallScore: "N/A"
    });
  }
});

// Improve text with AI
router.post('/improve-text', auth, async (req, res) => {
  try {
    const { text, context } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Text is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({ 
        message: 'AI service not configured',
        improvedText: text
      });
    }

    const prompt = `Improve the following text for a CV/resume. Make it more professional, concise, and impactful. Context: ${context || 'general CV section'}

Original text: "${text}"

Provide only the improved version without explanations.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a professional CV writer. Improve text to be more impactful and professional." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 200
    });

    const improvedText = completion.choices[0].message.content.trim();
    res.json({ improvedText });
  } catch (error) {
    console.error('AI Improve text error:', error);
    res.json({ improvedText: text });
  }
});

// Get job recommendations (mock for now)
router.get('/job-recommendations', auth, async (req, res) => {
  try {
    // This would typically analyze the user's CV and match with job postings
    // For now, returning mock data
    const mockJobs = [
      {
        id: 1,
        title: "Software Developer",
        company: "Tech Corp",
        location: "Remote",
        match: "85%",
        description: "Looking for experienced developers..."
      },
      {
        id: 2,
        title: "Full Stack Engineer",
        company: "StartupXYZ",
        location: "New York, NY",
        match: "78%",
        description: "Join our growing team..."
      }
    ];
    
    res.json(mockJobs);
  } catch (error) {
    console.error('Job recommendations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

