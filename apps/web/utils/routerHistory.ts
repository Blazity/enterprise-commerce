const PREV_STORAGE_KEY = "ecom_prev_url"
const CURRENT_STORAGE_KEY = "ecom_current_url"

export function getPreviousUrl() {
  return sessionStorage.getItem(PREV_STORAGE_KEY)
}

export function setPreviousUrl(url: string) {
  sessionStorage.setItem(PREV_STORAGE_KEY, url)
}

export function getCurrentUrl() {
  return sessionStorage.getItem(CURRENT_STORAGE_KEY)
}

export function setCurrentUrl(url: string) {
  sessionStorage.setItem(CURRENT_STORAGE_KEY, url)
}
