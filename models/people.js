const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;
const uniqueValidator = require('mongoose-unique-validator');


console.log("connecting to", url);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log("connected to MongoDB");
  })
  .catch(e => console.error("error occures " + e.message));

const personSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true, minlength: 3},
  number: {type: String, required: true, unique: true, minlength: 8}
});

personSchema.plugin(uniqueValidator);

// This is to convert _id to String because it is originally and object and removing __v and _id
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Person", personSchema);
