import { useState } from 'react'
import { useDebounce, useFetchData, useSortData } from './hooks'
import { SearchInput, ServiceStationList, SortButton } from './components'

const App = () => {
  const { serviceStationData, isLoading, error } = useFetchData()
  const [searchInput, setSearchInput] = useState('')
  const [sortOrder, setSortOrder] = useState('')

  const debouncedSearchValue = useDebounce(searchInput, 1000)

  const filteredData = serviceStationData.filter((station) =>
    station.attributes.adresse
      .toLowerCase()
      .includes(debouncedSearchValue.toLowerCase())
  )

  const sortedData = useSortData(filteredData, sortOrder)

  const handleSort = (order) => {
    setSortOrder(order)
  }

  if (isLoading) {
    return <p>Loading.......</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <SearchInput value={searchInput} onChange={setSearchInput} />
        <SortButton label="asc" onClick={() => handleSort('asc')} />
        <SortButton label="desc" onClick={() => handleSort('desc')} />
      </div>

      <ServiceStationList data={sortedData} />
    </div>
  )
}

export default App
