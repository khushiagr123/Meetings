const Meeting = require('../models/Meeting');
const MeetingNote = require('../models/MeetingNote');

// Create a new meeting
exports.createMeeting = async (req, res) => {
  try {
    const meeting = new Meeting(req.body);
    await meeting.save();
    res.status(201).json({ success: true, meeting });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Retrieve all meetings with optional filters
exports.getAllMeetings = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.organizer) filter.organizer = req.query.organizer;
    if (req.query.attendee) filter.attendees = req.query.attendee;
    if (req.query.related_entity_type) filter['related_entity.type'] = req.query.related_entity_type;
    if (req.query.related_entity_id) filter['related_entity.entity_id'] = req.query.related_entity_id;

    const meetings = await Meeting.find(filter);
    res.json({ success: true, meetings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Retrieve a single meeting by ID
exports.getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.meeting_id);
    if (!meeting) return res.status(404).json({ success: false, message: 'Meeting not found' });
    res.json({ success: true, meeting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a meeting
exports.updateMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(req.params.meeting_id, req.body, { new: true });
    if (!meeting) return res.status(404).json({ success: false, message: 'Meeting not found' });
    res.json({ success: true, meeting });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a meeting
exports.deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndDelete(req.params.meeting_id);
    if (!meeting) return res.status(404).json({ success: false, message: 'Meeting not found' });
    res.json({ success: true, message: 'Meeting deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a note to a meeting
exports.addNoteToMeeting = async (req, res) => {
  try {
    const note = new MeetingNote({
      meeting_id: req.params.meeting_id,
      note: req.body.note,
      added_by: req.body.added_by
    });
    await note.save();
    res.status(201).json({ success: true, note });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
