class CommentResponse {
    id: number;
    text: string;
    userId: number;
    firstname: string;
    lastname: string;
    profilePicture: string;
    postId: number;
  
    constructor(
      id: number,
      text: string,
      userId: number,
      firstname: string,
      lastname: string,
      profilePicture: string,
      postId: number
    ) {
      this.id = id;
      this.text = text;
      this.userId = userId;
      this.firstname = firstname;
      this.lastname = lastname;
      this.profilePicture = profilePicture;
      this.postId = postId;
    }
  }
  
  export default CommentResponse;
  