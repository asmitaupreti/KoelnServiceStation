const getAllServiceStation = () => {
  try {
    console.log('getAllServiceStation')
  } catch (error) {
    console.log(error.message, 'getAllServiceStation')
  }
}

const getServiceStationById = () => {
  try {
    console.log('getServiceStationById')
  } catch (error) {
    console.log(error.message, 'getServiceStationById')
  }
}

const postServiceStation = () => {
  try {
    console.log('addServiceStation')
  } catch (error) {
    console.log(error.message, 'addServiceStation')
  }
}

const editServiceStation = () => {
  try {
    console.log('editServiceStation')
  } catch (error) {
    console.log(error.message, 'editServiceStation')
  }
}

const deleteServiceStation = () => {
  try {
    console.log('deleteServiceStation')
  } catch (error) {
    console.log(error.message, 'deleteServiceStation')
  }
}

export {
  getAllServiceStation,
  getServiceStationById,
  postServiceStation,
  editServiceStation,
  deleteServiceStation,
}
