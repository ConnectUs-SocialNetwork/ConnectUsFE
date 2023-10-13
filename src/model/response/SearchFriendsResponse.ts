export class SearchUserResponse {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    profileImage: string;
    friend: boolean;
    numberOfFriends: number;
    numberOfMutualFriends: number;
  
    constructor(
      id: number,
      firstname: string,
      lastname: string,
      email: string,
      profileImage: string,
      friend: boolean,
      numberOfFriends: number,
      numberOfMutualFriends: number,
    ) {
      this.id = id;
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.profileImage = profileImage;
      this.friend = friend;
      this.numberOfFriends = numberOfFriends;
      this.numberOfMutualFriends = numberOfMutualFriends;
    }
  }
  
  export default SearchUserResponse;
  