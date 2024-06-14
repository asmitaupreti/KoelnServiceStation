import { Router } from 'express'
import {
  deleteServiceStation,
  editServiceStation,
  getAllServiceStation,
  getServiceStationById,
  postServiceStation,
} from '../controllers/station.controller'

const router = Router()
router.route('/').get(getAllServiceStation)
router.route('/:id').get(getServiceStationById)
router.route('/').post(postServiceStation)
router.route('/:id').patch(editServiceStation)
router.route('/:id').delete(deleteServiceStation)

export default router
