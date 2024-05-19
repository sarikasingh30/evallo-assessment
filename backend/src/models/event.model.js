const mongoose=require("mongoose")
const { Schema } = mongoose

const meetingSchema = new mongoose.Schema({
    id:{
    },
    title: {
      type: String,
      required: true
    },
    start: {
      type: String
    },
    end:{
      type:String
    },
    allDay:{
      type:Boolean
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true}
  },{
    timestamps: true,
  });
  
  const Meeting = mongoose.model('Meeting', meetingSchema);

  module.exports = Meeting
  
  
