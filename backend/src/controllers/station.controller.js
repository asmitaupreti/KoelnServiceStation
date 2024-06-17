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
    res.status(200).json(new ApiResponse(200, 'success', result))
  } catch (error) {
    res.status(500).json(new ApiResponse(200, error.message, null))
  }
}

const getAllServiceStation = async (_, res) => {
  try {
    console.log('getAllServiceStation')
    const result = await Station.find(
      {},
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    )
    if (result) {
      const response = result.map((station) => {
        return {
          objectId: station.objectId,
          address: `${station.streetName} ${station.houseNumber} (${station.zipCode} ${station.city}) `,
          latitude: station.latitude,
          longitude: station.longitude,
        }
      })
      res
        .status(200)
        .json(new ApiResponse(200, 'Data retrieved successfully', response))
    } else {
      throw new Error("couldn't get data from database ")
    }
  } catch (error) {
    console.log(error.message, 'getAllServiceStation')
    res.status(500).json(new ApiResponse(500, error.message, null))
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
      res
        .status(200)
        .json(new ApiResponse(200, 'Data retrieved successfully', response))
    } else {
      res.status(404).json(new ApiResponse(404, 'Data not found', null))
    }
  } catch (error) {
    console.log(error.message, 'getServiceStationById')
    res.status(500).json(new ApiResponse(500, error.message, null))
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
      res
        .status(500)
        .json(new ApiError(500, 'Something went wrong when commenting'))
    }
    // send response to user
    res
      .status(201)
      .json(new ApiResponse(201, 'Station created Successfully', createStation))
  } catch (error) {
    console.log(error.message, 'addServiceStation')

    res.status(500).json(new ApiResponse(500, error.message, null))
  }
}

const editServiceStation = () => {
  try {
    console.log('editServiceStation')
  } catch (error) {
    console.log(error.message, 'editServiceStation')
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
      res
        .status(404)
        .json(new ApiError(404, 'station not found or already removed'))
    }

    res
      .status(200)
      .json(new ApiResponse(200, 'station removed successfully', {}))
  } catch (error) {
    console.log(error.message, 'deleteServiceStation')
    res.status(500).json(new ApiResponse(500, error.message, null))
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
