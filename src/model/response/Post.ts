export default class Post {
    id: number;
    userId: number;
    firstname: string;
    lastname: string;
    profileImage: string;
    imageInBase64: string;
    text: string;
    dateAndTime: string;
    liked: boolean;
    numberOfLikes: number;
    numberOfComments: number;

    constructor(id: number, profileImage: string, userId: number, firstname: string, lastname: string, imageInBase64: string, text: string, dateAndTime: string, isLiked: boolean, likes: number, noc: number) {
        this.id = id;
        this.imageInBase64 = imageInBase64;
        this.text = text;
        this.dateAndTime = dateAndTime;
        this.liked = isLiked;
        this.numberOfLikes = likes;
        this.firstname = firstname;
        this.lastname = lastname;
        this.userId = userId;
        this.profileImage = profileImage;
        this.numberOfComments = noc;
    }

}
