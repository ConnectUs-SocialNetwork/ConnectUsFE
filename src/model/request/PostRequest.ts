export default class PostRequest{
    userEmail: string;
    imageInBase64: string;
    postText: string;

    constructor(email: string, image: string, text: string){
        this.userEmail = email;
        this.imageInBase64 = image;
        this.postText = text;
    }
}