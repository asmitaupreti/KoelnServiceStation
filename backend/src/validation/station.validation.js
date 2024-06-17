import { number, object, string } from 'yup'

const stationValidationSchema = object({
  streetName: string().required().trim(),
  houseNumber: number().required(),
  zipCode: number().required(),
  city: string().required().trim(),
  latitude: number().required(),
  longitude: number().required(),
})

export { stationValidationSchema }
