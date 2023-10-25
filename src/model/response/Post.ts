import SearchUserResponse from "./SearchFriendsResponse";

export default class Post {
    id: number;
    userId: number;
    firstname: string;
    lastname: string;
    profileImage: string;
    images: string[];
    text: string;
    dateAndTime: string;
    liked: boolean;
    numberOfLikes: number;
    numberOfComments: number;
    taggedUsers: SearchUserResponse[];

    constructor(id: number, profileImage: string, taggedUsers: SearchUserResponse[], userId: number, firstname: string, lastname: string, images: string[], text: string, dateAndTime: string, isLiked: boolean, likes: number, noc: number) {
        this.id = id;
        this.images = images;
        this.text = text;
        this.dateAndTime = dateAndTime;
        this.liked = isLiked;
        this.numberOfLikes = likes;
        this.firstname = firstname;
        this.lastname = lastname;
        this.userId = userId;
        this.profileImage = profileImage;
        this.numberOfComments = noc;
        this.taggedUsers = taggedUsers;
    }

}
