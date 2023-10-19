export default class PagePost {
    postId: number;
    pageId: number;
    name: string;
    profileImage: string;
    images: string[];
    text: string;
    dateAndTime: string;
    liked: boolean;
    numberOfLikes: number;
    numberOfComments: number;

    constructor(id: number, commentators: number, profileImage: string, userId: number, firstname: string, imageInBase64: string[], text: string, dateAndTime: string, isLiked: boolean, likes: number) {
        this.postId = id;
        this.images = imageInBase64;
        this.text = text;
        this.dateAndTime = dateAndTime;
        this.liked = isLiked;
        this.numberOfLikes = likes;
        this.name = firstname;
        this.pageId = userId;
        this.profileImage = profileImage;
        this.numberOfComments = commentators;
    }
}
