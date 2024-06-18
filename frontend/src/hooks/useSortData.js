import { useMemo } from 'react'

const useSortData = (data, sortOrder) => {
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.attributes.adresse.localeCompare(b.attributes.adresse, 'de', {
          numeric: true,
        })
      } else {
        return b.attributes.adresse.localeCompare(a.attributes.adresse, 'de', {
          numeric: true,
        })
      }
    })
  }, [data, sortOrder])

  return sortedData
}

export default useSortData
