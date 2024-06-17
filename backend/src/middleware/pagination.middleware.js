const pagination = (schema) => async (req, res, next) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const results = {}
  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit,
    }
  }

  if (endIndex < (await schema.countDocuments())) {
    results.next = {
      page: page + 1,
      limit,
    }
  }

  try {
    results.results = await schema.find().limit(limit).skip(startIndex)
    res.paginatedResults = results
    next()
  } catch (e) {
    res.json(new ApiResponse(500, error.message, null))
  }
}

export default pagination
