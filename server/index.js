const express = require('express')
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 5000;
const SECRET_KEY = 'secretkey';

app.use(cors());
app.use(express.json());

app.post('/student-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const token = jwt.sign({ id: 3, email: email }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ authenticated: true, token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

app.get('/current-user', (req, res) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }

    res.status(200).json({ id: decoded.id, email: decoded.email });
  });
});

app.get('/words/matching', (req, res) => {
  const words = {
    'bird': '鸟',
    'cat': '猫',
    'food': '食物',
    'happy': '快乐',
    'fly': '飞',
    'fall': '秋天' 
  };

  res.status(200).json(words);
});

app.get('/students', (req, res) => {
  const students = [
    { userId: 1, name: 'First1 Last1', words: {
      'Known': {
        'bird': '鸟',
        'cat': '猫'
      },
      'Still Learning': {
        'food': '食物',
        'happy': '快乐'
      },
      'Have not Seen Yet': {
        'fly': '飞',
        'fall': '秋天'
      }
    }},
    { userId: 2, name: 'First2 Last2', words: {
      'Known': {
        'bird': '鸟',
        'cat': '猫',
        'food': '食物',
        'happy': '快乐',
        'fly': '飞',
        'fall': '秋天'
      },
      'Still Learning': {},
      'Have not Seen Yet': {}
    }},
    { userId: 3, name: 'First3 Last3', words: {
      'Known': {},
      'Still Learning': {},
      'Have not Seen Yet': {
        'bird': '鸟',
        'cat': '猫',
        'food': '食物',
        'happy': '快乐',
        'fly': '飞',
        'fall': '秋天'
      }
    }}
  ];

  res.status(200).json(students);
});

app.post('/create-student', (req, res) => {
  const { name, email, password } = req.body;
  res.status(200);
});

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});