export default class RecommendedPageResponse {
    id: number;
    administratorId: number;
    name: string;
    description: string;
    category: string;
    avatar: string;
    numberOfLikes: number;
    
    constructor(
      id: number,
      name: string,
      description: string,
      category: string,
      avatar: string,
      numberOfLikes: number,
      administratorId: number
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.category = category;
      this.avatar = avatar;
      this.numberOfLikes = numberOfLikes;
      this.administratorId = administratorId;
    }
  }
  