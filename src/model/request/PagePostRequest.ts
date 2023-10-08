export default class PagePostRequest{
    pageId: string;
    imageInBase64: string;
    postText: string;

    constructor(email: string, image: string, text: string){
        this.pageId = email;
        this.imageInBase64 = image;
        this.postText = text;
    }
}