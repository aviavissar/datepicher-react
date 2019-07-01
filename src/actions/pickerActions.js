import Calender from 'calendar-js';
import configureStore from '../store/configureStore';


const date = new Date();
const POSSIBLE_GOING = [1, 2, 3, 4, 5, 6, 7, 11, 12, 13, 14, 15, 16, 27, 28, 30]
const START_YEAR = date.getFullYear();
const END_YEAR = 2020;
const store = configureStore();
const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", 'ספטמבר', 'אוקטובר', "נובמבר", "דצמבר"];
const years = Calender().years(START_YEAR, END_YEAR);

// to send months and years to component
export const startSetYeras = () => {
  return years
};

export const startSetMonths = () => {
  return months
};


//saving on redux and making days obj array to send to component
export const setDays = (days) => ({
  type: 'SET_DAYS',
  days
})

export const handleSetDays = (year, month) => {
  const calendarObjDays = [year, month];
  const { calendar } = Calender().of(year, month);

  calendar.forEach((week) => {
    week.forEach((day) => {
      if (POSSIBLE_GOING.includes(day) && //chack that we put dat that exists in thechoosing
        ((year !== date.getFullYear() || month !== date.getMonth()) || (year == date.getFullYear() &&
          month == date.getMonth() && day >= date.getDate()))) {//chack that we put date that not in the past
        calendarObjDays.push({
          day,
          possibleGoing: true
        });
      }
      else {
        calendarObjDays.push({
          day,
          possibleGoing: false
        });
      }
    })

  })

  return store.dispatch(setDays(calendarObjDays)).days;
};


//button logic
export const handleNext_prevBt = (year, month, oneMonthDirection) => {

   if (month === 0 && oneMonthDirection === -1) {//Breaks on the yars
    year--;
    month = month + 11
  }
  else if (month === 11 && oneMonthDirection === 1) {
    year++;
    month = month - 11
  }
  //normal move
  else if (oneMonthDirection === -1) {
    month--
  }
  else {
    month++
  }
  return { year, month };
}



//handlig the selected date
export const handleSetDate = (year, month, day, theAction) => {  //makink js date obj as required
  const date = new Date();
  date.setFullYear(year);
  date.setMonth(month);
  date.setDate(day)

  return store.dispatch(SetDate(theAction, day, month, year, date));
};


//save the date and the type is to usee defrents date
export const SetDate = (theAction, day, month, year, date) => ({
  type:'SET_DATE',
  theAction,
  day,
  month,
  year,
  date
})





