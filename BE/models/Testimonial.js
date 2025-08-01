const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  company: { type: String }, // now optional
  quote: { type: String, required: true }, // the testimonial text
  result: { type: String }, // e.g., "$47K revenue in 2 months"
  rating: { type: Number, required: true, min: 1, max: 5 },
  imageUrl: { type: String },
  cloudinaryId: { type: String },
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
