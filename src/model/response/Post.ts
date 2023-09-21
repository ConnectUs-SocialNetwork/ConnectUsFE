export default class Post {
    id: number;
    imageInBase64: string;
    text: string;
    dateAndTime: string;
    liked: boolean;

    constructor(id: number, imageInBase64: string, text: string, dateAndTime: string, isLiked: boolean) {
        this.id = id;
        this.imageInBase64 = imageInBase64;
        this.text = text;
        this.dateAndTime = dateAndTime;
        this.liked = isLiked;
    }
}
