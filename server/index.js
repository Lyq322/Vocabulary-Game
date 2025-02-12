const express = require('express')
const app = express();
const cors = require('cors');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const pool = require('./db');

const port = process.env.PORT || 5000;
const SECRET_KEY = 'secretkey';

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }

    req.userId = decoded.id;
    next();
  });
};

app.post('/student-login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user_id, email: email }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ authenticated: true, token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/admin-login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.user_id, email: email }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ authenticated: true, token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
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

app.get('/words/word-search', (req, res) => {
  const words = {
    'Still Learning': {
      'bird': '鸟',
      'cat': '猫',
      'food': '食物',
      'happy': '快乐',
      'fly': '飞'
    },
    'Have not Seen Yet': {
      'fall': '秋天'
    }
  };

  const DIRECTIONS = ['left', 'right', 'up', 'down', 'leftUp', 'rightUp', 'leftDown', 'rightDown'];

  const GRID_SIZE = 10;
  let grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
  let possibleWords = [...Object.keys(words['Still Learning']), ...Object.keys(words['Have not Seen Yet'])];

  // Select up to 6 random words
  let selectedWords = [];
  while (possibleWords.length > 0 && selectedWords.length < 6) {
    let randomIndex = Math.floor(Math.random() * possibleWords.length);
    selectedWords.push(possibleWords[randomIndex]);
    possibleWords.splice(randomIndex, 1);
  }

  // Place words in grid
  for (let word of selectedWords) {
    let placed = false;
    while (!placed) {
      let startRow = Math.floor(Math.random() * GRID_SIZE);
      let startCol = Math.floor(Math.random() * GRID_SIZE);
      let direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];

      if (canPlaceWord(word, startRow, startCol, direction)) {
        grid = placeWord(word, startRow, startCol, direction);
        placed = true;
      }
    }
  }

  // Fill remaining spaces with random letters
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] === null) {
        grid[row][col] = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letter A-Z
      }
    }
  }

  // Helper function to check if word can be placed
  function canPlaceWord(word, row, col, direction) {
    const GRID_SIZE = 10;
    let [dRow, dCol] = getDirectionOffsets(direction);

    for (let i = 0; i < word.length; i++) {
      if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE || (grid[row][col] !== null && grid[row][col] !== word[i])) {
        return false;
      }
      row += dRow;
      col += dCol;
    }
    return true;
  }

  // Helper function to place word in puzzle grid
  function placeWord(word, row, col, direction) {
    let [dRow, dCol] = getDirectionOffsets(direction);

    for (let i = 0; i < word.length; i++) {
      grid[row][col] = word[i].toUpperCase();
      row += dRow;
      col += dCol;
    }
    return grid;
  }

  // Helper function to get direction offsets
  function getDirectionOffsets(direction) {
    switch (direction) {
      case 'left': return [0, -1];
      case 'right': return [0, 1];
      case 'up': return [-1, 0];
      case 'down': return [1, 0];
      case 'leftUp': return [-1, -1];
      case 'rightUp': return [-1, 1];
      case 'leftDown': return [1, -1];
      case 'rightDown': return [1, 1];
      default: return [0, 0];
    }
  }

  res.status(200).json({'grid': grid, 'words': selectedWords});
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

app.post('/create-student', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newStudent = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, hashedPassword]);
    res.status(200).json(newStudent.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

app.get('/students/:id/words', (req, res) => {
  const id = req.params.id;
  const words = {
    'Known': {
      'bird': '鸟',
      'cat': '猫',
      'happy': '快乐'
    },
    'Still Learning': {
      'food': '食物'
    },
    'Have not Seen Yet': {
      'fly': '飞',
      'fall': '秋天'
    }
  };

  res.status(200).json(words);
});

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});