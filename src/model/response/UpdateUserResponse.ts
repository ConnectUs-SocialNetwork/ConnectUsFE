import UserResponse from "./UserResponse"

export default class UpdateUserResponse{
    userResponse: UserResponse;
    message: string;

    constructor(ur: UserResponse, m: string){
        this.userResponse = ur;
        this.message = m;
    }
}