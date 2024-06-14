import mongoose, { Schema } from 'mongoose'

const seedStatusSchema = new Schema(
  {
    seeded: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
)

export const SeedStatus = mongoose.model('SeedStatus', seedStatusSchema)
