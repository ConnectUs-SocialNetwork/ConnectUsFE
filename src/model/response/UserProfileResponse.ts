class UserProfileResponse {
    id: number;
    firstname: string;
    lastname: string;
    profilePicture: string;
    numberOfFriends: number;
    numberOfMutualFriends: number;
    friends: boolean;
    requested: boolean;
  
    constructor(
      id: number,
      firstname: string,
      lastname: string,
      profilePicture: string,
      numberOfFriends: number,
      numberOfMutualFriends: number,
      friends: boolean,
      requested: boolean
    ) {
      this.id = id;
      this.firstname = firstname;
      this.lastname = lastname;
      this.profilePicture = profilePicture;
      this.numberOfFriends = numberOfFriends;
      this.numberOfMutualFriends = numberOfMutualFriends;
      this.friends = friends;
      this.requested = requested;
    }
  }
  