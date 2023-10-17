import PagePost from "./PagePostResponse"; 

export default class PagePosts {
    avatar: string;
    posts: PagePost[];

    constructor(posts: PagePost[], avatar: string) {
        this.posts = posts;
        this.avatar = avatar;
    }
}