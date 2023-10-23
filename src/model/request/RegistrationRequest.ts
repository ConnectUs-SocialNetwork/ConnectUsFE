export class RegistrationRequest {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  gender: string;
  country: string;
  city: string;
  street: string;
  number: string;

  constructor(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    dateOfBirth: string,
    gender: string,
    country: string,
    city: string,
    street: string,
    number: string
  ) {
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.country = country;
    this.city = city;
    this.street = street;
    this.number = number;
  }
}
