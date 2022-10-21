import mongoose from "mongoose";

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  favouriteGenre: {
    type: String,
    required: true,
    minlength: 2
  }
});

export default mongoose.model("User", schema)