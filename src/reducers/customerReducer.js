export default (state = {}, action) => {
    switch (action.type) {
        // case 'CUTOMER_PERSONAL_INFORMATION'://for future use
        //     return{
        //         name: action.name, uid:action.uid
        //     }
        case 'SET_DATE':
         
            return{ 
               ...state,
               theAction: action.theAction,
                 goingDay: action.day,
                 goingMonth: action.month,
                 goingyear: action.year,
                 goingDate: action.date,
                }

       
        default:
            return state;
    }
};