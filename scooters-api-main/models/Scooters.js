import mongoose from "mongoose";

const ScooterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    picture: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      trim: true,
      default: true,
    },
    ratings : [
      {
        value: {
          type: Number,
          default: 0
        },
        userId: {
          type: String,
        },
      }
    ],
    autonomy: {
      type: Number,
      default :0
    }
  },
  {
    timestamps: true,
  }
);

const Scooter = mongoose.model("ScooterSchema", ScooterSchema);

export default Scooter;
