export class RegistrationRequest {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  gender: string;

  constructor(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    dateOfBirth: string,
    gender: string
  ) {
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
  }
}
