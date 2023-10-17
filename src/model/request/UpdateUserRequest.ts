export default class UpdateUserRequest {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    gender: string;
    dateOfBirth: string;
    profileImage: string;
  
    constructor(
      id: number,
      firstname: string,
      lastname: string,
      email: string,
      gender: string,
      dateOfBirth: string,
      profileImage: string
    ) {
      this.id = id;
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.gender = gender;
      this.dateOfBirth = dateOfBirth;
      this.profileImage = profileImage;
    }
  }
  