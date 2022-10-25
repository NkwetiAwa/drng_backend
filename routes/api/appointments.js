const Appointments = require('../../models/appointments');
const router = require('express').Router();
const { generateCode, dateParser } = require('./../functions/coder');

// Get routes to display on the home page
router.route('/').post(async(req, res) => {
  const appointments = await Appointments.find().sort({ createdAt: "DESC" }).limit(15);
  let missed = 0, passed = 0, rescheduled = 0;
  // process appointments and create an object that can be rendered on the table
  const processed = await Promise.all(appointments.map(async i => {
    if(i.status == "Missed"){
      missed += 1;
    }else if(i.status == "Passed"){
      passed += 1;
    }else if(i.status == "Rescheduled"){
      rescheduled += 1;
    }
    return { id: i._id, code: i.code, name: i.user.name, age: i.user.age, address: i.address.city, phone: i.user.phone, status: i.status, appdate: i.date, recdate: await dateParser(i.createdAt) }
  }))
  // console.log(processed)
  return res.json({
    status: true,
    appointments: processed,
    statistics: { missed, passed, rescheduled }
  })
});

// Create a new record
router.route('/new').post(async(req, res) => {
  const { user, status, first, comment, remark, date, time, address } = req.body;
  const code = await generateCode();

  const newAppointment = new Appointments();
  newAppointment.code = code;
  newAppointment.status = status;
  newAppointment.first = first;
  newAppointment.comment = comment;
  newAppointment.remark = remark;
  newAppointment.date = date;
  newAppointment.time = time;
  newAppointment.user = user;
  newAppointment.address = address;

  const saver = await newAppointment.save();
  if(saver){
    return res.json({
      status: true
    });
  }else{
    return res.json({
      status: false,
      err: "Server error"
    });
  }
});

// Fetch one specific appointment
router.route('/one').post(async(req, res) => {
  const { id } = req.body;
  const appointment = await Appointments.findById(id);
  if(appointment){
    return res.json({
      status: true,
      appointment: appointment
    });
  }else{
    return res.json({
      status: false
    });
  }
});

router.route("/edit").post(async(req, res) => {
  const { id, user, status, first, comment, remark, date, time, address } = req.body;
  const updater = await Appointments.findByIdAndUpdate(id, { user: user, status: status, first: first, comment: comment, remark: remark, date: date, time: time, address: address });
  if(updater){
    return res.json({
      status: true
    });
  }else{
    return res.json({
      status: false
    });
  }
});

module.exports = router;