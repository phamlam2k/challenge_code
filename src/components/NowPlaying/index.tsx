import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Layout } from '..'
import { CardSkeletonLoading } from 'src/common/CardSkeletonLoading'
import { Pagination } from 'src/common/Pagination'
import { NowPlayingData, NowPlayingDataResponse } from 'src/models/api'
import { IMAGE_URL, IMAGE_WIDTH } from 'src/models/common'
import { getNowPlayingList } from 'src/utils/api'
import { QUERY_KEYS } from 'src/utils/keys'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { PlayIcon } from 'src/common/CustomIcons'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export const NowPlayingScreen = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [page, setPage] = useState(Number(searchParams.get('page') ?? 1))

  const { data: nowPlayingList, isLoading: isNowPlayingLoading } = useQuery(
    [QUERY_KEYS.NOWPLAYING_LIST, page],
    async () => {
      const response = (await getNowPlayingList({ page })) as NowPlayingDataResponse

      if (response) {
        return response
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  )

  const onChangePage = (page: number) => {
    setPage(page)
    navigate({
      pathname: '/now_playing',
      search: `?page=${page}`,
    })
  }

  if (isNowPlayingLoading) {
    return (
      <Layout>
        <CardSkeletonLoading card={20} />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="w-[calc(100%-30px)] md:container lg:w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] mt-[80px]">
        {nowPlayingList &&
          nowPlayingList.results?.map((item: NowPlayingData, index: number) => (
            <Link key={index} to={`/movie/${item.id}`} className="relative group max-sm:mx-auto overflow-hidden">
              <div className="absolute text-[#FFFFFF] group-hover:flex flex-col justify-center items-center hidden w-full h-full bg-[#00000088] z-10">
                <PlayIcon width={48} height={48} color="#FFFFFF" />
              </div>
              <LazyLoadImage
                src={`${IMAGE_URL}/${IMAGE_WIDTH.W342}/${item.poster_path}`}
                className="relative z-1"
                alt={item.title ?? item.name ?? 'Image'}
              />
            </Link>
          ))}
      </div>
      {nowPlayingList && (
        <div className="w-fit mx-auto mt-[20px] pb-[30px]">
          <Pagination
            currentPage={nowPlayingList.page}
            pageSize={nowPlayingList.total_pages}
            totalPages={nowPlayingList.total_pages}
            totalRecord={nowPlayingList.total_results}
            onChange={onChangePage}
          />
        </div>
      )}
    </Layout>
  )
}
