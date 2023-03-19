import { useCallback, useRef, useState } from 'react'
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import debounce from 'lodash.debounce'
import { MenuIcon, SearchIcon } from '../CustomIcons'
import { MenuHeader } from 'src/models/common'
import { MENU_HEADER, SELECT_SEARCH, SelectSearch } from 'src/utils/common'
import { useClickOutside } from 'src/hooks/useClickOutSide'

export const Header = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const contentRef = useRef() as any
  const childRef = useRef() as any
  useClickOutside(contentRef, childRef, (value: boolean) => setIsOpenMenu(value))

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>(searchParams.get('q') ?? '')
  const [selectType, setSelectType] = useState<string>(SELECT_SEARCH[0].value)

  const debounceKeyword = (keyword: string) => {
    setKeyword(keyword)
    navigate({
      pathname: '/search',
      search: `?q=${keyword}&type=${selectType}`,
    })
  }

  const debounceInput = useCallback(
    debounce((keyword: string) => debounceKeyword(keyword), 1000),
    [],
  )

  const onChangeKeyword = (event: { target: { value: string } }) => {
    debounceInput(event.target.value)
  }

  const onChangeSelectType = (event: { target: { value: string } }) => {
    setSelectType(event.target.value)
    navigate({
      pathname: '/search',
      search: `?q=${keyword}&type=${event.target.value}`,
    })
  }

  return (
    <div className="w-full fixed top-0 left-0 bg-[#000] z-100">
      <div
        className="w-[calc(100%-20px)] sm:container md:w-[1100px] flex justify-between mx-auto items-center h-[50px]"
        ref={contentRef}
      >
        <Link to={'/'} className="text-[#000] font-extrabold bg-yellow-500 px-[10px] py-[5px]">
          Movie
        </Link>
        <ul className="hidden md:flex text-[#FFFFFF] items-center w-fit gap-[20px]">
          <li className="rounded-md overflow-hidden bg-[#FFFFFF] flex gap-[10px] w-[400px]">
            <select
              defaultChecked={true}
              defaultValue={searchParams.get('type') ?? SELECT_SEARCH[0].value}
              className="text-[#000] w-[90px] cursor-pointer font-semibold px-[10px] outline-none"
              onChange={onChangeSelectType}
            >
              {SELECT_SEARCH.map((item: SelectSearch) => (
                <option key={item.id} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
            <div className="flex flex-1 items-center px-[10px] border-l-[1px] border-[#808080]">
              <input
                placeholder="Search keyword"
                className="h-[35px] flex-1 outline-none border-none text-[#000] text-[14px]"
                onChange={onChangeKeyword}
                defaultValue={keyword}
              />
              <SearchIcon width={20} height={20} color="#000" />
            </div>
          </li>
          {MENU_HEADER.map((item: MenuHeader) => (
            <li key={`${item.name}_${item.id}`}>
              <NavLink to={item.path} replace>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="block md:hidden" onClick={() => setIsOpenMenu(!isOpenMenu)}>
          <MenuIcon width={32} height={32} color="#FFFFFF" />
        </div>
      </div>
      {isOpenMenu && (
        <div className="absolute z-100 w-full top-[50px] bg-[#000] shadow-lg pb-[10px]" ref={childRef}>
          <ul className="w-[calc(100%-20px)] sm:container mx-auto mt-[10px]">
            <li className="rounded-md overflow-hidden bg-[#FFFFFF] flex gap-[10px] w-full">
              <select
                defaultChecked={true}
                defaultValue={searchParams.get('type') ?? SELECT_SEARCH[0].value}
                className="text-[#000] w-[90px] cursor-pointer font-semibold px-[10px] outline-none"
                onChange={onChangeSelectType}
              >
                {SELECT_SEARCH.map((item: SelectSearch) => (
                  <option key={item.id} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
              <div className="flex flex-1 items-center px-[10px] border-l-[1px] border-[#808080]">
                <input
                  placeholder="Search keyword"
                  className="h-[35px] flex-1 outline-none border-none text-[#000] text-[14px]"
                  onChange={onChangeKeyword}
                  defaultValue={keyword}
                />
                <SearchIcon width={20} height={20} color="#000" />
              </div>
            </li>
            {MENU_HEADER.map((item: MenuHeader) => (
              <li key={`${item.name}_${item.id}`} className="text-[#FFFFFF] py-[10px]">
                <NavLink to={item.path} replace>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
