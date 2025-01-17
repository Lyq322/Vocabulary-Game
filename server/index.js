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


app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});