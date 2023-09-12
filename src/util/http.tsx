import { QueryClient } from '@tanstack/react-query';
import LoginData from '../model/LoginRequest';

export const queryClient = new QueryClient();

export async function loginHandler(loginData: LoginData, applyData: any) {
    const response = await fetch(`http://localhost:8081/api/v1/auth/authenticate`, {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include"
    });
  
    if (!response.ok) {
      const error = new Error('An error occurred.');
      //error.message = await response.json();
      throw error;
    }
  
    const { loginResponse } = await response.json();
  
    //applyData(loginResponse)
    return loginResponse;
  }