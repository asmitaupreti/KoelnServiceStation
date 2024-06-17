import { Station } from '../models/station.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const searchServiceStation = async (req, res) => {
  try {
    const { query } = req.query
    const result = await Station.find({
      $or: [
        { streetName: { $regex: query, $options: 'i' } },
        { city: { $regex: query, $options: 'i' } },
      ],
    })
    return res.status(200).json(new ApiResponse(200, 'success', result))
  } catch (error) {
    return res.status(500).json(new ApiResponse(200, error.message, null))
  }
}

function formatData(result) {
  const response = result.map((station) => {
    return {
      objectId: station.objectId,
      address: `${station.streetName} ${station.houseNumber} (${station.zipCode} ${station.city}) `,
      latitude: station.latitude,
      longitude: station.longitude,
    }
  })
  return response
}
const getAllServiceStation = async (_, res) => {
  try {
    // console.log('getAllServiceStation')
    // const result = await Station.find(
    //   {},
    //   { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    // )
    // if (result) {
    //   const response = result.map((station) => {
    //     return {
    //       objectId: station.objectId,
    //       address: `${station.streetName} ${station.houseNumber} (${station.zipCode} ${station.city}) `,
    //       latitude: station.latitude,
    //       longitude: station.longitude,
    //     }
    //   })
    //   res
    //     .status(200)
    //     .json(new ApiResponse(200, 'Data retrieved successfully', response))
    // } else {
    //   throw new Error("couldn't get data from database ")
    // }
    const paginatedResults = res.paginatedResults

    const response = formatData(paginatedResults.results)
    console.log(response, '###')
    paginatedResults.results = response
    return res
      .status(200)
      .json(
        new ApiResponse(200, 'Data retrieved successfully', paginatedResults)
      )
  } catch (error) {
    console.log(error.message, 'getAllServiceStation')
    return res.status(500).json(new ApiResponse(500, error.message, null))
  }
}

const getServiceStationById = async (req, res) => {
  try {
    const id = req.params?.id
    const result = await Station.findOne({ objectId: id })
    if (result) {
      const response = {
        objectId: result.objectId,
        address: `${result.streetName} ${result.houseNumber} (${result.zipCode} ${result.city}) `,
        latitude: result.latitude,
        longitude: result.longitude,
      }
      return res
        .status(200)
        .json(new ApiResponse(200, 'Data retrieved successfully', response))
    } else {
      return res.status(404).json(new ApiResponse(404, 'Data not found', null))
    }
  } catch (error) {
    console.log(error.message, 'getServiceStationById')
    return res.status(500).json(new ApiResponse(500, error.message, null))
  }
}

const postServiceStation = async (req, res) => {
  try {
    const { streetName, houseNumber, zipCode, city, latitude, longitude } =
      req.body
    const result = await Station.find()
    const objectId =
      result.sort((a, b) => a.objectId - b.objectId)[result.length - 1]
        .objectId + 1

    console.log(objectId, '######')
    const createStation = await Station.create({
      streetName,
      houseNumber,
      zipCode,
      city,
      latitude,
      longitude,
      objectId,
    })
    if (!createStation) {
      return res
        .status(500)
        .json(new ApiError(500, 'Something went wrong when commenting'))
    }
    // send response to user
    return res
      .status(201)
      .json(new ApiResponse(201, 'Station created Successfully', createStation))
  } catch (error) {
    console.log(error.message, 'addServiceStation')

    return res.status(500).json(new ApiResponse(500, error.message, null))
  }
}

const editServiceStation = async (req, res) => {
  try {
    const { id } = req.params
    const {
      streetName,
      houseNumber,
      zipCode,
      city,
      latitude,
      longitude,
      objectId,
    } = req.body

    if (parseInt(id) !== objectId) {
      return res.status(400).json(new ApiResponse(400, 'Invalid request', null))
    }
    const existingServiceStation = await Station.findOne(
      { objectId: id },
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    )
    if (!existingServiceStation) {
      return res
        .status(404)
        .json(new ApiResponse(404, 'station does not exist', null))
    }

    // const response = await Station.findOneAndUpdate(
    //   { objectId: id },
    //   {
    //     $set: {
    //       streetName,
    //       houseNumber,
    //       zipCode,
    //       city,
    //       latitude,
    //       longitude,
    //     },
    //   },
    //   {
    //     new: true,
    //   }
    // )

    // set new data
    existingServiceStation.streetName = streetName
    existingServiceStation.houseNumber = houseNumber
    existingServiceStation.zipCode = zipCode
    existingServiceStation.city = city
    existingServiceStation.latitude = latitude
    existingServiceStation.longitude = longitude
    // save the data
    const response = existingServiceStation.save()

    if (!response) {
      return next(
        new ApiResponse(
          500,
          'Something went wrong when editing a comment',
          null
        )
      )
    }
    // send response to user
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          'Comment Updated Successfully',
          existingServiceStation
        )
      )
    console.log('editServiceStation')
  } catch (error) {
    console.log(error.message, 'editServiceStation')
    return res.status(500).json(new ApiResponse(500, error.message, null))
  }
}

const deleteServiceStation = async (req, res) => {
  try {
    const id = req?.params?.id
    const serviceStation = await Station.findOne({ objectId: id })
    if (!serviceStation) {
      res.status(404).json(new ApiError(404, 'station does not exist'))
    }

    const response = await Station.deleteOne({ objectId: id })
    if (response.deletedCount === 0) {
      return res
        .status(404)
        .json(new ApiError(404, 'station not found or already removed'))
    }

    return res
      .status(200)
      .json(new ApiResponse(200, 'station removed successfully', {}))
  } catch (error) {
    console.log(error.message, 'deleteServiceStation')
    return res.status(500).json(new ApiResponse(500, error.message, null))
  }
}

export {
  searchServiceStation,
  getAllServiceStation,
  getServiceStationById,
  postServiceStation,
  editServiceStation,
  deleteServiceStation,
}
