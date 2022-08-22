export interface INewUser {
  email: string;
  name?: string;
  password: string;
}

export interface ICurrentUser {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface Level {
  id?: number
  digit: string,
  title: string
  text: string,
  words: number,
  color: string
}