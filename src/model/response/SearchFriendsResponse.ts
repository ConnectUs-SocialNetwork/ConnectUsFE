export class SearchUserResponse {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    profileImage: string;
    friend: boolean;
  
    constructor(
      id: number,
      firstname: string,
      lastname: string,
      email: string,
      profileImage: string,
      friend: boolean
    ) {
      this.id = id;
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.profileImage = profileImage;
      this.friend = friend;
    }
  }
  
  export default SearchUserResponse;
  