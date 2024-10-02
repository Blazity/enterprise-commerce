/* 

  This file manages the logic for the mobile mega menu.
  It employs native events and remains outside the React/Next.js lifecycle to avoid adding unnecessary JavaScript...
   for components situated at the top of the tree. 

  Thanks to the behavior of next/script, route changes do not result in multiple subscriptions to the same events.

*/

export const mobileInlineScript = `
const menu = document.querySelector(".menu")
const menuInner = menu?.querySelector(".menu__inner")
const menuArrow = menu?.querySelector(".menu__arrow")
const menuTitle = menu?.querySelector(".menu__title")
const burger = document.querySelector(".burger")
const overlay = document.querySelector(".overlay")
const closeButton = document.querySelector(".menu-close-button")
const allLinks = document.querySelectorAll(".submenu__inner")
let subMenu = null

function toggleMenu() {
  menu?.classList.toggle("is-active")
  overlay?.classList.toggle("is-active")
}

function showSubMenu(children) {
  subMenu = children.querySelector(".submenu")
  subMenu.classList.add("is-active")
  subMenu.style.animation = "slideLeft 0.35s ease forwards"
  const menuTitle = children.querySelector("i").parentNode.childNodes[0].textContent
  menu.querySelector(".menu__title").textContent = menuTitle
  menu.querySelector(".menu__header")?.classList.add("is-active")
}

function hideSubMenu() {
  if (subMenu) subMenu.style.animation = "slideRight 0.25s ease forwards"
  setTimeout(() => subMenu?.classList.remove("is-active"), 300)

  menu.querySelector(".menu__title").textContent = ""
  menu.querySelector(".menu__header").classList.remove("is-active")
}

function toggleSubMenu(e) {
  if (!menu?.classList.contains("is-active")) return
  if (e.target.closest(".menu__dropdown")) {
    const children = e.target.closest(".menu__dropdown")
    showSubMenu(children)
  }
}

const debouncedHandleResize = debounce(handleResize, 100)

function handleResize() {
  if (window.innerWidth >= 768 && menu?.classList.contains("is-active")) toggleMenu()
}

const resizeObserver = new ResizeObserver(debouncedHandleResize)
resizeObserver.observe(document.body)

burger?.addEventListener("click", toggleMenu)
overlay?.addEventListener("click", toggleMenu)
closeButton?.addEventListener("click", toggleMenu)
menuArrow?.addEventListener("click", hideSubMenu)
menuTitle?.addEventListener("click", hideSubMenu)
menuInner?.addEventListener("click", toggleSubMenu)
Array.from(allLinks).map((link) => link?.addEventListener("click", toggleMenu))

function debounce(func, delay) {
  let inDebounce
  return function () {
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => func.apply(context, args), delay)
  }
}
`
