export default class SearchPageResponse{
    id:number;
    name: string;
    description: string;
    category: string;
    administratorId: number;
    numberOfLikes: number;
    liked: boolean;
    avatar: string;

    constructor(id: number, name: string, des: string, cat: string, adminId: number, nol: number, liked: boolean, avatar: string){
        this.id = id;
        this.administratorId = adminId;
        this.category = cat;
        this.description = des;
        this.name = name;
        this.numberOfLikes = nol;
        this.liked = liked;
        this.avatar = avatar;
    }
}