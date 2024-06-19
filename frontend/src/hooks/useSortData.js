import { useMemo } from 'react'

const useSortData = (data, sortOrder) => {
  const sortedData = useMemo(() => {
    if (!sortOrder) {
      return data
    }
    return [...data].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.attributes.adresse.localeCompare(b.attributes.adresse, 'de', {
          numeric: true,
        })
      } else if (sortOrder === 'desc') {
        return b.attributes.adresse.localeCompare(a.attributes.adresse, 'de', {
          numeric: true,
        })
      } else {
        return 0 // No change if sortOrder is invalid
      }
    })
  }, [data, sortOrder])

  return sortedData
}

export default useSortData
