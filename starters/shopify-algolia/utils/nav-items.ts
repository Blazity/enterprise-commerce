import type { NavItem } from "components/navigation-bar/types"

export const navigationItems: NavItem[] = [
  {
    text: "Fashion",
    href: "/category/fashion",
    pageDisplayType: "CLP",
    submenu: {
      variant: "text-grid",
      items: [
        {
          text: "Women",
          href: "/category/women",
          items: [
            { text: "Shirts & Blouses", href: "/category/shirts-and-blouses" },
            { text: "Blazers & Vests", href: "/category/blazers-and-vests" },
            { text: "Cardigans & Sweaters", href: "/category/cardigans-and-sweaters" },
            { text: "Dresses", href: "/category/dresses" },
            { text: "Skirts", href: "/category/skirts" },
          ],
        },
        {
          text: "Men",
          href: "/category/men",
          items: [
            { text: "T-shirts & Tanks", href: "/category/t-shirts-and-tanks" },
            { text: "Hoodies & Sweatshirts", href: "/category/hoodies-and-sweatshirts" },
            { text: "Blazers & Suits", href: "/category/blazers-and-suits" },
            { text: "Shorts", href: "/category/shorts" },
            { text: "Outerwear", href: "/category/outerwear" },
          ],
        },
        {
          text: "Kids",
          href: "/category/kids",
          items: [
            { text: "Activewear", href: "/category/activewear" },
            { text: "Footwear", href: "/category/footwear" },
          ],
        },
      ],
    },
  },
  {
    text: "Electronics",
    href: "/category/electronics",
    pageDisplayType: "CLP",
    submenu: {
      variant: "text-grid",
      items: [
        {
          text: "Audio Devices",
          href: "/category/audio-devices",
          items: [
            { text: "Headphones", href: "/category/headphones" },
            { text: "Speakers", href: "/category/speakers" },
          ],
        },
        {
          text: "Cameras",
          href: "/category/cameras",
          items: [
            { text: "Digital Cameras", href: "/category/digital-cameras" },
            { text: "Action Cameras", href: "/category/action-cameras" },
          ],
        },
        {
          text: "Smartphones",
          href: "/category/smartphones",
        },
        {
          text: "Laptops",
          href: "/category/laptops",
        },
        {
          text: "Screens",
          href: "/category/screens",
        },
      ],
    },
  },
  {
    text: "Sports & Outdoors",
    href: "/category/sports-and-outdoors",
    pageDisplayType: "CLP",
    submenu: {
      variant: "text-grid",
      items: [
        {
          href: "/category/exercise-equipment",
          text: "Exercise Equipment",
        },
        {
          href: "/category/outdoor-gear",
          text: "Outdoor Gear",
        },
        {
          href: "/category/sportswear",
          text: "Sportswear",
        },
        {
          href: "/category/athletic-footwear",
          text: "Athletic Footwear",
        },
      ],
    },
  },
  {
    text: "Beauty",
    href: "/category/beauty",
    pageDisplayType: "CLP",
    submenu: {
      variant: "text-grid",
      items: [
        {
          text: "Skin Care",
          href: "/category/skin-care",
          items: [
            { text: "Cleansers", href: "/category/cleansers" },
            { text: "Moisturizers", href: "/category/moisturizers" },
            { text: "Treatments & Serums", href: "/category/treatments-and-serums" },
          ],
        },
        {
          text: "Makeup",
          href: "/category/makeup",
          items: [
            { text: "Face Makeup", href: "/category/face-makeup" },
            { text: "Eye Makeup", href: "/category/eye-makeup" },
            { text: "Lip Makeup", href: "/category/lip-makeup" },
          ],
        },
        {
          text: "Haircare",
          href: "/category/haircare",
          items: [
            { text: "Shampoos & Conditioners", href: "/category/shampoos-and-conditioners" },
            { text: "Styling Products", href: "/category/styling-products" },
          ],
        },

        {
          text: "Fragrances",
          href: "/category/fragrances",
          items: [
            { text: "Perfumes", href: "/category/perfumes" },
            { text: "Body Sprays", href: "/category/body-sprays" },
          ],
        },
      ],
    },
  },
  {
    text: "Furniture",
    href: "/category/furniture",
    pageDisplayType: "CLP",
    submenu: {
      variant: "text-grid",
      items: [
        {
          text: "Living Room",
          href: "/category/living-room-furniture",
          items: [
            { text: "Sofas & Sectionals", href: "/category/sofas-and-sectionals" },
            { text: "Coffee Tables", href: "/category/coffee-tables" },
            { text: "TV Stands", href: "/category/tv-stands" },
          ],
        },

        {
          text: "Bedroom",
          href: "/category/bedroom-furniture",
          items: [
            { text: "Beds", href: "/category/beds" },
            { text: "Dressers", href: "/category/dressers" },
            { text: "Nightstands", href: "/category/nightstands" },
          ],
        },

        {
          text: "Office",
          href: "/category/office-furniture",
          items: [
            { text: "Desks", href: "/category/desks" },
            { text: "Office Chairs", href: "/category/office-chairs" },
            { text: "Storage Solutions", href: "/category/storage-solutions" },
          ],
        },
      ],
    },
  },
]
