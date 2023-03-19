export const IMAGE_URL = process.env.IMAGE_URL || 'https://image.tmdb.org/t/p'

export enum IMAGE_WIDTH {
  W92 = 'w92',
  W154 = 'w154',
  W185 = 'w185',
  W342 = 'w342',
  W500 = 'w500',
  W780 = 'w780',
  ORIGINAL = 'original',
}

export const Genres: { [key: number]: string } = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10742: 'War',
  37: 'Western',
}

export enum TREND_TYPE {
  ALL = 'all',
  MOVIE = 'movie',
  TV = 'tv',
  PERSON = 'person',
}

export enum TREND_TIME_TYPE {
  DAY = 'day',
  WEEK = 'week',
}

export enum DEPARTMENTS {
  ACTING = 'Acting',
  DIRECTING = 'Directing',
  EDITING = 'Editing',
  WRITING = 'Writing',
  PRODUCTION = 'Production',
  CREW = 'Crew',
  SOUND = 'Sound',
}

export interface MenuHeader {
  id: number
  name: string
  path: string
}

export interface IconType {
  width: number
  height: number
  color?: string
}
