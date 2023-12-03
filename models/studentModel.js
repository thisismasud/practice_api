const mongoose = require("mongoose");

//this is a basic example of a mongoose Schema
const DataSchema = mongoose.Schema(
  {
    Name: { type: String },
    Age: { type: String },
    City: { type: String, default: "Chattogram" },
    Gender: {
      type: String,
      enum: ["Male", "Female"],
      required: [true, "Why not Gender?"],
    },
    Mobile: {
      type: String,
      validate: {
        validator: function (value) {
          if (value.length != 11) {
            return false;
          } else {
            return true;
          }
        },
        message: "11 Digit number required",
      },
    },
  },
  { versionKey: false }
);

//this is a custom method (instance method) that finds City: Dhaka in the database
DataSchema.methods = {
  findDhaka: function () {
    return mongoose
      .model("initial", DataSchema, "initial")
      .find({ City: "Dhaka" });
  },
};

//*IMP NOTE:
//By default, Mongoose pluralizes the model name to determine the collection name. So, if you define a model with the name "initial", Mongoose will use the plural form "initials" as the collection name.
//=> To override this behavior and explicitly specify the collection name, you can provide a third parameter to the mongoose.model function:
// => This is a model
const StudentModel = mongoose.model("initial", DataSchema, "initial");

module.exports = StudentModel;
