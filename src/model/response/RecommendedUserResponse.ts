export default class RecommendedUserResponse {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    profileImage: string;
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
        this.numberOfFriends = numberOfFriends;
        this.numberOfMutualFriends = numberOfMutualFriends;
        this.country = country;
        this.city = city;
        this.street = street;
        this.number = number;
    }
}
