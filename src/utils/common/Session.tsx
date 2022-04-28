import axios from "axios";
import { useRecoilState } from "recoil";
import User from "../models/User";
import { UserState } from "./States";

//This file handles the getting, setting and deleting the session data
//Setting the global user


export const getUser = () => {
    //gets user form the sessionstorage
    const user = sessionStorage.getItem("user");
    if (user) {
        //If he exists retun him 
        var userSession: User = JSON.parse(user);
        return userSession;
    }
    else {
        //If not return null
        return {
            userId: 0,
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            upvotes: [],
            Downvotes: [],
        };
    }
}

export const getToken = () => {
    return sessionStorage.getItem("token") || null;
}

export const setUserSession = async (token: string) => {
    //with the token we get the user's info with the '/me' endpoint
    await axios.get('http://localhost:3333/me',
        {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        }
    ).then(user => {
        //We set the token and user in the session storage!
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user.data));
    })

}

export const removeTokenAndUser = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
}   