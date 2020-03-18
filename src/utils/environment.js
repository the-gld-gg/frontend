export const IS_BROWSER = typeof window !== "undefined"
export const IS_DEV = process.env.NODE_ENV !== "production"
export const IS_TEST = process.env.NODE_ENV === "test"
export const WINDOW = IS_BROWSER && window
export const NAVIGATOR = WINDOW && WINDOW.navigator
export const DOCUMENT = WINDOW && WINDOW.document
export const IS_IFRAME = WINDOW && WINDOW.self !== WINDOW.top
export const HAS_TOUCH = DOCUMENT && "ontouchstart" in DOCUMENT.documentElement
export const IS_MAC = NAVIGATOR && /Macintosh/i.test(NAVIGATOR.userAgent || "")
export const IS_IOS = NAVIGATOR && /iPhone|iPad|iPod/i.test(NAVIGATOR.userAgent || "")
export const IS_ANDROID = NAVIGATOR && /Android/i.test(NAVIGATOR.userAgent || "")
export const IS_MOBILE = NAVIGATOR && /iPhone|iPod|Android/i.test(NAVIGATOR.userAgent)
export const IS_IE = NAVIGATOR && /Trident/i.test(NAVIGATOR.userAgent || "")
export const IS_EDGE = NAVIGATOR && /Edge/i.test(NAVIGATOR.userAgent || "")
export const IS_FIREFOX = NAVIGATOR && /Firefox/i.test(navigator.userAgent || "")
