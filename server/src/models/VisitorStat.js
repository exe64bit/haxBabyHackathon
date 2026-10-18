import mongoose from 'mongoose';

const visitorStatSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: 'observatory_counter'
    },
    totalVisits: {
      type: Number,
      default: 0
    },
    uniqueSessions: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

visitorStatSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

export const VisitorStat = mongoose.model('VisitorStat', visitorStatSchema);

