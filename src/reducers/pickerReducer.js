const pickerReducer = [];

export default (state = pickerReducer, action) => {
  switch (action.type) {

    case 'SET_DAYS':
      return action.days;

    default:
      return state;
  }
};


