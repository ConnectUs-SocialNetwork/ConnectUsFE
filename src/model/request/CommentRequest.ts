class CommentRequest {
    text: string;
    userId: number;
    postId: number;
  
    constructor(text: string, userId: number, postId: number) {
      this.text = text;
      this.userId = userId;
      this.postId = postId;
    }
  }
  
  export default CommentRequest;
  