import mongoose from 'mongoose';

const dreamSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Dream title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true
    },
    color: {
      type: String,
      default: '#FDD848' // Yellow
    },
    rarity: {
      type: String,
      enum: ['Common', 'Rare', 'Legendary', 'Cosmic'],
      default: 'Common'
    },
    illustration: {
      type: String,
      required: true,
      default: 'cloud-castle'
    },
    coordinates: {
      x: { type: Number, default: 50 },
      y: { type: Number, default: 50 }
    },
    deliveryStatus: {
      type: String,
      default: 'Delivered with starlight'
    },
    published: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

dreamSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

export const Dream = mongoose.model('Dream', dreamSchema);

