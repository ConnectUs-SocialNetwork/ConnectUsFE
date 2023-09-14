export class RegistrationRequest {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  dateOfBirth: Date;
  gender: Gender;

  constructor(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    dateOfBirth: Date,
    gender: Gender
  ) {
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
  }
}

enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
