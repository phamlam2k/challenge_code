import { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useQuery } from '@tanstack/react-query'
import { Layout } from '..'
import { CardSkeletonLoading } from 'src/common/CardSkeletonLoading'
import { Pagination } from 'src/common/Pagination'
import { SearchMultiData, SearchTvData, SearchMovieData, SearchDataResponse } from 'src/models/api'
import { IMAGE_URL, IMAGE_WIDTH } from 'src/models/common'
import { getSearchMulti } from 'src/utils/api'
import { QUERY_KEYS } from 'src/utils/keys'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { SELECT_SEARCH } from 'src/utils/common'
import { PlayIcon } from 'src/common/CustomIcons'

export const SearchMultiScreen = () => {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [page, setPage] = useState<number>(1)

  const { data: searchData, isLoading: isSearchLoading } = useQuery(
    [QUERY_KEYS.TOP_RATED_LIST, page, location],
    async () => {
      try {
        const response = (await getSearchMulti({
          type: searchParams.get('type') ?? SELECT_SEARCH[0].value,
          page,
          query: searchParams.get('q') ?? '',
        })) as any

        if (response) {
          return response
        }
      } catch (error) {
        console.log(error)
      }
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: searchParams.get('q') !== '',
    },
  )

  const onChangePage = (page: number) => {
    setPage(page)
    navigate({
      pathname: '/search',
      search: `?q=${searchParams.get('q') ?? ''}&type=${
        searchParams.get('type') ?? SELECT_SEARCH[0].value
      }&page=${page}`,
    })
  }

  if (searchData && isSearchLoading) {
    return (
      <Layout>
        <CardSkeletonLoading card={20} />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="w-[calc(100%-30px)] md:container lg:w-[1100px] mx-auto mt-[80px]">
        {searchData && !isSearchLoading && searchParams.get('q') !== '' ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] mt-[20px]">
            {searchData.results?.map((item: any, index: number) => (
              <Link
                key={index}
                to={`/${searchParams.get('type') !== 'multi' ? searchParams.get('type') : item.media_type}/${item.id}`}
                className="relative group max-sm:mx-auto overflow-hidden"
              >
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
        ) : (
          <div className="w-full">
            <p className="text-[48px] font-semibold">Search</p>
            <p>Search movies or tv shows by typing a word or phrase in the search box at the top of this page.</p>
          </div>
        )}
        {searchData && searchData.results.length > 0 && (
          <div className="w-fit mx-auto mt-[20px] pb-[30px]">
            <Pagination
              currentPage={searchData.page}
              pageSize={searchData.total_pages}
              totalPages={searchData.total_pages}
              totalRecord={searchData.total_results}
              onChange={onChangePage}
            />
          </div>
        )}
      </div>
    </Layout>
  )
}
