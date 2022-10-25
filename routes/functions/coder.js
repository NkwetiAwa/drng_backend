const Appointments = require('../../models/appointments');

const generateCode = async() => {
  const count = await Appointments.count({});
  const today = new Date();
  const year = String(today.getFullYear());
  let month = today.getMonth() + 1;
  let day = today.getDate();

  if(day < 10){
    day = "0"+day;
  }
  if(month < 10){
    month = "0"+month;
  }
  
  const code = `A${count+1}${day}${month}${year.substring(0,2)}`
  return code;
}

const dateParser = (date) => {
  const today = new Date(date);
  const year = String(today.getFullYear());
  let month = today.getMonth() + 1;
  let day = today.getDate();

  if(day < 10){
    day = "0"+day;
  }
  if(month < 10){
    month = "0"+month;
  }

  return` ${year}-${month}-${day}`;
}

module.exports = { generateCode, dateParser }