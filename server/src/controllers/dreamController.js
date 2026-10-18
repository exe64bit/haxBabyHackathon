import mongoose from 'mongoose';
import { Dream } from '../models/Dream.js';
import { DreamCollection } from '../models/DreamCollection.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getDreams = asyncHandler(async (req, res) => {
  const dreams = await Dream.find({ published: true }).sort({ createdAt: 1 });

  res.status(200).json({
    success: true,
    message: 'Observatory dreams retrieved',
    data: {
      dreams,
      count: dreams.length
    }
  });
});

export const getDreamById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let dream;
  if (mongoose.Types.ObjectId.isValid(id)) {
    dream = await Dream.findOne({ _id: id, published: true });
  } else {
    dream = await Dream.findOne({ slug: id, published: true });
  }

  if (!dream) {
    return res.status(404).json({
      success: false,
      message: 'Dream not found among the stars.',
      errors: ['DREAM_NOT_FOUND']
    });
  }

  res.status(200).json({
    success: true,
    data: {
      dream
    }
  });
});

export const collectDream = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId;

  let dream;
  if (mongoose.Types.ObjectId.isValid(id)) {
    dream = await Dream.findOne({ _id: id, published: true });
  } else {
    dream = await Dream.findOne({ slug: id, published: true });
  }

  if (!dream) {
    return res.status(404).json({
      success: false,
      message: 'Dream not found to collect.',
      errors: ['DREAM_NOT_FOUND']
    });
  }

  // Idempotent upsert: check if already in collection
  const existing = await DreamCollection.findOne({
    user: userId,
    dream: dream._id
  });

  if (existing) {
    return res.status(200).json({
      success: true,
      message: 'This dream sticker is already in your album!',
      data: {
        dream,
        discoveredAt: existing.discoveredAt,
        alreadyCollected: true
      }
    });
  }

  const collected = await DreamCollection.create({
    user: userId,
    dream: dream._id
  });

  res.status(201).json({
    success: true,
    message: `You collected the "${dream.title}" dream sticker! ⭐`,
    data: {
      dream,
      discoveredAt: collected.discoveredAt,
      alreadyCollected: false
    }
  });
});

export const getUserCollection = asyncHandler(async (req, res) => {
  const userId = req.session.userId;

  const collections = await DreamCollection.find({ user: userId })
    .populate('dream')
    .sort({ createdAt: -1 });

  const totalAvailableDreams = await Dream.countDocuments({ published: true });

  const items = collections
    .filter((c) => c.dream && c.dream.published)
    .map((c) => ({
      collectionId: c._id,
      discoveredAt: c.discoveredAt,
      dream: c.dream
    }));

  res.status(200).json({
    success: true,
    message: 'User dream collection retrieved',
    data: {
      collectedCount: items.length,
      totalAvailable: totalAvailableDreams,
      items
    }
  });
});

