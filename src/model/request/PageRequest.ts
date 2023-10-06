export default class PageRequest{
    name: string;
    description: string;
    category: string;
    administratorId: number;

    constructor(name: string, description: string, category: string, administratorId: number){
        this.name = name;
        this.description = description;
        this.category = category;
        this.administratorId = administratorId;
    }
}