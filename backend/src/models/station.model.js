import mongoose, { Schema } from 'mongoose'

const stationSchema = new Schema(
  {
    objectId: {
      type: Number,
      required: [true, 'objectId is required'],
      unique: true,
    },
    streetName: {
      type: String,
      required: [true, 'streetName is required'],
    },
    houseNumber: {
      type: Number,
      required: [true, 'houseNumber is required'],
    },
    zipCode: {
      type: Number,
      required: [true, 'zipCode is required'],
    },
    city: {
      type: String,
      required: [true, 'city is required'],
    },
    latitude: {
      type: Number,
      required: [true, 'latitude is required'],
      unique: true,
    },
    longitude: {
      type: Number,
      required: [true, 'longitude is required'],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Station = mongoose.model('Station', stationSchema)
