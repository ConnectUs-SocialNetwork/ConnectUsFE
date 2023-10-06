class ViewPageResponse {
    constructor(
      public pageId: number,
      public name: string,
      public description: string,
      public category: string,
      public numberOfLikes: number,
      public liked: boolean,
      public avatar: string
    ) {}
  }
  