import { FadeOutMask } from "components/fade-out-mask"
import { AnimatePresence, motion } from "motion/react"
import { CloseIcon } from "components/icons/close-icon"
import { cn } from "utils/cn"
import { slugToName } from "utils/slug-name"

interface ActiveFiltersProps {
  filtersCount: number
  setShowFilterTags: (show: boolean) => void
  showFilterTags: boolean
  filtersActive: boolean
  page: number
  filters: string[]
  removeTag: (value: string) => void
}

export function ActiveFilters({
  filtersCount,
  setShowFilterTags,
  showFilterTags,
  filtersActive,
  page,
  filters,
  removeTag,
}: ActiveFiltersProps) {
  return (
    <>
      <div className="flex items-baseline justify-between pb-1 tracking-tight">
        <p className="text-sm font-medium">
          {filtersCount === 0 ? "No filters selected" : `Active filters (${filtersCount})`}
        </p>
        <button
          className={cn(
            "rounded-md bg-transparent px-1.5 py-0.5 text-xs transition duration-200 hover:bg-gray-100",
            filtersActive ? "visible" : "hidden"
          )}
          onClick={() => setShowFilterTags(!showFilterTags)}
        >
          {showFilterTags ? "Hide" : "Show"}
        </button>
      </div>
      <motion.div
        initial={false}
        animate={{ height: showFilterTags && filtersActive ? 140 : 0 }}
        className={cn("relative h-full max-h-[140px] overflow-hidden rounded-md")}
      >
        <FadeOutMask />
        <div
          className={cn(
            "isolate flex h-full flex-wrap content-start items-start justify-start gap-1 overflow-y-auto bg-gray-50 p-2"
          )}
        >
          <AnimatePresence mode="popLayout" initial={false} key={page}>
            {filters.map((el, index) => {
              if (typeof el === "string") {
                const isCategory = el.includes(" > ")
                const categoryName = el.split(" > ").pop()?.trim()
                return (
                  <motion.div
                    key={el}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, zIndex: -1, transition: { duration: 0.1, delay: 0 } }}
                    transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * index }}
                    className="group flex grow-0 cursor-pointer items-center gap-1 whitespace-nowrap rounded-md border border-gray-300/60 bg-white py-1 pl-1.5 pr-2 text-xs transition-colors hover:border-gray-400/80 hover:bg-gray-100/70"
                    onClick={() => removeTag(el)}
                  >
                    <span className="rounded-full border border-gray-300 p-px transition-colors group-hover:border-gray-400">
                      <CloseIcon className="size-2 fill-gray-300 transition-colors group-hover:fill-gray-400" />
                    </span>
                    <span className="font-medium tracking-tight">
                      {isCategory && categoryName ? slugToName(categoryName) : el}
                    </span>
                  </motion.div>
                )
              }
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  )
}
