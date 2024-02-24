import dynamic from "next/dynamic"

// const FacetsContent = dynamic(() => import("views/Search/FacetsContent").then((m) => m.FacetsContent))

interface FacetsMobileProps {
  className?: string
}

export function FacetsMobile({ className }: FacetsMobileProps) {
  return <div className={className}>mobile xd</div>
}
