import { atom, useAtom } from "jotai"
import { QuestionMultiSelectInput } from "./QuestionMultiSelectInput"

export type Step = "hello-feature"

const helloFeatureAtom = atom("")

const formValuesAtom = atom((get) => {
  return {
    "hello-feature": get(helloFeatureAtom),
  }
})

const completedStepsAtom = atom<Step[]>((get) => Object.entries(get(formValuesAtom)).map(([step, value]) => (value ? step : undefined)) as Step[])

export function FeatureForm() {
  return <HelloFeatureInput />
}

function HelloFeatureInput() {
  const stepName: Step = "hello-feature"
  const [, setHelloFeature] = useAtom(helloFeatureAtom)
  return (
    <QuestionMultiSelectInput
      question="Which features would you like to use?"
      helperText="Select the features you want to use. Press space to toggle the selection. Press enter to submit. Use arrows to move between the items"
      items={[
        {
          label: "Hello feature",
          value: "hello-feature",
        },
        {
          label: "Farewell feature",
          value: "farewell-feature",
        },
        {
          label: "a",
          value: "a-feature",
        },
        {
          label: "B",
          value: "b-feature",
        },
      ]}
      onEnter={(value) => {
        console.log(value)
        setHelloFeature(value[0])
      }}
    />
  )
}
