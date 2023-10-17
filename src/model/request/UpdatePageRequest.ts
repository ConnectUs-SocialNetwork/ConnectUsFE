export default class UpdatePageRequest {
    id: number;
    name: string | null;
    description: string | null;
    category: string | null;
    avatar: string | null;
  
    constructor(
      id: number,
      name: string | null,
      description: string | null,
      category: string | null,
      avatar: string | null
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.category = category;
      this.avatar = avatar;
    }
  }
  