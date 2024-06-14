import { url } from '../constants.js'
import { SeedStatus } from '../models/seed.model.js'
import { Station } from '../models/station.model.js'
import { decode } from '../utils/addressDecoder.js'

const getData = async () => {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('Something went wrong')
    const result = await response.json()
    return result
  } catch (error) {
    console.log(error.message)
  }
}

export const seedDataBase = async () => {
  try {
    // see if SeedStatus has an entry
    const seedStatus = await SeedStatus.findOne()

    // if it has check if the seeded is true, if yes then return
    if (seedStatus && seedStatus.seeded) {
      console.log('Database has already seeded')
      return
    }
    console.log(seedStatus, '######')

    // otherwise get data from api
    const response = await getData()

    // if there is data loop through the data and create an array of data with matches the model of Station
    const stationServiceData = response.features.map((station) => {
      const { streetName, houseNumber, zipCode, cityName } = decode(
        station.attributes.adresse
      )
      return {
        objectId: station.attributes.objectid,
        latitude: Number(station.geometry.x),
        longitude: Number(station.geometry.y),
        streetName,
        houseNumber: Number(houseNumber),
        zipCode: Number(zipCode),
        city: cityName,
      }
    })
    console.log(stationServiceData)
    // after the data is prepared insert into Station table as insert many
    await Station.insertMany(stationServiceData)

    // after it is successful create an entry and insert it to the SeedStatus
    await SeedStatus.create({ seeded: true })
  } catch (error) {
    console.log(error.message, 'seed database error')
  }
}
