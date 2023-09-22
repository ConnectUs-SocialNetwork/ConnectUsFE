import UserResponse from "./UserResponse";

export default class Post {
    id: number;
    imageInBase64: string;
    text: string;
    dateAndTime: string;
    liked: boolean;
    likes: UserResponse[]

    constructor(id: number, imageInBase64: string, text: string, dateAndTime: string, isLiked: boolean, likes: UserResponse[]) {
        this.id = id;
        this.imageInBase64 = imageInBase64;
        this.text = text;
        this.dateAndTime = dateAndTime;
        this.liked = isLiked;
        this.likes = likes;
    }
}
