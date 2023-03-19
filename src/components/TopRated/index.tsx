import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Layout } from '..'
import { NowPlayingData, TopRatedDataResponse } from 'src/models/api'
import { IMAGE_URL, IMAGE_WIDTH } from 'src/models/common'
import { CardSkeletonLoading } from 'src/common/CardSkeletonLoading'
import { Pagination } from 'src/common/Pagination'
import { getTopRatedList } from 'src/utils/api'
import { QUERY_KEYS } from 'src/utils/keys'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { PlayIcon } from 'src/common/CustomIcons'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export const TopRatedScreen = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [page, setPage] = useState(Number(searchParams.get('page') ?? 1))

  const { data: topRatedList, isLoading: isTopRatedLoading } = useQuery(
    [QUERY_KEYS.TOP_RATED_LIST, page],
    async () => {
      const response = (await getTopRatedList({ page })) as TopRatedDataResponse

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
      pathname: '/top_rated',
      search: `?page=${page}`,
    })
  }

  if (isTopRatedLoading) {
    return (
      <Layout>
        <CardSkeletonLoading card={20} />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="w-[calc(100%-30px)] md:container lg:w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] mt-[80px]">
        {topRatedList &&
          topRatedList.results?.map((item: NowPlayingData, index: number) => (
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
      {topRatedList && (
        <div className="w-fit mx-auto mt-[20px] pb-[30px]">
          <Pagination
            currentPage={topRatedList.page}
            pageSize={topRatedList.total_pages}
            totalPages={topRatedList.total_pages}
            totalRecord={topRatedList.total_results}
            onChange={onChangePage}
          />
        </div>
      )}
    </Layout>
  )
}
