import { Router } from 'express'
import {
  deleteServiceStation,
  editServiceStation,
  getAllServiceStation,
  getServiceStationById,
  postServiceStation,
  searchServiceStation,
} from '../controllers/station.controller.js'

import { Station } from '../models/station.model.js'
import pagination from '../middleware/pagination.middleware.js'

const router = Router()
router.route('/search').get(searchServiceStation)
router.route('/').get(pagination(Station), getAllServiceStation)
router.route('/:id').get(getServiceStationById)
router.route('/').post(postServiceStation)
router.route('/:id').patch(editServiceStation)
router.route('/:id').delete(deleteServiceStation)

export default router
