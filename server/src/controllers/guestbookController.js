import { GuestbookEntry } from '../models/GuestbookEntry.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getGuestbookEntries = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 20));
  const skip = (page - 1) * limit;

  const filter = { approved: true };

  const [entries, total] = await Promise.all([
    GuestbookEntry.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'nickname'),
    GuestbookEntry.countDocuments(filter)
  ]);

  res.status(200).json({
    success: true,
    message: 'Guestbook entries retrieved',
    data: {
      entries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  });
});

export const createGuestbookEntry = asyncHandler(async (req, res) => {
  const { nickname, message, sticker } = req.body;
  const userId = req.session?.userId || null;

  const entry = await GuestbookEntry.create({
    nickname,
    message,
    sticker: sticker || 'star',
    user: userId,
    approved: true // Approved for friendly child-safe reading
  });

  res.status(201).json({
    success: true,
    message: 'Your sweet note was pinned to Pip’s corkboard! 📌',
    data: {
      entry
    }
  });
});

