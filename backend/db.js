// MongoDB database
const db = require('mongoose');
const Schema = db.Schema;

const videoSchema = new Schema({
    companyName: { type: String },
    videoURL: { type: String },
    videoCategory: { type: String },
    engagementRate: { type: Number }
});

const Video = db.model('Video', videoSchema);