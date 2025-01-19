
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config.mjs';

export const register = async (req, res) => {
  const { username, password } = req.body;
  const collection = req.app.get('collection');

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await collection.insert(`user::${username}`, { username, password: hashedPassword });
    res.status(201).send('User registered');
  } catch (err) {
    res.status(500).send('Error registering user');
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const collection = req.app.get('collection');

  try {
    const result = await collection.get(`user::${username}`);
    const user = result.content;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ username: user.username }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).send('Error logging in');
  }
};