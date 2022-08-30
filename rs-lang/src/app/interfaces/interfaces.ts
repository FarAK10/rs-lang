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

export interface Level {
  id?: number
  digit: string,
  title: string
  text: string,
  words: number,
  color: string
}

export interface Word {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textExampleTranslate: string,
  textMeaningTranslate: string
}

export interface Parameters {
  page: number,
  currentLevel: number,
  words: Word[] | null,
  hardWords: String[] | null,
  easeWords: String[] | null,
  arr: HardWords[] | null
  arrEase: EaseWords[] | null
}

export interface HardWords {
  id: string,
  difficulty: string,
  wordId: string
}

export interface EaseWords {
  id: string,
  difficulty: string,
  wordId: string
}

export interface IOption {
  word: IWord;
  class: string;
}