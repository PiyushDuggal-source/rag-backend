import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { User } from '~/types/types';
import { saveUser, users } from '~/utils/data';
import bcrypt from 'bcryptjs';
import { generateToken } from '~/utils/jwt';

export const registerUser = async (
  req: Request<{}, {}, { username: string; password: string }>,
  res: Response
) => {
  const { username, password } = req.body;

  console.log('users before registration:', users);

  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser: User = { id: uuidv4(), username, passwordHash };

    // saving the users to local json
    saveUser(newUser);
    const token = generateToken(newUser.id);
    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: newUser.id, username: newUser.username },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error registering user' });
  }
};

export const loginUser = async (
  req: Request<{}, {}, { username: string; password: string }>,
  res: Response
) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  const token = generateToken(user.id);
  return res.status(200).json({
    message: 'Login successful',
    token,
    user: { id: user.id, username: user.username },
  });
};
