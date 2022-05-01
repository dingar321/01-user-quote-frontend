import { atom } from "recoil";
import Quote from "../models/Quote";
import User from "../models/User";

/*
getter and setter!! 
https://recoiljs.org/docs/api-reference/core/useRecoilState/
*/


export const UserState = atom<User>({
    key: 'UserState',
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

export const UserUpvotes = atom<number[]>({
    key: 'UserUpvotes',
    default: [],
});

export const UserDownvotes = atom<number[]>({
    key: 'UserDownvotes',
    default: [],
});


export const MostUpvotedQuotes = atom<Quote[]>({
    key: 'MostUpvotedQuotes',
    default: [],
});


export const MostRecentQuotes = atom<Quote[]>({
    key: 'MostRecentQuotes',
    default: [],
});

export const RandomQuote = atom<Quote>({
    key: 'RandomQuote',
    default: {
        quoteId: 0,
        content: '',
        votes: 0,
        created: '',
        userTk: {
            userId: 0,
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            upvotes: [],
            Downvotes: [],
        },
    },
});


export const UserQuotes = atom<Quote[]>({
    key: 'UsersQuotes',
    default: [],
});


export const UserUpvotedQuotes = atom<Quote[]>({
    key: 'UsersLikedQuotes',
    default: [],
});

