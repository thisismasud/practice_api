/**
 * Title: Model: Where I am writing schema
 * Description: This file handles the schema configuration and defines the model.
 * Date: 2023-11-29
 * Author: Masud Parvez
 */

const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Why not name?"],
    },
    username: {
      type: String,
      required: [true, "Why not username?"],
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
    },
  },
  { versionKey: false }
);

const UserModel = new mongoose.model("User", DataSchema);

//export
module.exports = UserModel;
