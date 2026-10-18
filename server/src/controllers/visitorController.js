import { VisitorStat } from '../models/VisitorStat.js';
import { isDatabaseConnected } from '../config/database.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getVisitorStats = asyncHandler(async (req, res) => {
  if (!isDatabaseConnected()) {
    // Graceful offline fallback
    return res.status(200).json({
      success: true,
      message: 'Visitor counter (offline mode)',
      data: {
        totalVisits: 1999, // Nostalgic default for retro vibe
        isOffline: true
      }
    });
  }

  // Check if this visitor session was already counted
  const hasCounted = req.session && req.session.hasCountedVisit;
  let stat;

  if (!hasCounted) {
    // Atomically increment counter
    stat = await VisitorStat.findOneAndUpdate(
      { key: 'observatory_counter' },
      { $inc: { totalVisits: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    if (req.session) {
      req.session.hasCountedVisit = true;
    }
  } else {
    // Just fetch current count without incrementing
    stat = await VisitorStat.findOne({ key: 'observatory_counter' });
    if (!stat) {
      stat = await VisitorStat.create({ key: 'observatory_counter', totalVisits: 1 });
    }
  }

  res.status(200).json({
    success: true,
    message: 'Visitor counter retrieved',
    data: {
      totalVisits: stat.totalVisits,
      isOffline: false
    }
  });
});

