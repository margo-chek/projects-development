// Создайте html-страницу, в которой выводится сегодняшний день недели

 function transformationDayNum(num) {
  let day = '';
  switch (num) {
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    case 0:
      day = "Sunday";
      break;
    default:
      day = "error";
  }
  return day;
}

const today = new Date();
let dayNum = today.getDay();
const day = transformationDayNum(dayNum);
alert(day);
