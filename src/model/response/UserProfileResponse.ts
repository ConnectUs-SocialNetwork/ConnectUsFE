class UserProfileResponse {
    id: number;
    firstname: string;
    lastname: string;
    profilePicture: string;
    dateOfBirth: string;
    numberOfFriends: number;
    numberOfMutualFriends: number;
    friends: boolean;
    requestSentByMe: boolean;
    heSentFriendRequest: boolean;
    requestId: number;

    constructor(
      id: number,
      firstname: string,
      lastname: string,
      dob: string,
      profilePicture: string,
      numberOfFriends: number,
      numberOfMutualFriends: number,
      friends: boolean,
      requestSentByMe: boolean,
      heSentFriendRequest: boolean,
      requestId: number,
    ) {
      this.id = id;
      this.firstname = firstname;
      this.lastname = lastname;
      this.dateOfBirth = dob;
      this.profilePicture = profilePicture;
      this.numberOfFriends = numberOfFriends;
      this.numberOfMutualFriends = numberOfMutualFriends;
      this.friends = friends;
      this.requestSentByMe = requestSentByMe;
      this.heSentFriendRequest = heSentFriendRequest;
      this.requestId = requestId;
    }
  }
  