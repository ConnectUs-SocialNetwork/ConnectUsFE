export default class PageResponse{
    name: string;
    description: string;
    category: string;
    administratorId: number;

    constructor(name: string, des: string, cat: string, adminId: number){
        this.administratorId = adminId;
        this.category = cat;
        this.description = des;
        this.name = name;
    }
}