const express = require('express');
const router = express.Router();
const meetingsController = require('../controllers/meetingsController');

// Create a new meeting
router.post('/', meetingsController.createMeeting);

// Retrieve all meetings
router.get('/', meetingsController.getAllMeetings);

// Retrieve a single meeting by ID
router.get('/:meeting_id', meetingsController.getMeetingById);

// Update a meeting
router.put('/:meeting_id', meetingsController.updateMeeting);

// Delete a meeting
router.delete('/:meeting_id', meetingsController.deleteMeeting);

// Add a note to a meeting
router.post('/:meeting_id/notes', meetingsController.addNoteToMeeting);

module.exports = router;
