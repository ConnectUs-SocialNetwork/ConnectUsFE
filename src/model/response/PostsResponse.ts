import Post from "./Post"; // Uvozimo klasu Post

export default class Posts {
    posts: Post[];

    constructor(posts: Post[]) {
        this.posts = posts;
    }
}