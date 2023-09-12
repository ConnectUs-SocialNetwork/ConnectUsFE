import LoginResponse from "../model/LoginResponse";

export function useLoggedUserInformation(): LoginResponse | null {
    try {
      const loggedUser= localStorage.getItem('loginResponse');
      if (loggedUser) {
        return JSON.parse(loggedUser);
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }