import mongoose from 'mongoose';

const dreamCollectionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      index: true
    },
    dream: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dream',
      required: [true, 'Dream reference is required'],
      index: true
    },
    discoveredAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Enforce unique user + dream pair
dreamCollectionSchema.index({ user: 1, dream: 1 }, { unique: true });

dreamCollectionSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

export const DreamCollection = mongoose.model('DreamCollection', dreamCollectionSchema);

