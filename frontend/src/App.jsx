import { useEffect, useState } from 'react'
import { url } from './constants'

const App = () => {
  const [serviceStationData, setServiceStationData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sortOrder, setSortOrder] = useState('')

  const getData = async () => {
    console.log('get data')
    try {
      setIsLoading(true)
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Ups, something went wrong')
      }
      const result = await response.json()
      console.log(result.features, '####')
      setServiceStationData(result.features)
    } catch (error) {
      setError(error.message)
      console.log(`${error.message}##########`)
    } finally {
      console.log('is loading disabled')
      setIsLoading(false)
    }
  }
  const sortData = (data, order) => {
    return [...data].sort((a, b) => {
      if (order === 'asc') {
        return a.attributes.adresse.localeCompare(b.attributes.adresse, 'de', {
          numeric: true,
        })
      } else {
        return b.attributes.adresse.localeCompare(a.attributes.adresse, 'de', {
          numeric: true,
        })
      }
    })
  }

  useEffect(() => {
    let data = serviceStationData.filter((station) => {
      return station.attributes.adresse
        .toLowerCase()
        .includes(debouncedValue.toLowerCase())
    })
    setFilteredData(data)
  }, [debouncedValue, serviceStationData])

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(searchInput)
    }, 1000)
    return () => clearTimeout(id)
  }, [searchInput])

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const sortedData = sortData(serviceStationData, sortOrder)
    setServiceStationData(sortedData)
    const filteredSortedData = sortedData.filter((station) =>
      station.attributes.adresse
        .toLowerCase()
        .includes(debouncedValue.toLowerCase())
    )
    setFilteredData(filteredSortedData)
  }, [sortOrder])

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
    <div>
      <div className="m-2 flex gap-x-2 bg-green-400">
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border-2  border-blue-500 p-2 w-1/3 "
        />
        <button className="bg-white" onClick={() => handleSort('asc')}>
          asc
        </button>
        <button className="bg-white" onClick={() => handleSort('desc')}>
          desc
        </button>
      </div>

      {filteredData.map((serviceStation) => {
        return (
          <div key={`${serviceStation.attributes.objectid}`}>
            <p>{serviceStation.attributes.adresse}</p>
          </div>
        )
      })}
    </div>
  )
}

export default App
