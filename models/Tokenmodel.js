const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true,"provide the userid"],
    ref: "user",
  },
  token:{
    type:String,
    required:[true,"provide the token"]
  }
});

module.exports = mongoose.model("Token", tokenSchema);
