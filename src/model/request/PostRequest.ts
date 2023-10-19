export default class PostRequest{
    userEmail: string;
    images: string[];
    postText: string;

    constructor(email: string, images: string[], text: string){
        this.userEmail = email;
        this.images = images;
        this.postText = text;
    }
}