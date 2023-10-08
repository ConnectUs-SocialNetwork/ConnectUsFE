import NoPosts from "../Post/NoPosts";
import PagePosts from "../../model/response/PagePostsResponse";
import PagePostComponent from "./PagePost";

interface PostsProps {
    posts: PagePosts;
}

const PostsComponent: React.FC<PostsProps> = ({ posts }) => {

    return <div>
        {posts.posts.length !== 0 && posts.posts.map((post) => <PagePostComponent key={post.postId} post={post} />)}
        {posts.posts.length === 0 && <NoPosts />}
    </div>
}

export default PostsComponent;