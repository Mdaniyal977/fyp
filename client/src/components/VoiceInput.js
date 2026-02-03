import React, { useState, useEffect, useRef } from 'react';
import {
  TextField,
  IconButton,
  Box,
  Tooltip
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';

const VoiceInput = ({ label, value, onChange, multiline = false, rows = 1 }) => {
  const [listening, setListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const recognitionRef = useRef(null);
  const timeoutRef = useRef(null);
  const finalValueRef = useRef(value || '');

  useEffect(() => {
    finalValueRef.current = value || '';
  }, [value]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleToggle = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
      // Auto-stop after 60 seconds to prevent infinite listening
      timeoutRef.current = setTimeout(() => {
        if (recognitionRef.current === recognition) {
          recognition.stop();
          alert('Voice input stopped after 60 seconds. Click the microphone to start again.');
        }
      }, 60000);
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      // Show interim results in real-time (as you speak)
      if (interimTranscript) {
        setInterimText(interimTranscript);
        // Update field with base value + interim text
        const newValue = finalValueRef.current + (finalValueRef.current ? ' ' : '') + interimTranscript;
        onChange(newValue);
      } else {
        setInterimText('');
      }

      // Update with final results when speech is complete
      if (finalTranscript) {
        finalValueRef.current = finalValueRef.current + (finalValueRef.current ? ' ' : '') + finalTranscript.trim();
        setInterimText('');
        onChange(finalValueRef.current);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
      
      let errorMessage = 'Speech recognition error occurred.';
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'No speech detected. Please speak clearly and try again.';
          break;
        case 'not-allowed':
          errorMessage = 'Microphone permission denied. Please allow microphone access in your browser settings.';
          break;
        case 'network':
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        case 'aborted':
          errorMessage = 'Speech recognition was aborted.';
          break;
        case 'audio-capture':
          errorMessage = 'No microphone found. Please connect a microphone.';
          break;
        case 'service-not-allowed':
          errorMessage = 'Speech recognition service is not allowed.';
          break;
        default:
          errorMessage = `Speech recognition error: ${event.error}. Please try again.`;
      }
      
      // Only show alert for important errors
      if (event.error !== 'aborted') {
        alert(errorMessage);
      }
    };

    recognition.onend = () => {
      // Auto-restart if it ended unexpectedly (not manually stopped)
      if (recognitionRef.current === recognition && listening) {
        try {
          recognition.start();
        } catch (error) {
          console.error('Error restarting recognition:', error);
          setListening(false);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
        }
      } else {
        setListening(false);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setInterimText('');
    setListening(false);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
        fullWidth
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        multiline={multiline}
        rows={rows}
        InputProps={{
          endAdornment: (
            <Tooltip title={listening ? 'Stop recording' : 'Start voice input'}>
              <IconButton
                onClick={handleToggle}
                color={listening ? 'error' : 'primary'}
                edge="end"
              >
                {listening ? <StopIcon /> : <MicIcon />}
              </IconButton>
            </Tooltip>
          )
        }}
      />
      {listening && (
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 1,
            p: 1,
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 1,
            textAlign: 'center',
            fontSize: '0.875rem',
            zIndex: 1000,
            '@keyframes pulse': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0.7 }
            },
            animation: 'pulse 1.5s ease-in-out infinite'
          }}
        >
          🎤 Listening... {interimText && `"${interimText}"`} Click stop when done
        </Box>
      )}
    </Box>
  );
};

export default VoiceInput;

