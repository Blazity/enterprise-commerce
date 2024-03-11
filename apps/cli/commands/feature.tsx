import { Newline, render } from "ink"
import { QuestionMultiSelectInput } from "../components/QuestionMultiSelectInput"
import { ShopAnimation } from "../components/ShopAnimation"
import { FeatureForm } from "../components/FeatureForm"

export function Feature() {
  return (
    <>
      <ShopAnimation />
      <Newline />
      <FeatureForm />
    </>
  )
}
