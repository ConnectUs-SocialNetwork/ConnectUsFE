export default class Post {
    id: number;
    imageInBase64: string;
    text: string;
    dateAndTime: string;

    constructor(id: number, imageInBase64: string, text: string, dateAndTime: string) {
        this.id = id;
        this.imageInBase64 = imageInBase64;
        this.text = text;
        this.dateAndTime = dateAndTime;
    }
}
