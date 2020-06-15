// Use exisiting loader util from google-map-react so we avoid conflicts in maps api load
import googleMapLoader from "google-map-react/lib/loaders/google_map_loader"
import { WINDOW } from "./environment"
import { GOOGLE_MAPS_API_KEY } from "../configs"

export default class googleAutoComplete {
  constructor() {
    if (!WINDOW.google ||
      !WINDOW.google.maps ||
      !WINDOW.google.maps.places) {
      this._init()
    } else {
      WINDOW.googleScript = true
    }
  }

  _init = () => {
    if (WINDOW && WINDOW.document && !WINDOW.googleScript) {
      WINDOW.googleScript = true
      // let script = WINDOW.document.createElement("script")
      // script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`
      // WINDOW.document.body.appendChild(script)
      googleMapLoader({ key: GOOGLE_MAPS_API_KEY, libraries: ["places"] })
    }
  }

  searchPostcode = (input = "", callback = () => {}) => {
    if (WINDOW && WINDOW.google && WINDOW.googleScript) {
      const service = new WINDOW.google.maps.places.AutocompleteService()
      return service.getPlacePredictions({
        input: input,
        types: ["(regions)"],
        componentRestrictions: {
          country: "au"
        }
      }, callback)
    } else {
      setTimeout(() => {
        this.searchPostcode(input, callback)
      }, 100)
    }
  }

  searchAddress = (input = "", callback = () => {}) => {
    if (WINDOW && WINDOW.google && WINDOW.googleScript) {
      const service = new WINDOW.google.maps.places.AutocompleteService()
      return service.getPlacePredictions({
        input: input,
        types: ["address"],
        componentRestrictions: {
          country: "au"
        }
      }, callback)
    } else {
      setTimeout(() => {
        this.searchAddress(input, callback)
      }, 100)
    }
  }

  getPostcode = (address = "", callback = () => {}) => {
    if (WINDOW && WINDOW.google && WINDOW.googleScript) {
      const geocoder = new WINDOW.google.maps.Geocoder()
      return geocoder.geocode({
        "address": address
      }, callback)
    } else {
      setTimeout(() => {
        this.getPostcode(address, callback)
      }, 100)
    }
  }

  getPostcodeWithLocation = (location, callback = () => {}) => {
    if (WINDOW && WINDOW.google && WINDOW.googleScript) {
      const geocoder = new WINDOW.google.maps.Geocoder()
      return geocoder.geocode({
        "location": location
      }, callback)
    } else {
      setTimeout(() => {
        this.getPostcode(location, callback)
      }, 100)
    }
  }

}
