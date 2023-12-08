const mongoose = require('mongoose');

const { Schema, model } = mongoose;

mongoose.connect('mongodb://127.0.0.1:27017/task', {
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log('Connected'))
  .catch((e) => {
    console.log(e, "Cannot connect to mongoose");
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