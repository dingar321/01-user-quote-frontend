import { type } from "@testing-library/user-event/dist/type";
import User from "./User";
//https://www.digitalocean.com/community/tutorials/how-to-create-custom-types-in-typescript

type Quote = {
    quoteId: number;
    content: string;
    votes: number;
    created: string;
    userTk: User;
};

export default Quote;