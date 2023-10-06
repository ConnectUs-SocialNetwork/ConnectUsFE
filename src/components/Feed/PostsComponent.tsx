import Posts from "../../model/response/PostsResponse";
import PostComponent from '../Feed/Post'
import NoPosts from "./NoPosts";

interface PostsProps {
    posts: Posts;
}

const PostsComponent: React.FC<PostsProps> = ({ posts }) => {

    return <div>
        {posts.posts.length !== 0 && posts.posts.map((post) => <PostComponent key={post.id} post={post} />)}
        {posts.posts.length === 0 && <NoPosts />}
    </div>
}

export default PostsComponent;