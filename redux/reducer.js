import { HYDRATE } from 'next-redux-wrapper';
import { AUTH, LOGIN, REGISTER } from './action'


const initialState = {
    todos: [],
    users: [],
    cards: [],
    error: []
}

// create your reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            // Attention! This will overwrite client state! Real apps should use proper reconciliation.
            return { ...state, ...action.payload };
        case REGISTER:
            console.log('REGITER===>')
            return {
                ...state,
            };
        case LOGIN:
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

export default reducer;