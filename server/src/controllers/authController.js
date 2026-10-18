import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { DreamCollection } from '../models/DreamCollection.js';
import { config } from '../config/env.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const register = asyncHandler(async (req, res) => {
  const { nickname, email, password } = req.body;

  // Check for existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'An account with this email address already exists.',
      errors: ['EMAIL_ALREADY_REGISTERED']
    });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    nickname,
    email,
    passwordHash
  });

  // Create session
  req.session.userId = user._id.toString();
  req.session.userNickname = user.nickname;

  res.status(201).json({
    success: true,
    message: 'Welcome to Pip’s Midnight Observatory! Account created.',
    data: {
      user: {
        _id: user._id,
        nickname: user.nickname,
        email: user.email,
        createdAt: user.createdAt
      }
    }
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user and include passwordHash for verification
  const user = await User.findOne({ email }).select('+passwordHash');
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password.',
      errors: ['INVALID_CREDENTIALS']
    });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password.',
      errors: ['INVALID_CREDENTIALS']
    });
  }

  // Set session
  req.session.userId = user._id.toString();
  req.session.userNickname = user.nickname;

  // Fetch count of collected dreams
  const collectedCount = await DreamCollection.countDocuments({ user: user._id });

  res.status(200).json({
    success: true,
    message: 'Welcome back to the observatory!',
    data: {
      user: {
        _id: user._id,
        nickname: user.nickname,
        email: user.email,
        createdAt: user.createdAt,
        collectedCount
      }
    }
  });
});

export const logout = asyncHandler(async (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Could not log out at this moment.',
          errors: ['LOGOUT_FAILED']
        });
      }
      res.clearCookie(config.sessionName);
      return res.status(200).json({
        success: true,
        message: 'Successfully logged out. Sweet dreams!'
      });
    });
  } else {
    res.status(200).json({
      success: true,
      message: 'Already logged out.'
    });
  }
});

export const getMe = asyncHandler(async (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(200).json({
      success: true,
      data: {
        user: null
      }
    });
  }

  const user = await User.findById(req.session.userId);
  if (!user) {
    req.session.destroy();
    return res.status(200).json({
      success: true,
      data: {
        user: null
      }
    });
  }

  const collectedCount = await DreamCollection.countDocuments({ user: user._id });

  res.status(200).json({
    success: true,
    data: {
      user: {
        _id: user._id,
        nickname: user.nickname,
        email: user.email,
        createdAt: user.createdAt,
        collectedCount
      }
    }
  });
});

