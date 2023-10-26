import Posts from "../../model/response/PostsResponse";
import PostComponent from './Post'
import NoPosts from "./NoPosts";

interface PostsProps {
    posts: Posts;
    onDeletePost: (postId: number) => void;
}

const PostsComponent: React.FC<PostsProps> = ({ posts, onDeletePost }) => {

    return <div>
        {posts.posts.length !== 0 && posts.posts.map((post) => <PostComponent key={post.id} post={post} onDeletePost={onDeletePost}/>)}
        {posts.posts.length === 0 && <NoPosts />}
    </div>
}

export default PostsComponent;