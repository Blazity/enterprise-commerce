import {
  createMultiOptionSlug,
  createVisualOptionSlug,
  filterImagesByVisualOption,
  getAllOptionValuesFromCombination,
  getCombinationByMultiOption,
  getCombinationByVisualOption,
  getImagesForCarousel,
  getMultiOptionFromSlug,
  getVisualOptionFromSlug,
  getVisualOptionValueFromCombination,
  hasValidMultiOption,
  hasValidVisualOption,
  removeMultiOptionFromSlug,
  removeVisualOptionFromSlug,
} from "../visual-variant-utils"

describe("Visual Variant Utils", () => {
  describe("URL handling", () => {
    test("should extract visual option from slug", () => {
      expect(getVisualOptionFromSlug("sunrise-silk-shampoo-conditioner-set-color_red")).toBe("red")
      expect(getVisualOptionFromSlug("my-shirt-color_blue")).toBe("blue")
      expect(getVisualOptionFromSlug("simple-product")).toBe(null)
    })

    test("should remove visual option from slug", () => {
      expect(removeVisualOptionFromSlug("sunrise-silk-shampoo-conditioner-set-color_red")).toBe(
        "sunrise-silk-shampoo-conditioner-set"
      )
      expect(removeVisualOptionFromSlug("my-shirt-color_blue")).toBe("my-shirt")
      expect(removeVisualOptionFromSlug("simple-product")).toBe("simple-product")
    })

    test("should create visual option slug", () => {
      expect(createVisualOptionSlug("my-shirt", "blue")).toBe("my-shirt-color_blue")
      expect(createVisualOptionSlug("my-shirt-color_red", "blue")).toBe("my-shirt-color_blue")
      expect(createVisualOptionSlug("my-shirt", undefined)).toBe("my-shirt")
    })
  })

  describe("Multi-option URL handling", () => {
    test("should remove multi-option from slug", () => {
      expect(removeMultiOptionFromSlug("my-shirt--color_blue-size_large-material_cotton")).toBe("my-shirt")
      expect(removeMultiOptionFromSlug("extremecore-ab-roller--color_purple-type_gym-prousage_advanced")).toBe(
        "extremecore-ab-roller"
      )
      expect(removeMultiOptionFromSlug("simple-product")).toBe("simple-product")
    })

    test("should extract multi-option from slug", () => {
      expect(getMultiOptionFromSlug("my-shirt--color_blue-size_large")).toEqual({
        color: "blue",
        size: "large",
      })
      expect(getMultiOptionFromSlug("extremecore-ab-roller--color_purple-type_gym-prousage_advanced")).toEqual({
        color: "purple",
        type: "gym",
        prousage: "advanced",
      })
      expect(getMultiOptionFromSlug("simple-product")).toEqual({})
    })

    test("should create multi-option slug", () => {
      expect(createMultiOptionSlug("my-shirt", { color: "blue", size: "large" })).toBe(
        "my-shirt--color_blue-size_large"
      )
      expect(createMultiOptionSlug("ab-roller", { Color: "Purple", Type: "Gym", "Pro Usage": "Advanced" })).toBe(
        "ab-roller--color_purple-prousage_advanced-type_gym"
      )
      expect(createMultiOptionSlug("simple-product", {})).toBe("simple-product")
    })

    test("should handle option names and values with spaces", () => {
      expect(createMultiOptionSlug("product", { "Pro Usage": "Very Advanced", "Size Category": "Large Size" })).toBe(
        "product--prousage_veryadvanced-sizecategory_largesize"
      )
    })
  })

  describe("Image filtering", () => {
    const mockImages = [
      { url: "product-image-1.jpg" },
      { url: "product-Color-Red-image.jpg" },
      { url: "product-Color-Blue-image.jpg" },
    ]

    test("should filter images by visual option", () => {
      expect(filterImagesByVisualOption(mockImages, "red")).toEqual([{ url: "product-Color-Red-image.jpg" }])
      expect(filterImagesByVisualOption(mockImages, "blue")).toEqual([{ url: "product-Color-Blue-image.jpg" }])
    })

    test("should return all images if no match found", () => {
      expect(filterImagesByVisualOption(mockImages, "green")).toEqual(mockImages)
    })

    test("should return all images if no visual value provided", () => {
      expect(filterImagesByVisualOption(mockImages, null)).toEqual(mockImages)
    })

    test("should get images for carousel with active index", () => {
      expect(getImagesForCarousel(mockImages, "red")).toEqual({
        images: mockImages,
        activeIndex: 1,
      })
      expect(getImagesForCarousel(mockImages, "blue")).toEqual({
        images: mockImages,
        activeIndex: 2,
      })
      expect(getImagesForCarousel(mockImages, null)).toEqual({
        images: mockImages,
        activeIndex: 0,
      })
    })
  })

  describe("Combination handling", () => {
    const mockVariants = [
      {
        id: "1",
        selectedOptions: [{ name: "Color", value: "Red" }],
        title: "Red",
        color: "red",
      },
      {
        id: "2",
        selectedOptions: [{ name: "Color", value: "Blue" }],
        title: "Blue",
        color: "blue",
      },
      {
        id: "3",
        selectedOptions: [
          { name: "Color", value: "Purple" },
          { name: "Type", value: "Gym" },
          { name: "Pro Usage", value: "Advanced" },
        ],
        title: "Purple Gym Advanced",
        color: "purple",
        type: "gym",
        "pro usage": "advanced",
      },
    ]

    test("should get visual option value from combination", () => {
      expect(getVisualOptionValueFromCombination({ color: "red" })).toBe("red")
      expect(
        getVisualOptionValueFromCombination({
          selectedOptions: [{ name: "Color", value: "Blue" }],
        })
      ).toBe("Blue")
    })

    test("should get all option values from combination", () => {
      expect(
        getAllOptionValuesFromCombination({
          id: "1",
          color: "red",
          size: "large",
          title: "Red Large",
        })
      ).toEqual({
        color: "red",
        size: "large",
      })

      expect(
        getAllOptionValuesFromCombination({
          selectedOptions: [
            { name: "Color", value: "Purple" },
            { name: "Size", value: "Large" },
          ],
        })
      ).toEqual({
        color: "purple",
        size: "large",
      })
    })

    test("should get combination by visual option", () => {
      const redCombination = getCombinationByVisualOption(mockVariants, "red")
      expect(redCombination?.id).toBe("1")

      const blueCombination = getCombinationByVisualOption(mockVariants, "blue")
      expect(blueCombination?.id).toBe("2")
    })

    test("should get combination by multi-option with slugified names", () => {
      const purpleCombination = getCombinationByMultiOption(mockVariants, {
        color: "purple",
        type: "gym",
        prousage: "advanced",
      })
      expect(purpleCombination?.id).toBe("3")

      const redCombination = getCombinationByMultiOption(mockVariants, { color: "red" })
      expect(redCombination?.id).toBe("1")
    })

    test("should validate visual options", () => {
      expect(hasValidVisualOption(mockVariants, "red")).toBe(true)
      expect(hasValidVisualOption(mockVariants, "blue")).toBe(true)
      expect(hasValidVisualOption(mockVariants, "yellow")).toBe(false)
      expect(hasValidVisualOption(mockVariants, null)).toBe(true)
    })

    test("should validate multi-options with slugified names", () => {
      expect(hasValidMultiOption(mockVariants, { color: "purple", type: "gym", prousage: "advanced" })).toBe(true)
      expect(hasValidMultiOption(mockVariants, { color: "red" })).toBe(true)
      expect(hasValidMultiOption(mockVariants, { color: "yellow" })).toBe(false)
      expect(hasValidMultiOption(mockVariants, {})).toBe(true)
    })
  })
})
