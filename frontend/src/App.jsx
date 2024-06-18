import { useState } from 'react'
import { useDebounce, useFetchData, useSortData } from './hooks'
import { SearchInput, ServiceStationList, SortSelect } from './components'

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

  const handleSortChange = (value) => {
    setSortOrder(value)
  }

  if (isLoading) {
    return <p>Loading.......</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100">
      <div className="w-full max-w-screen-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <SearchInput value={searchInput} onChange={setSearchInput} />
          <SortSelect value={sortOrder} onChange={handleSortChange} />
        </div>
        <ServiceStationList data={sortedData} />
      </div>
    </div>
  )
}

export default App
