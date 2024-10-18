import type { Meta } from "@storybook/react"
import { ArrowIcon } from "./icons/arrow-icon"
import { CaretSortIcon } from "./icons/caret-sort-icon"
import { CheckIcon } from "./icons/check-icon"
import { ChevronIcon } from "./icons/chevron-icon"
import { CloseIcon } from "./icons/close-icon"
import { FavoritesIcon } from "./icons/favorites-icon"
import { FiltersIcon } from "./icons/filters-icon"
import { HeartIcon } from "./icons/heart-icon"
import { SearchIcon } from "./icons/search-icon"

const meta: Meta = {
  title: "Icons",
  args: {},
  argTypes: {},
}

export const Default = {
  render: () => (
    <div className="grid w-full max-w-xs grid-cols-[repeat(_auto-fill,minmax(32px,1fr)_)] items-start gap-4 gap-y-8">
      <ArrowIcon />
      <CaretSortIcon />
      <CheckIcon />
      <ChevronIcon />
      <CloseIcon />
      <FavoritesIcon />
      <FiltersIcon />
      <HeartIcon />
      <HeartIcon />
      <SearchIcon />
    </div>
  ),
}

export default meta
