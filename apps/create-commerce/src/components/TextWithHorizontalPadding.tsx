import { type TextProps, Text, Transform } from "ink"

type TextWithHorizontalPaddingProps = TextProps & {
  paddingX?: number
}

export function TextWithHorizontalPadding({
  paddingX = 1,
  children: textChildren,
  ...restTextProps
}: TextWithHorizontalPaddingProps) {
  const oneSidePadding = " ".repeat(paddingX)

  return (
    <Text {...restTextProps}>
      <Transform transform={(text) => `${oneSidePadding}${text}${oneSidePadding}`}>{textChildren}</Transform>
    </Text>
  )
}
