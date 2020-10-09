exports.myDateTime = function() {
  let cur_date = new Date();
  let hours = cur_date.getHours();
  let minutes = cur_date.getMinutes();
  console.log('time: ' + hours + minutes);
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours: 12;
  minutes = minutes < 10 ? '0'+minutes : minutes; // append 0 if minutes <10
  return hours + ':' + minutes + ' ' + ampm;
}