import { atom } from "recoil";
import User from "../types/User";

/*
getter and setter!! 
https://recoiljs.org/docs/api-reference/core/useRecoilState/
*/


export const UserState = atom<User>({
    key: 'UserState', // unique ID (with respect to other atoms/selectors)
    default: {
        userId: 0,
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        upvotes: [],
        Downvotes: [],
    },

});
