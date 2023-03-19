export interface TrendListDataResponse {
  page: number
  results: TrendListData[]
  total_pages: number
  total_results: number
}

export interface NowPlayingDataResponse {
  dates: {
    maximum: string
    minimum: string
  }
  page: number
  results: NowPlayingData[]
  total_pages: number
  total_results: number
}

export interface TopRatedDataResponse {
  page: number
  results: TopRatedData[]
  total_pages: number
  total_results: number
}

export interface SearchDataResponse {
  page: number
  results: SearchMultiData[] | SearchMovieData[] | SearchTvData[]
  total_pages: number
  total_results: number
}

export interface PopularMovieDataResponse {
  page: number
  results: PopularMovieData[]
  total_pages: number
  total_results: number
}

export interface PopularTvShowDataResponse {
  page: number
  results: PopularMovieData[]
  total_pages: number
  total_results: number
}

export interface VideoMovieDataResponse {
  id: string
  results: VideoMovieData[]
}

export interface CreditsDataResponse {
  id: string
  cast: CreditsData[]
  crew: CreditsData[]
}

export interface TrendListData {
  poster_path: string | null
  adults: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  id: number
  origin_country: string[] | null
  original_title: string
  original_language: string
  name: string | null
  title: string | null
  backdrop_path: string | null
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}

export interface NowPlayingData {
  poster_path: string | null
  adults: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  id: number
  original_title: string
  original_language: string
  name: string | null
  title: string | null
  backdrop_path: string | null
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}

export interface TopRatedData {
  poster_path: string | null
  adults: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  id: number
  original_title: string
  original_language: string
  name: string | null
  title: string | null
  backdrop_path: string | null
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}

export interface SearchMultiData {
  adult: boolean
  backdrop_path: string
  id: number
  title: string
  original_language: string
  original_title: string
  overview: string
  poster_path: string
  media_type: string
  genre_ids: number[]
  popularity: number
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface SearchMovieData {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface SearchTvData {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  first_air_date: string
  name: string
  vote_average: boolean
  vote_count: number
}

export interface PopularMovieData {
  poster_path: string | null
  adults: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  id: number
  original_title: string
  original_language: string
  name: string | null
  title: string | null
  backdrop_path: string | null
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}

export interface PopularTvShowData {
  poster_path: string | null
  adults: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  id: number
  original_title: string
  original_language: string
  name: string | null
  title: string | null
  backdrop_path: string | null
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}

export interface MovieDetailData {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: string | null
  budget: number
  genres: { id: number; name: string }[]
  homepage: string
  id: number
  imdb_id: 'string'
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: { id: number; logo_path: string; name: string; origin_country: string }[]
  production_countries: { iso_3166_1: string; name: string }[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[]
  status: string
  tagline: string
  title: string
  video: false
  vote_average: number
  vote_count: number
}

export interface VideoMovieData {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: 720
  type: string
  official: false
  published_at: string
  id: string
}

export interface CreditsData {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id?: number
  character?: string
  credit_id: string
  order?: number
  department?: string
  job?: string
}

export interface TvDetailData {
  adult: boolean
  backdrop_path: string
  created_by: [
    {
      id: number
      credit_id: string
      name: string
      profile_path: string | null
    },
  ]
  episode_run_time: number[]
  first_air_date: string
  genres: {
    id: number
    name: string
  }[]
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: {
    id: number
    name: string
    overview: string
    vote_average: number
    vote_count: number
    air_date: string
    episode_number: number
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string | null
  }
  name: string
  next_episode_to_air: string | null
  networks: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: []
  production_countries: []
  seasons: {
    air_date: string
    episode_count: string
    id: number
    name: string
    overview: string
    poster_path: string | null
    season_number: number
  }[]
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
  type: string
  vote_average: string
  vote_count: string
}
