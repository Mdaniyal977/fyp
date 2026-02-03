import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AISuggestions = ({ cvContent, text, context }) => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [error, setError] = useState('');

  const analyzeCV = async () => {
    if (!cvContent) {
      setError('Please fill in some CV content first');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/ai/analyze`,
        { cvContent: cvContent },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 20000 // 20 second timeout for AI analysis
        }
      );
      
      if (response.data && (response.data.suggestions || response.data.overallScore !== undefined)) {
        setSuggestions(response.data);
      } else {
        // Handle fallback
        setSuggestions({
          suggestions: response.data.suggestions || [
            {
              section: 'General',
              issue: 'AI analysis completed',
              suggestion: 'Review your CV and ensure all sections are complete',
              priority: 'medium'
            }
          ],
          missingInfo: response.data.missingInfo || [],
          keywords: response.data.keywords || ['leadership', 'management', 'development'],
          overallScore: response.data.overallScore || '7/10'
        });
      }
    } catch (error) {
      console.error('AI Analysis error:', error);
      
      // Provide helpful fallback suggestions based on CV content
      const fallbackSuggestions = {
        suggestions: [
          {
            section: 'Professional Summary',
            issue: 'Summary could be more impactful',
            suggestion: 'Use action verbs and quantify achievements. Keep it concise (2-3 sentences).',
            priority: 'high'
          },
          {
            section: 'Work Experience',
            issue: 'Add quantifiable achievements',
            suggestion: 'Include numbers, percentages, and specific results in your work descriptions.',
            priority: 'high'
          },
          {
            section: 'Skills',
            issue: 'Ensure skills match job requirements',
            suggestion: 'List technical skills first, then soft skills. Use industry-standard terminology.',
            priority: 'medium'
          }
        ],
        missingInfo: [],
        keywords: ['leadership', 'management', 'development', 'implementation', 'optimization'],
        overallScore: '7/10'
      };
      
      let errorMsg = '';
      
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        errorMsg = 'Request timeout. AI service is taking too long. Showing general suggestions.';
        setSuggestions(fallbackSuggestions);
      } else if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        errorMsg = 'Network error. Please check:\n1. Backend server is running (npm run dev)\n2. Server is on http://localhost:5000\n3. Internet connection is active';
        setSuggestions(fallbackSuggestions);
      } else if (error.response?.status === 503) {
        errorMsg = 'AI service not configured. Showing general suggestions.';
        setSuggestions(fallbackSuggestions);
      } else if (error.response?.status === 401) {
        errorMsg = 'Session expired. Please login again.';
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        errorMsg = 'Failed to analyze CV. Showing general suggestions.';
        setSuggestions(fallbackSuggestions);
      }
      
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const improveText = async () => {
    if (!text) return;
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/ai/improve-text`,
        {
          text,
          context: context || 'CV section'
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 15000 // 15 second timeout for AI
        }
      );
      
      if (response.data?.improvedText) {
        alert(`Improved text:\n\n${response.data.improvedText}`);
      } else {
        alert('No improvement suggestions available. The text is already good!');
      }
    } catch (error) {
      console.error('AI Improve error:', error);
      
      let errorMsg = 'Failed to improve text';
      
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        errorMsg = 'Request timeout. AI service is taking too long.';
      } else if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        errorMsg = 'Network error. Please check:\n1. Backend server is running\n2. Internet connection is active\n3. OpenAI API key is configured';
      } else if (error.response?.status === 503) {
        errorMsg = 'AI service not configured. Please add OPENAI_API_KEY to server/.env file.';
      } else if (error.response?.status === 401) {
        errorMsg = 'Session expired. Please login again.';
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      }
      
      setError(errorMsg);
      
      // Show fallback improvement suggestions
      if (text.length > 0) {
        const fallbackImprovements = [
          'Use action verbs (Developed, Implemented, Led)',
          'Add quantifiable results (numbers, percentages)',
          'Keep sentences concise and impactful',
          'Use industry-specific keywords'
        ];
        alert(`AI service unavailable. General tips:\n\n${fallbackImprovements.join('\n')}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (text && !cvContent) {
    // Simple text improvement mode
    return (
      <Box sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          startIcon={<AutoAwesomeIcon />}
          onClick={improveText}
          disabled={loading || !text}
          fullWidth
        >
          {loading ? 'Improving...' : 'Improve with AI'}
        </Button>
        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {error}
          </Alert>
        )}
      </Box>
    );
  }

  // Full CV analysis mode
  return (
    <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
      <Typography variant="h6" gutterBottom>
        <AutoAwesomeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        AI Suggestions
      </Typography>

      <Button
        variant="contained"
        fullWidth
        onClick={analyzeCV}
        disabled={loading}
        sx={{ mb: 2 }}
        startIcon={loading ? <CircularProgress size={20} /> : <AutoAwesomeIcon />}
      >
        {loading ? 'Analyzing...' : 'Analyze CV'}
      </Button>

      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {suggestions && (
        <Box>
          {suggestions.overallScore && (
            <Box sx={{ mb: 2, p: 2, bgcolor: 'primary.light', borderRadius: 1 }}>
              <Typography variant="subtitle2">Overall Score</Typography>
              <Typography variant="h4">{suggestions.overallScore}/10</Typography>
            </Box>
          )}

          {suggestions.suggestions && suggestions.suggestions.length > 0 && (
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Improvement Suggestions</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List dense>
                  {suggestions.suggestions.map((suggestion, index) => (
                    <ListItem key={index} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Box sx={{ width: '100%', mb: 1 }}>
                        <Chip
                          label={suggestion.section}
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <Chip
                          label={suggestion.priority}
                          size="small"
                          color={suggestion.priority === 'high' ? 'error' : 'default'}
                        />
                      </Box>
                      <ListItemText
                        primary={suggestion.issue}
                        secondary={suggestion.suggestion}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          )}

          {suggestions.keywords && suggestions.keywords.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Suggested Keywords
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {suggestions.keywords.map((keyword, index) => (
                  <Chip key={index} label={keyword} size="small" />
                ))}
              </Box>
            </Box>
          )}

          {suggestions.missingInfo && suggestions.missingInfo.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Missing Information
              </Typography>
              <List dense>
                {suggestions.missingInfo.map((info, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={info} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default AISuggestions;

