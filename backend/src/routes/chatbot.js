const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');
const { protect } = require('../middleware/auth');

//  SYSTEM PROMPT
const SYSTEM_PROMPT = `You are HealNow AI Health Assistant, a helpful medical information assistant.

Your role is to:
1. Provide accurate, helpful health information
2. Help users understand symptoms
3. Suggest when to consult a doctor
4. Answer health questions clearly and professionally
5. Be empathetic and supportive

Keep responses concise, clear, and professional.`;

// Call Groq API with latest models
const callGroqAPI = async (message, history) => {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      reject(new Error('GROQ_API_KEY not set. Get free key at console.groq.com'));
      return;
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history,
      { role: 'user', content: message }
    ];

    // Trying models in order (latest first)
    const models = [
      'deepseek-r1-distill-llama-70b',
      'llama-3.3-70b-versatile',       
      'llama-3.1-8b-instant',            
    ];

    const attemptModel = (modelIndex = 0) => {
      if (modelIndex >= models.length) {
        reject(new Error('No available models. Check console.groq.com/docs/deprecations'));
        return;
      }

      const model = models[modelIndex];
      console.log(`[Chatbot] Trying model: ${model}`);

      const payload = JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      });

      const options = {
        hostname: 'api.groq.com',
        path: '/openai/v1/chat/completions',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      };

      const https = require('https');

      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          console.log(`[Chatbot] Response status: ${res.statusCode}`);

          // Try next model if this one is deprecated
          if (res.statusCode === 400) {
            try {
              const error = JSON.parse(data);
              if (error.error?.message?.includes('decommissioned') || error.error?.message?.includes('deprecated')) {
                console.log(`[Chatbot] Model ${model} is deprecated, trying next...`);
                attemptModel(modelIndex + 1);
                return;
              }
            } catch (e) {
              // Continue with error handling below
            }
          }

          if (res.statusCode !== 200) {
            try {
              const error = JSON.parse(data);
              const errorMsg = error.error?.message || error.message || JSON.stringify(error);
              reject(new Error(`Groq API error: ${res.statusCode} - ${errorMsg}`));
            } catch (e) {
              reject(new Error(`Groq API error: ${res.statusCode}`));
            }
            return;
          }

          try {
            const result = JSON.parse(data);
            const botResponse = result.choices?.[0]?.message?.content || 'I could not generate a response.';

            if (!botResponse || botResponse.length < 5) {
              reject(new Error('Empty response from API'));
              return;
            }

            console.log(`[Chatbot]- Response received from ${model}`);
            resolve({ response: botResponse, model: model });
          } catch (parseError) {
            reject(new Error('Failed to parse response: ' + parseError.message));
          }
        });
      });

      req.on('error', (error) => {
        console.error('[Chatbot] Request error:', error.message);
        reject(error);
      });

      req.setTimeout(30000, () => {
        req.abort();
        reject(new Error('Request timeout'));
      });

      req.write(payload);
      req.end();
    };

    attemptModel();
  });
};

// SEND MESSAGE
router.post('/send-message', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message cannot be empty' });
    }

    if (!process.env.GROQ_API_KEY) {
      console.error('[Chatbot] Missing GROQ_API_KEY in .env');
      return res.status(500).json({ 
        success: false, 
        message: 'AI service not configured. Get free key at console.groq.com' 
      });
    }

    // Get user ID
    let userId = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const jwt = require('jsonwebtoken');
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
        userId = decoded.userId;
      } catch (e) {
        // Continue as guest
      }
    }

    // Save user message
    if (userId) {
      try {
        const userMessage = new ChatMessage({
          userId,
          message,
          sender: 'user',
          timestamp: new Date()
        });
        await userMessage.save();
      } catch (err) {
        console.warn('[Chatbot] Could not save message:', err.message);
      }
    }

    console.log('[Chatbot] User message:', message.substring(0, 50) + '...');

    // Get history
    let history = [];
    if (userId) {
      try {
        const previousMessages = await ChatMessage.find({ userId })
          .sort({ timestamp: 1 })
          .limit(10);

        history = previousMessages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.message
        }));

        console.log('[Chatbot] History loaded:', history.length, 'messages');
      } catch (err) {
        console.warn('[Chatbot] Could not load history');
      }
    }

    // Call API
    const result = await callGroqAPI(message, history);
    const botResponse = result.response;
    const modelUsed = result.model;

    console.log('[Chatbot]- Response:', botResponse.substring(0, 80) + '...');

    // Save bot message
    if (userId) {
      try {
        const botMessage = new ChatMessage({
          userId,
          message: botResponse,
          sender: 'bot',
          timestamp: new Date()
        });
        await botMessage.save();
      } catch (err) {
        console.warn('[Chatbot] Could not save response');
      }
    }

    res.json({
      success: true,
      response: botResponse,
      model: modelUsed,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('[Chatbot Error]:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Error: ' + error.message
    });
  }
});

// GET HISTORY
router.get('/history', protect, async (req, res) => {
  try {
    const messages = await ChatMessage.find({ userId: req.user.id })
      .sort({ timestamp: 1 })
      .limit(50);

    res.json({ 
      success: true, 
      messages,
      count: messages.length
    });
  } catch (error) {
    console.error('[Chatbot Error]:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch history' 
    });
  }
});

// CLEAR HISTORY
router.delete('/history', protect, async (req, res) => {
  try {
    const result = await ChatMessage.deleteMany({ userId: req.user.id });

    res.json({ 
      success: true, 
      message: 'Chat history cleared',
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('[Chatbot Error]:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to clear history' 
    });
  }
});

module.exports = router;