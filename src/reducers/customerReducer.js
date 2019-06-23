export default (state = {}, action) => {
    switch (action.type) {
        // case 'CUTOMER_PERSONAL_INFORMATION'://for future use
        //     return{
        //         name: action.name, uid:action.uid
        //     }
        case 'GOING_DATE':
            return { ...state, going: action.date }

        case 'RETURNING_DATE':
            return { ...state, returning: action.date }

        default:
            return state;
    }
};