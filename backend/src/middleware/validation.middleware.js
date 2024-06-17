import { ApiResponse } from '../utils/ApiResponse.js'

const validate = (schema) => async (req, res, next) => {
  try {
    const body = req.body
    await schema.validate(body)
    return next()
  } catch (error) {
    res.status(400).json(new ApiResponse(400, error.message, null))
  }
}

export default validate
