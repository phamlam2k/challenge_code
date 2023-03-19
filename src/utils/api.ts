import { SELECT_SEARCH } from './common'
import {
  CreditsDataResponse,
  MovieDetailData,
  NowPlayingDataResponse,
  PopularMovieDataResponse,
  PopularTvShowDataResponse,
  TopRatedDataResponse,
  TrendListDataResponse,
  TvDetailData,
  VideoMovieDataResponse,
} from 'src/models/api'
import { TREND_TIME_TYPE, TREND_TYPE } from 'src/models/common'

export const API_BASE_URL = process.env.API_BASE_URL ?? 'https://api.themoviedb.org/3'
export const API_KEY = process.env.API_KEY ?? 'a37241f847697db472f3c7f222a20931'

export const getTrendingList = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/trending/${TREND_TYPE.MOVIE}/${TREND_TIME_TYPE.WEEK}?api_key=${API_KEY}`,
      {
        method: 'GET',
      },
    )

    const rawResponse = (await response.json()) as TrendListDataResponse

    if (rawResponse) {
      return rawResponse
    }

    return
  } catch (error) {
    console.log(error)
  }
}

export const getNowPlayingList = async (input: { page: number }) => {
  try {
    const { page } = input

    let startPage = page ?? 1

    const response = await fetch(`${API_BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${startPage}`, {
      method: 'GET',
    })

    const rawResponse = (await response.json()) as NowPlayingDataResponse

    if (rawResponse) {
      return rawResponse
    }

    return
  } catch (error) {
    console.log(error)
  }
}

export const getTopRatedList = async (input: { page: number }) => {
  try {
    const { page } = input

    let startPage = page ?? 1

    const response = await fetch(`${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${startPage}`, {
      method: 'GET',
    })

    const rawResponse = (await response.json()) as TopRatedDataResponse

    if (rawResponse) {
      return rawResponse
    }

    return
  } catch (error) {
    console.log(error)
  }
}

export const getTVShowPopularList = async (input: { page: number }) => {
  try {
    const { page } = input

    let startPage = page ?? 1

    const response = await fetch(`${API_BASE_URL}/tv/popular?api_key=${API_KEY}&page=${startPage}`, {
      method: 'GET',
    })

    const rawResponse = (await response.json()) as PopularTvShowDataResponse

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}

export const getSearchMulti = async (input: { type: string; query: string; page: number }) => {
  try {
    const { page, query, type } = input

    let startPage = page ?? 1

    const response = await fetch(
      `${API_BASE_URL}/search/${type ?? SELECT_SEARCH[0].value}?api_key=${API_KEY}&page=${startPage}&query=${query}`,
      {
        method: 'GET',
      },
    )

    const rawResponse = (await response.json()) as TrendListDataResponse

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}

export const getPopularMovieList = async (input: { page: number }) => {
  try {
    const { page } = input

    let startPage = page ?? 1

    const response = await fetch(`${API_BASE_URL}/movie/popular?api_key=${API_KEY}&page=${startPage}`, {
      method: 'GET',
    })

    const rawResponse = (await response.json()) as PopularMovieDataResponse

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}

export const getMovieDetail = async (input: { id: string }) => {
  try {
    const { id } = input

    if (!id) {
      return { success: false, results: null, message: 'Invalid Id Movie' }
    }

    const response = await fetch(`${API_BASE_URL}/movie/${id}?api_key=${API_KEY}`, {
      method: 'GET',
    })

    const rawResponse = (await response.json()) as MovieDetailData

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}

export const getVideoMovieDetail = async (input: { id: string }) => {
  try {
    const { id } = input

    if (!id) {
      return { success: false, results: null, message: 'Invalid Id Movie' }
    }

    const response = await fetch(`${API_BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`, {
      method: 'GET',
    })

    const rawResponse = (await response.json()) as VideoMovieDataResponse

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}

export const getVideoTvDetail = async (input: { id: string }) => {
  try {
    const { id } = input

    if (!id) {
      return { success: false, results: null, message: 'Invalid Id TV' }
    }

    const response = await fetch(`${API_BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`, {
      method: 'GET',
    })

    const rawResponse = (await response.json()) as VideoMovieDataResponse

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}

export const getCredits = async (input: { id: string }) => {
  try {
    const { id } = input

    if (!id) {
      return { success: false, results: null, message: 'Invalid Id Movie' }
    }

    const response = await fetch(`${API_BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`, {
      method: 'GET',
    })

    const rawResponse = (await response.json()) as CreditsDataResponse

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}

export const getCreditsTv = async (input: { id: string }) => {
  try {
    const { id } = input

    if (!id) {
      return { success: false, results: null, message: 'Invalid Id Movie' }
    }

    const response = await fetch(`${API_BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`, {
      method: 'GET',
    })

    const rawResponse = (await response.json()) as CreditsDataResponse

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}

export const getTVDetail = async (input: { id: string }) => {
  try {
    const { id } = input

    if (!id) {
      return { success: false, results: null, message: 'Invalid Id TV' }
    }

    const response = await fetch(`${API_BASE_URL}/tv/${id}?api_key=${API_KEY}`, {
      method: 'GET',
    })

    const rawResponse = (await response.json()) as TvDetailData

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    console.log(error)
  }
}
