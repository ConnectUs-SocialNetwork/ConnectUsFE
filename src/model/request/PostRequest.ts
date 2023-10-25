export default class PostRequest{
    userEmail: string;
    images: string[];
    postText: string;
    taggedUserIds: number[];

    constructor(email: string, images: string[], text: string, tuids: number[]){
        this.userEmail = email;
        this.images = images;
        this.postText = text;
        this.taggedUserIds = tuids;
    }
}