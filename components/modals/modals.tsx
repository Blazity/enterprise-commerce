"use client"

import dynamic from "next/dynamic"
import React from "react"
import { type Modal, useModalStore } from "stores/modal-store"
import { ReviewModal } from "./review-modal"

const SearchModal = dynamic(() => import("./search-modal").then((m) => m.SearchModal), { loading: Placeholder })

export function Modals() {
  const modals = useModalStore((s) => s.modals)

  return (
    <>
      {Object.entries(modals).map(([key, value]) => {
        return <React.Fragment key={key}>{value && <ModalsFactory key={key} type={key as Modal} />}</React.Fragment>
      })}
    </>
  )
}

function ModalsFactory({ type }: { type: Modal }) {
  switch (type) {
    case "search":
      return <SearchModal />
    case "review":
      return <ReviewModal />
    default:
      return null
  }
}

function Placeholder() {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"></div>
}
