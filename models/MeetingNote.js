const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetingNoteSchema = new Schema({
  meeting_id: { type: Schema.Types.ObjectId, ref: 'Meeting', required: true },
  note: { type: String, required: true },
  added_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false }
});

module.exports = mongoose.model('MeetingNote', meetingNoteSchema);
