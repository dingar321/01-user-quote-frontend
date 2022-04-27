import { type } from "@testing-library/user-event/dist/type";
//https://www.digitalocean.com/community/tutorials/how-to-create-custom-types-in-typescript

type User = {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    upvotes: number[]
    Downvotes: number[]
}

export default User;