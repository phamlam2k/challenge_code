import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useQuery } from '@tanstack/react-query'
import { Layout } from '..'
import { CardSkeletonLoading } from 'src/common/CardSkeletonLoading'
import { PlayIcon } from 'src/common/CustomIcons'
import { Pagination } from 'src/common/Pagination'
import { NowPlayingData, PopularTvShowDataResponse } from 'src/models/api'
import { IMAGE_URL, IMAGE_WIDTH } from 'src/models/common'
import { getTVShowPopularList } from 'src/utils/api'
import { QUERY_KEYS } from 'src/utils/keys'

export const TVShowScreen = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [page, setPage] = useState(Number(searchParams.get('page') ?? 1))

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
    },
  )

  const onChangePage = (page: number) => {
    setPage(page)
    navigate({
      pathname: '/now_playing',
      search: `?page=${page}`,
    })
  }

  if (isPopularTvShowList) {
    return (
      <Layout>
        <CardSkeletonLoading card={20} />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="w-[calc(100%-30px)] md:container lg:w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] mt-[80px]">
        {popularTvShowList &&
          popularTvShowList.results?.map((item: NowPlayingData, index: number) => (
            <Link key={index} to={`/tv/${item.id}`} className="relative group max-sm:mx-auto overflow-hidden">
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
      {popularTvShowList && (
        <div className="w-fit mx-auto mt-[20px] pb-[30px]">
          <Pagination
            currentPage={popularTvShowList.page}
            pageSize={popularTvShowList.total_pages}
            totalPages={popularTvShowList.total_pages}
            totalRecord={popularTvShowList.total_results}
            onChange={onChangePage}
          />
        </div>
      )}
    </Layout>
  )
}
