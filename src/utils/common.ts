import { CreditsData } from 'src/models/api'
import { DEPARTMENTS, MenuHeader } from 'src/models/common'

interface Departments {
  actors: string[]
  director: string[]
  editor: string[]
  writer: string[]
  producer: string[]
  crew: string[]
  sound: string[]
}

export interface SelectSearch {
  id: number
  name: string
  value: string
}

export const POPULARITY_ACTOR = 70
export const POPULARITY_DIRECTION = 7
export const POPULARITY_WRITING = 4

export const SELECT_SEARCH: SelectSearch[] = [
  {
    id: 1,
    name: 'All',
    value: 'multi',
  },
  {
    id: 2,
    name: 'TV',
    value: 'tv',
  },
  {
    id: 3,
    name: 'Movie',
    value: 'movie',
  },
]

export const MENU_HEADER: MenuHeader[] = [
  {
    id: 1,
    name: 'Now Playing',
    path: '/now_playing',
  },
  {
    id: 2,
    name: 'Top Rated',
    path: '/top_rated',
  },
  {
    id: 3,
    name: 'TV Show',
    path: '/tv_show',
  },
]

export const convertTime = (time: number) => {
  const hour = Math.floor(time / 60)
  const minute = time % 60

  return `${hour}h${minute}`
}

export const filterCast = (casts: CreditsData[]) => {
  let castArr: Departments = {
    actors: [],
    director: [],
    editor: [],
    writer: [],
    producer: [],
    crew: [],
    sound: [],
  }

  casts.map((credit: CreditsData) => {
    switch (credit.known_for_department) {
      case DEPARTMENTS.ACTING:
        if (credit.popularity > POPULARITY_ACTOR && castArr.actors[castArr.actors.length - 1] !== credit.name) {
          castArr.actors.push(credit.name)
        }
        break
      case DEPARTMENTS.DIRECTING:
        if (credit.popularity > POPULARITY_DIRECTION) {
          castArr.director.push(credit.name)
        }
        break
      case DEPARTMENTS.EDITING:
        castArr.editor.push(credit.name)
        break
      case DEPARTMENTS.WRITING:
        if (credit.popularity > POPULARITY_WRITING) {
          castArr.writer.push(credit.name)
        }
        break
      case DEPARTMENTS.CREW:
        castArr.crew.push(credit.name)
        break
      case DEPARTMENTS.SOUND:
        castArr.sound.push(credit.name)
        break
      case DEPARTMENTS.PRODUCTION:
        castArr.producer.push(credit.name)
        break
      default:
        if (credit.popularity > POPULARITY_ACTOR) {
          castArr.actors.push(credit.name)
        }
        break
    }
  })

  return castArr
}
