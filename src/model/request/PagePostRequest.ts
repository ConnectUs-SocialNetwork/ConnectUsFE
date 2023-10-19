export default class PagePostRequest{
    pageId: string;
    images: string[];
    postText: string;

    constructor(pageId: string, image: string[], text: string){
        this.pageId = pageId;
        this.images = image;
        this.postText = text;
    }
}