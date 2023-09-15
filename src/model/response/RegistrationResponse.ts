import TokensResponse from "./TokensResponse";
import UserResponse from "./UserResponse";

export default class RegistrationResponse {
  tokens: TokensResponse;
  user: UserResponse;
  message: string;

  constructor(tokens: TokensResponse, user: UserResponse, message: string) {
    this.tokens = tokens;
    this.user = user;
    this.message = message;
  }
}