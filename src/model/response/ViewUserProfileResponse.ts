export class ViewUserProfileResponse{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    dateOfBirth: Date;
    gender: string;
    profileImage: string;
    friends: boolean;
    numberOfFriends: number;
    numberOfMutualFriends: number;
  
    constructor(
      id: number,
      firstname: string,
      lastname: string,
      email: string,
      dateOfBirth: Date,
      gender: string,
      image: string,
      friends: boolean,
      nof: number,
      nomf: number,
    ) {
      this.id = id;
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.dateOfBirth = dateOfBirth;
      this.gender = gender;
      this.profileImage = image;
      this.friends = friends;
      this.numberOfFriends = nof;
      this.numberOfMutualFriends = nomf;
    }
}