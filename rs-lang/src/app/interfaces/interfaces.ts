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
  _id: string;
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
  difficulty: string;
  userWord?: HardWords;
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
  id?: number;
  digit: string;
  title: string;
  text: string;
  words: number;
  color: string;
}

export interface Parameters {
  page: number;
  currentLevel: number;
  prevPage: number;
  prevLevel: number;
  words: IWord[] | null;
  hardWords: String[] | null;
  easeWords: String[] | null;
  arr: HardWords[] | null;
  arrEase: HardWords[] | null;
}

export interface HardWords {
  id: string;
  difficulty: string;
  wordId: string;
  optional?: {
    isLearned: boolean;
  };
}

export interface EaseWords {
  id: string;
  difficulty: string;
  wordId: string;
  optional?: {
    isLearned: boolean;
  };
}

export interface IOption {
  word: IWord;
  class: string;
}

interface gameStatista {
  newWords: HardWords[];
  correctPercents: number[];
  series: number[];
}

export interface IUserStatista {
  id?: number;
  learnedWords: number;
  optional: {
    sprint: gameStatista;
    audio: gameStatista;
  };
}
