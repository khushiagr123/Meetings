const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  location: { type: String },
  organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  related_entity: {
    type: {
      type: String,
      enum: ['Lead', 'Contact', 'Account', 'Opportunity'],
      required: true
    },
    entity_id: { type: Schema.Types.ObjectId, required: true }
  },
  status: { type: String, enum: ['Scheduled', 'Completed', 'Canceled'], default: 'Scheduled' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Meeting', meetingSchema);
