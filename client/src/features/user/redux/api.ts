import User, { LoginUserData, RegisterUserData } from '../types/User';

export async function authRegister(user: RegisterUserData): Promise<User> {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  return data.user;
}

export async function authLogin(user: LoginUserData): Promise<User> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: { 'Content-type': 'application/json' },
  });

  const data = await response.json();
  console.log(data);
  
  if (data.success === false) {
    alert('Неправильный email или пароль');
  }
  return data.user;
}

export async function authLogout(): Promise<void> {
  await fetch('/api/auth/logout');
}

export async function authCheck(): Promise<User | undefined> {
  const response = await fetch('/api/auth/check');
  const data = await response.json();
  return data.user;
}
