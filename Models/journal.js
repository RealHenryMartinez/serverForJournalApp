
const mongoose = require('mongoose');

const Journal = new mongoose.Schema({
	title: String,
	content: String,
	body: String,
	
}, { timestamps: true })

const journalModel = mongoose.model('journals-scla-challenge', Journal);
// exporting this to use journalModel
module.exports = journalModel;
