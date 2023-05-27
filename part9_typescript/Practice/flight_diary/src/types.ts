export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}
export type NewDiaryEntry = Omit<DiaryEntry, "id">;

/*

Note that, if we want to be able to save entries without a certain field
e.g. comment, we could set the type of the field as optional by adding ? to the type declaration:


*/
export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

// ? We omit the comment filed and the id
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment" | "id">;
