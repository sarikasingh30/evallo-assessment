const mongoose=require("mongoose")

const eventSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to User model if applicable
    }],
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String, // Can be HH:MM format 
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    sessionNotes: {
      type: String,
    },
    googleCalendarEventId: { // Optional for synced events
      type: String,
    },
  });
  
  module.exports = mongoose.model('Event', eventSchema);