import { useEffect, useState } from 'react'
import { url } from '../constants'

const useFetchData = () => {
  const [serviceStationData, setServiceStationData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Ups, something went wrong')
        }
        const result = await response.json()
        setServiceStationData(result.features)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { serviceStationData, isLoading, error }
}

export default useFetchData
