export class SearchUserResponse {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  profileImage: string;
  friend: boolean;
  numberOfFriends: number;
  numberOfMutualFriends: number;
  country: string;
  city: string;
  street: string;
  number: string;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    profileImage: string,
    friend: boolean,
    numberOfFriends: number,
    numberOfMutualFriends: number,
    country: string,
    city: string,
    street: string,
    number: string
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.profileImage = profileImage;
    this.friend = friend;
    this.numberOfFriends = numberOfFriends;
    this.numberOfMutualFriends = numberOfMutualFriends;
    this.country = country;
    this.city = city;
    this.street = street;
    this.number = number;
  }
}

export default SearchUserResponse;
