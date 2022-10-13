import { rest } from "@karpeleslab/klbfw";

export const getCountries = async (data) => {
  return new Promise((resolve, reject) => {
    rest("Country", "GET", data).catch((err) => {
      console.log('createUserLocation::'+err)
      reject(err)
    }).then((result) => resolve(result))
  })
}
export const getLocationByID = async (id) => {
  return new Promise((resolve, reject) => {
    rest(`User/Location/${id}`, "GET").catch((err) => {
      console.log('UserLocationID::'+err)
      reject(err)
    }).then((result) => resolve(result))
  })
}

export const updateLocationByID = async (id, data) => {
  return new Promise((resolve, reject) => {
    rest(`User/Location/${id}`, "PATCH", data).catch((err) => {
      console.log('UserLocationID::'+err)
      reject(err)
    }).then((result) => resolve(result))
  })
}
