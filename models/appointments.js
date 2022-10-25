const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Appointments = new Schema({
  code: { type: String, unique: true, required: true },
  status: { type: String, default: "Pending" },
  first: { type: Boolean, default: true },
  comment: { type: String },              // before comment
  remark: { type: String },               // after comment
  date: { type: String },                 // date for the appointment
  time: { type: String },
  user: {
    name: { type: String, required: true  },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    male: { type: Boolean, default: true },             //  True => Male, False => Female
    age: { type: Number },
  },
  address: {
    location: { type: String, required: true },
    city: { type: String, required: true }
  }
}, {timestamps: true});

module.exports = mongoose.model('Appointments', Appointments);
