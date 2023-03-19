import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useQuery } from '@tanstack/react-query'
import { Layout } from '..'
import { CreditsData, CreditsDataResponse, TvDetailData, VideoMovieDataResponse } from 'src/models/api'
import { IMAGE_URL, IMAGE_WIDTH } from 'src/models/common'
import { StarIcon } from 'src/common/CustomIcons'
import { LoadingScreen } from 'src/common/LoadingScreen'
import { getCreditsTv, getTVDetail, getVideoTvDetail } from 'src/utils/api'
import { filterCast } from 'src/utils/common'
import { QUERY_KEYS } from 'src/utils/keys'

dayjs.extend(utc)

type ParamProps = {
  id: string
}

interface Departments {
  actors: string[]
  director: string[]
  editor: string[]
  writer: string[]
  producer: string[]
  crew: string[]
  sound: string[]
}

export const TVScreen = () => {
  const { id } = useParams<ParamProps>()

  const [departments, setDepartments] = useState<Departments>({
    actors: [''],
    director: [''],
    editor: [''],
    writer: [''],
    producer: [''],
    crew: [''],
    sound: [''],
  })

  const { data: tv, isLoading: isTVLoading } = useQuery(
    [QUERY_KEYS.TV_DETAIL, id],
    async () => {
      try {
        if (id) {
          const response = (await getTVDetail({ id })) as TvDetailData

          if (response) {
            return response
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      cacheTime: 5000000,
      enabled: !!id,
    },
  )

  const { data: videoTv, isLoading: isVideoMovieLoading } = useQuery(
    [QUERY_KEYS.VIDEO_TV, id],
    async () => {
      if (id) {
        const response = (await getVideoTvDetail({ id })) as VideoMovieDataResponse

        if (response) {
          return response.results
        }
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      cacheTime: 5000000,
      enabled: !!id,
    },
  )

  const { data: credits, isLoading: isCreditsLoading } = useQuery(
    [QUERY_KEYS.CREDITS_TV, id],
    async () => {
      try {
        if (id) {
          const response = (await getCreditsTv({ id })) as CreditsDataResponse

          if (response) {
            return response
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      cacheTime: 5000000,
      enabled: !!id,
    },
  )

  useEffect(() => {
    if (credits) {
      const arrayCommon: CreditsData[] = credits.cast.concat(credits.crew)
      const cast = filterCast(arrayCommon)

      setDepartments(cast)
    }
  }, [credits])

  if (isTVLoading || isVideoMovieLoading || isCreditsLoading) {
    return (
      <div className="w-screen h-screen">
        <LoadingScreen />
      </div>
    )
  }

  return (
    <Layout>
      {tv && (
        <div className="w-full h-screen overflow-hidden">
          <div className="w-full h-screen">
            <img
              className="absolute w-full object-cover h-full"
              src={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}/${tv.poster_path}`}
              alt={tv.name ?? 'Image'}
            />
            <div className="absolute w-full h-full bg-[#000000a9] z-10" />
            <div className="relative container lg:w-[1100px] mx-auto z-10 pt-[60px]">
              <div className="flex justify-between items-center">
                <div className="text-[#FFFFFF]">
                  <p className="text-[32px]">{tv.name}</p>
                  <div className="flex items-center gap-[10px]">
                    <p>{dayjs(tv.first_air_date).format('YYYY-MM-DD')}</p>
                    <div className="w-[5px] h-[5px] rounded-full bg-[#FFFFFF]" />
                    <p>Season {tv.number_of_seasons}</p>
                    <div className="w-[5px] h-[5px] rounded-full bg-[#FFFFFF]" />
                    <p>
                      {tv.number_of_episodes}/{tv.number_of_episodes}
                    </p>
                  </div>
                </div>
                <div className="flex gap-[30px]">
                  <div className="flex flex-col gap-[5px]">
                    <p className="text-[20px] text-[#808080] font-semibold text-center uppercase">The Rating</p>
                    <div className="flex items-center gap-[6px] text-[#808080] font-semibold">
                      <StarIcon width={48} height={48} />
                      <div>
                        <p>
                          <span className="text-[#FFFFFF]">{tv.vote_average}</span>/10
                        </p>
                        <p>{tv.vote_count}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    <p className="text-[20px] text-[#808080] font-semibold text-center uppercase">Popularity</p>
                    <p className="text-[20px] text-center text-[#FFFFFF]">{tv.popularity}</p>
                  </div>
                </div>
              </div>
              {videoTv && videoTv.length > 0 && (
                <div className="mt-[30px] flex flex-wrap h-[450px] gap-[10px]">
                  <img
                    className="object-cover h-full"
                    src={`${IMAGE_URL}/${IMAGE_WIDTH.W342}/${tv.poster_path}`}
                    alt={tv.name ?? 'Image'}
                  />
                  <iframe
                    src={`https://www.youtube.com/embed/${videoTv[0].key}`}
                    className="flex-1 h-full cursor-pointer"
                    title={videoTv[0].name}
                  />
                </div>
              )}
              <div className="mt-[15px]">
                <div className="flex gap-[15px]">
                  {tv.genres.map((genre: { id: number; name: string }) => (
                    <div
                      key={genre?.id}
                      className="px-[20px] text-center py-[5px] border-[#808080] text-[#FFFFFF] border-[1px] rounded-full"
                    >
                      {genre.name}
                    </div>
                  ))}
                </div>
                <div className="mt-[10px] flex gap-[20px]">
                  <div className="w-[calc(100%-350px)]">
                    <p className="text-[#FFFFFF]">{tv.overview}</p>
                    <div className="mt-[5px]">
                      <div className="flex items-center gap-[20px] text-[#FFFFFF] border-[#FFFFFF] border-b-[1px] pb-[5px]">
                        <p className="text-[22px] font-semibold">Director: </p>
                        <div className="flex items-center gap-[10px]">
                          {departments.director.map((director: string, index: number) => (
                            <div className="flex items-center gap-[10px]">
                              <p className="" key={index}>
                                {director}
                              </p>
                              <div className="w-[2px] h-[2px] bg-[#FFFFFF]" />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex mt-[10px] items-center gap-[20px] text-[#FFFFFF] border-[#FFFFFF] border-b-[1px] pb-[5px]">
                        <p className="text-[22px] font-semibold">Writers: </p>
                        <div className="flex items-center gap-[10px]">
                          {departments.writer.map((writer: string, index: number) => (
                            <div className="flex items-center gap-[10px]">
                              <p className="" key={index}>
                                {writer}
                              </p>
                              <div className="w-[2px] h-[2px] bg-[#FFFFFF]" />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex mt-[10px] items-center gap-[20px] text-[#FFFFFF] border-[#FFFFFF] border-b-[1px] pb-[5px]">
                        <p className="text-[22px] font-semibold">Stars: </p>
                        <div>
                          {departments.actors.map((actor: string, index: number) => (
                            <div className="flex items-center gap-[10px]">
                              <p className="" key={index}>
                                {actor}
                              </p>
                              <div className="w-[2px] h-[2px] bg-[#FFFFFF]" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[350px] bg-[#FFFFFF] p-[10px]">
                    <div className="text-[#000] text-[22px] text-center font-semibold">Co-operation Companies</div>
                    <div className="flex gap-[30px] flex-wrap mt-[10px] items-center">
                      {tv.production_companies.map(
                        (company: { id: number; logo_path: string; name: string; origin_country: string }) => (
                          <div className="relative group w-fit h-fit cursor-pointer" key={company?.id}>
                            <LazyLoadImage
                              src={`${IMAGE_URL}/${IMAGE_WIDTH.W92}/${company.logo_path}`}
                              alt={tv.name ?? 'Image'}
                              className=""
                            />
                            <div className="group-hover:block py-[2px] px-[5px] text-[12px] w-fit absolute z-20 hidden top-[-20px] left-[50%] bg-[#FFFFFF]">
                              {company.name}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
