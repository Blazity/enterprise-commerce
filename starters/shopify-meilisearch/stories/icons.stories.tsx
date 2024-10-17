import type { Meta } from "@storybook/react"
import { ArrowIcon } from "components/icons/arrow-icon"
import { CaretSortIcon } from "components/icons/caret-sort-icon"
import { CheckIcon } from "components/icons/check-icon"
import { ChevronIcon } from "components/icons/chevron-icon"
import { CloseIcon } from "components/icons/close-icon"
import { FavoritesIcon } from "components/icons/favorites-icon"
import { FiltersIcon } from "components/icons/filters-icon"
import { HeartIcon } from "components/icons/heart-icon"
import { SearchIcon } from "components/icons/search-icon"

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
