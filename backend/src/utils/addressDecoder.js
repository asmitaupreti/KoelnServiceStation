export function decode(address) {
  // Split by opening parenthesis to separate street and city info
  const [streetPart, cityPart] = address.split('(')

  // Trim and extract street name and house number
  const houseNumberMatch = streetPart.match(/\d+/)
  const houseNumber = houseNumberMatch ? houseNumberMatch[0] : ''
  const streetName = streetPart.replace(houseNumber, '').trim()

  // Trim and extract zip code and city name
  const zipCodeMatch = cityPart.match(/\d+/)
  const zipCode = zipCodeMatch ? zipCodeMatch[0] : ''
  const cityName = cityPart.replace(zipCode, '').replace(')', '').trim()

  return { streetName, houseNumber, zipCode, cityName }
}
