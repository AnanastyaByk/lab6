const mongoose = require('mongoose');

const { Schema, model } = mongoose;

require('dotenv').config();

mongoose.connect("mongodb+srv://nastasyabyk02:9f0FfNDU2gTaX6XU@cluster0.uapdc6s.mongodb.net/", {
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log('Connected'))
  .catch((e) => {
    console.log(e, "Cannot connect to mongoose");
    console.log("Thank you very much!")
    process.exit()
  });

  const Task = new Schema({
    TaskName:String,
    TaskDecription:String,
    TaskStatus: String,
  });
  
  const TaskModel = model('Task', Task);
  
  module.exports = {
    TaskModel
  }