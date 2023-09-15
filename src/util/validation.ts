export const validateEmail = (email: string) => {
    if(email === ""){
        return "Email field can't be empty!"
    }
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (emailRegex.test(email)) {
      return '';
    } else {
      return "Invalid email format. Please use a valid email format like 'example@email.com'.";
    }
  }
  
  // Funkcija za naprednu validaciju lozinke
  export const validatePassword = (password: string) => {
    if(password === ""){
        return "Password field can't be empty!"
    }

    if (password.length < 8) {
      return "Password is too short. It must be at least 8 characters long.";
    }
  
    // Provera da li sadrži najmanje jedno veliko slovo
    const uppercaseRegex = /[A-Z]/;
    if (!uppercaseRegex.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
  
    // Provera da li sadrži najmanje jedno malo slovo
    const lowercaseRegex = /[a-z]/;
    if (!lowercaseRegex.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
  
    // Provera da li sadrži najmanje jedan broj
    const digitRegex = /[0-9]/;
    if (!digitRegex.test(password)) {
      return "Password must contain at least one digit (0-9).";
    }
  
    // Provera da li sadrži najmanje jedan poseban znak
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    if (!specialCharRegex.test(password)) {
      return "Password must contain at least one special character (e.g., @, #, $, %, etc.).";
    }
  
    return '';
  }

  export function validateName(name: string): string {
    // Proveravamo da li je uneseno ime prazan string ili undefined/null
    if (!name || name.trim() === "") {
      return "Name field can't be empty.";
    }
  
    // Proveravamo da li prvo slovo (indeks 0) je veliko slovo
    const firstChar = name.charAt(0);
    if (firstChar !== firstChar.toUpperCase()) {
      return "Name should start with a capital letter.";
    }
  
    // Ako je sve u redu, vraćamo prazan string (nema greške)
    return "";
  }

  export function validateLastname(name: string): string {
    // Proveravamo da li je uneseno ime prazan string ili undefined/null
    if (!name || name.trim() === "") {
      return "Lastname field can't be empty.";
    }
  
    // Proveravamo da li prvo slovo (indeks 0) je veliko slovo
    const firstChar = name.charAt(0);
    if (firstChar !== firstChar.toUpperCase()) {
      return "Lastname should start with a capital letter.";
    }
  
    // Ako je sve u redu, vraćamo prazan string (nema greške)
    return "";
  }