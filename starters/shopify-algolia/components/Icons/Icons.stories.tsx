import type { Meta } from "@storybook/react"
import { ArrowIcon } from "./ArrowIcon"
import { CaretSortIcon } from "./CaretSortIcon"
import { CheckIcon } from "./CheckIcon"
import { ChevronIcon } from "./ChevronIcon"
import { CloseIcon } from "./CloseIcon"
import { FavoritesIcon } from "./FavoritesIcon"
import { FiltersIcon } from "./FiltersIcon"
import { HeartIcon } from "./HeartIcon"
import { SearchIcon } from "./SearchIcon"

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
