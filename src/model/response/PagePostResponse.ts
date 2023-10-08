import UserResponse from "./UserResponse";

export default class PagePost {
    postId: number;
    pageId: number;
    name: string;
    profileImage: string;
    imageInBase64: string;
    text: string;
    dateAndTime: string;
    liked: boolean;
    likes: UserResponse[]

    constructor(id: number, profileImage: string, userId: number, firstname: string, imageInBase64: string, text: string, dateAndTime: string, isLiked: boolean, likes: UserResponse[]) {
        this.postId = id;
        this.imageInBase64 = imageInBase64;
        this.text = text;
        this.dateAndTime = dateAndTime;
        this.liked = isLiked;
        this.likes = likes;
        this.name = firstname;
        this.pageId = userId;
        this.profileImage = profileImage;
    }
}
