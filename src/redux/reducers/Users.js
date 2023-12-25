import { CHANGE_USER, SET_USERS } from "redux/constants/Users";

const initTheme = [];

const users = (state = initTheme, action) => {
  switch (action.type) {
    case SET_USERS:
      return [...action.users];
    case CHANGE_USER:{
        const State = [...state]
        State[action.user.id-1] = action.user
     return [
        ...State
      ]
    }
 ;
    default:
      return state;
  }
};

export default users