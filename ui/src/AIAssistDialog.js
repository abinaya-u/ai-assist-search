import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  LinearProgress,
  Typography,
  Box,
  Divider,
} from '@mui/material';

function AIPromptDialog({ open, onClose }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState(() => {
    // Load history from sessionStorage on initial render
    const savedHistory = sessionStorage.getItem('ai-assist-history');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const simulateTypingEffect = (text) => {
    let index = 0;
    setResponse(''); // Clear the response before starting
    const interval = setInterval(() => {
      if (index < text.length - 1) {
        setResponse((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30); // Adjust typing speed (50ms per character)
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('https://0vrcvan3k3.execute-api.ap-southeast-2.amazonaws.com/prod/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.REACT_APP_API_KEY,
        },
        body: JSON.stringify({ input: prompt }),
      });

      const data = await res.json();
      const newEntry = { prompt, response: data?.answer || 'No response received.' };

      // Update history and save to sessionStorage
      const updatedHistory = [...history, newEntry];
      setHistory(updatedHistory);
      sessionStorage.setItem('ai-assist-history', JSON.stringify(updatedHistory));

      simulateTypingEffect(data?.answer || 'No response received.');
    } catch (error) {
      console.error('API error:', error);
      setResponse('Error: ' + error.message);
    } finally {
      setPrompt('');
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setPrompt('');
    setResponse('');
    onClose();
  };

  useEffect(() => {
    if (open) {
      setPrompt('');
      setResponse('');
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth='sm' fullWidth>
      <DialogTitle>AI Assistant</DialogTitle>
      <DialogContent dividers style={{ minHeight: 300, maxHeight: 400, overflowY: 'auto' }}>
        <Box>
          {history.map((entry, index) => (
            <Box key={index} mb={2}>
              <Typography variant='body1' color='textPrimary' paragraph>
                <strong>Prompt:</strong> {entry.prompt}
              </Typography>
              {index === history.length - 1 && !loading && response ? (
                <Typography variant='body1' color='textSecondary' paragraph>
                  <strong>Response:</strong> {response}
                </Typography>
              ) : (
                <Typography variant='body1' color='textSecondary' paragraph>
                  <strong>Response:</strong> {entry.response}
                </Typography>
              )}
              <Divider />
            </Box>
          ))}
        </Box>
        {loading && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        )}
      </DialogContent>
      <DialogActions style={{ flexDirection: 'column', alignItems: 'stretch', padding: '16px' }}>
        <TextField
          fullWidth
          label='Enter your question'
          multiline
          minRows={2}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          variant='outlined'
          disabled={loading}
        />
        <Box mt={2} display='flex' justifyContent='space-between'>
          <Button onClick={handleCloseDialog} disabled={loading}>
            Close
          </Button>
          <Button variant='contained' onClick={handleSubmit} disabled={loading || !prompt.trim()}>
            {loading ? 'Asking...' : 'Ask'}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default AIPromptDialog;
