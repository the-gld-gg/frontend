import { WINDOW } from "./environment"

const gtmHandler = ({
  event,
  category = "",
  action = "",
  additionalProps = {}
}) => {
  if (WINDOW) {
    if (!WINDOW.dataLayer) WINDOW.dataLayer = []

    const newData = {
      event: event || "reactjs.event",
      pageCategory: category,
      pageAction: action,
      ...additionalProps
    }

    WINDOW.dataLayer.push(newData)
  }
}

export default gtmHandler
