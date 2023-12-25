import { CHANGE_USER, SET_USERS } from "redux/constants/Users"



export const setUsers = (users)=>{
    return {
        type: SET_USERS,
        users
    }
}
export const changeUser = (user)=>{
    return {
        type: CHANGE_USER,
        user
    }
}