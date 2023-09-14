export default class UserResponse {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  dateOfBirth: Date;
  gender: string;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    dateOfBirth: Date,
    gender: string
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
  }
}
