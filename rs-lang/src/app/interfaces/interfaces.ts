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
  isAuth: boolean;
}

export interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface IAggregatedResp {
  paginatedResults: Array<IWord>;
  totalCount: [
    {
      count: number;
    },
  ];
}

export interface IOption {
  word: IWord;
  class: string;
}
