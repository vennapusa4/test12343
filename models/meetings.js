const mongoose = require('mongoose');
const { Schema } = mongoose;

const meetingSchema = new Schema({
  meetingName: String,
  actionItems: String,
  callNotes: String,
  date: String,
  time:String,
  citiAttendees: []
});

mongoose.model('meetings', meetingSchema);
