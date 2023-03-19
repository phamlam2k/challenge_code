import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useQuery } from '@tanstack/react-query'
import { Layout } from '..'
import { LoadingScreen } from 'src/common/LoadingScreen'
import {
  NowPlayingData,
  NowPlayingDataResponse,
  PopularTvShowData,
  PopularTvShowDataResponse,
  TrendListData,
  TrendListDataResponse,
} from 'src/models/api'
import { Genres, IMAGE_URL, IMAGE_WIDTH } from 'src/models/common'
import { QUERY_KEYS } from 'src/utils/keys'
import { getNowPlayingList, getTVShowPopularList, getTrendingList } from 'src/utils/api'
import { PlayIcon } from 'src/common/CustomIcons'
import { settingSlideList, settings } from 'src/utils/slider'

dayjs.extend(utc)

export const HomeScreen = () => {
  const [page] = useState(1)

  const { data: trend_list, isLoading: isTrendListLoading } = useQuery(
    [QUERY_KEYS.TREND_LIST],
    async () => {
      const response = (await getTrendingList()) as TrendListDataResponse

      if (response) {
        return response.results
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      cacheTime: 5000000,
    },
  )

  const { data: nowPlayingList, isLoading: isNowPlayingLoading } = useQuery(
    [QUERY_KEYS.NOWPLAYING_LIST],
    async () => {
      const response = (await getNowPlayingList({ page })) as NowPlayingDataResponse

      if (response) {
        return response.results
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      cacheTime: 5000000,
    },
  )

  const { data: popularTvShowList, isLoading: isPopularTvShowList } = useQuery(
    [QUERY_KEYS.POPULAR_TV_SHOW_LIST],
    async () => {
      const response = (await getTVShowPopularList({ page })) as PopularTvShowDataResponse

      if (response) {
        return response
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      cacheTime: 5000000,
    },
  )

  if (isNowPlayingLoading || isTrendListLoading || isPopularTvShowList) {
    return (
      <div className="w-screen h-screen">
        <LoadingScreen />
      </div>
    )
  }

  return (
    <Layout>
      <div className="w-[calc(100%-50px)] md:container lg:w-[1100px] mt-[100px] mx-auto pb-[50px]">
        {trend_list && (
          <Slider {...settings} className="h-[400px] relative">
            {trend_list?.map((item: TrendListData, index: number) => (
              <div className={`w-full h-[400px]`} key={index}>
                <div className="absolute w-full h-full bg-[#00000074] z-10" />

                <LazyLoadImage
                  src={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}/${item.poster_path}`}
                  height={400}
                  effect="blur"
                  wrapperClassName="object-cover w-full absolute top-0 left-0 z-1"
                  alt={item.title ?? item.name ?? 'Image'}
                />

                <div className="text-[#FFFFFF] absolute bottom-[40px] left-[20px] z-100">
                  <Link
                    to={`/movie/${item.id}`}
                    className="w-[100px] py-[10px] bg-yellow-500 flex items-center gap-[6px] justify-center rounded-lg"
                  >
                    <PlayIcon width={24} height={24} color="#FFFFFF" />
                    <p>Watch</p>
                  </Link>
                  <p className="text-[42px] font-semibold">{item.title ?? item.name}</p>
                  <div className="flex gap-[10px] items-center">
                    <p>{dayjs(item.release_date).utc().local().format('YYYY')}</p>
                    <div className="w-[5px] h-[5px] rounded-full bg-[#FFFFFF]" />
                    <div className="flex gap-[10px]">
                      {item.genre_ids.map((genre: number) => (
                        <div key={genre}>{Genres[genre]}</div>
                      ))}
                    </div>
                    {item.origin_country?.map((country: string, index: number) => (
                      <>
                        <div className="w-[5px] h-[5px] rounded-full bg-[#FFFFFF]" />
                        <p key={index}>{country}</p>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}

        {nowPlayingList && (
          <div className="w-full mt-[30px]">
            <div className="flex justify-between items-center">
              <p className="text-[22px]">Now Playing</p>
              <Link to={'/now_playing'} className="underline">
                See all
              </Link>
            </div>
            <Slider {...settingSlideList} className="h-[200px] mt-[10px] relative">
              {nowPlayingList?.map((item: NowPlayingData, index: number) => (
                <Link key={index} to={`/movie/${item.id}`} className="relative group max-sm:mx-auto h-[200px] w-[90%]">
                  <div className="absolute text-[#FFFFFF] group-hover:flex flex-col justify-center items-center hidden w-[95%] h-full bg-[#00000088] z-10">
                    <PlayIcon width={48} height={48} color="#FFFFFF" />
                  </div>
                  <LazyLoadImage
                    src={`${IMAGE_URL}/${IMAGE_WIDTH.W342}/${item.poster_path}`}
                    className="relative z-1 h-full w-[95%] object-cover"
                    alt={item.title ?? item.name ?? 'Image'}
                  />
                </Link>
              ))}
            </Slider>
          </div>
        )}

        {popularTvShowList && (
          <div className="w-full mt-[30px]">
            <div className="flex justify-between items-center">
              <p className="text-[22px]">TV Show</p>
              <Link to={'/tv_show'} className="underline">
                See all
              </Link>
            </div>
            <Slider {...settingSlideList} className="h-[200px] mt-[10px] relative">
              {popularTvShowList?.results.map((item: PopularTvShowData, index: number) => (
                <Link key={index} to={`/tv/${item.id}`} className="relative group max-sm:mx-auto h-[200px] w-[90%]">
                  <div className="absolute text-[#FFFFFF] group-hover:flex flex-col justify-center items-center hidden w-[95%] h-full bg-[#00000088] z-10">
                    <PlayIcon width={48} height={48} color="#FFFFFF" />
                  </div>
                  <LazyLoadImage
                    src={`${IMAGE_URL}/${IMAGE_WIDTH.W342}/${item.poster_path}`}
                    className="relative z-1 h-full w-[95%] object-cover"
                    alt={item.title ?? item.name ?? 'Image'}
                  />
                </Link>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </Layout>
  )
}
