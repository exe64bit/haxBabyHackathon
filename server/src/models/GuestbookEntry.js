import mongoose from 'mongoose';

const guestbookEntrySchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: [true, 'Nickname is required'],
      trim: true,
      minlength: [2, 'Nickname must be at least 2 characters'],
      maxlength: [40, 'Nickname cannot exceed 40 characters']
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [2, 'Message must be at least 2 characters'],
      maxlength: [500, 'Message cannot exceed 500 characters']
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    sticker: {
      type: String,
      enum: ['star', 'cloud', 'moon', 'rocket', 'heart', 'lantern'],
      default: 'star'
    },
    approved: {
      type: Boolean,
      default: true // Approved for friendly public reading
    }
  },
  {
    timestamps: true
  }
);

guestbookEntrySchema.index({ approved: 1, createdAt: -1 });

guestbookEntrySchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

export const GuestbookEntry = mongoose.model('GuestbookEntry', guestbookEntrySchema);

