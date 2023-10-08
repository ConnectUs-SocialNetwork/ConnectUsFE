import PagePost from "./PagePostResponse"; 

export default class PagePosts {
    posts: PagePost[];

    constructor(posts: PagePost[]) {
        this.posts = posts;
    }
}