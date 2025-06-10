import {
  createVisualOptionSlug,
  filterImagesByVisualOption,
  getCombinationByVisualOption,
  getVisualOptionFromSlug,
  getVisualOptionValueFromCombination,
  hasValidVisualOption,
  removeVisualOptionFromSlug,
} from '../visual-variant-utils'

describe('Visual Variant Utils', () => {
  describe('URL handling', () => {
    test('should extract visual option from slug', () => {
      expect(getVisualOptionFromSlug('sunrise-silk-shampoo-conditioner-set-color_red')).toBe('red')
      expect(getVisualOptionFromSlug('my-shirt-color_blue')).toBe('blue')
      expect(getVisualOptionFromSlug('simple-product')).toBe(null)
    })

    test('should remove visual option from slug', () => {
      expect(removeVisualOptionFromSlug('sunrise-silk-shampoo-conditioner-set-color_red')).toBe('sunrise-silk-shampoo-conditioner-set')
      expect(removeVisualOptionFromSlug('my-shirt-color_blue')).toBe('my-shirt')
      expect(removeVisualOptionFromSlug('simple-product')).toBe('simple-product')
    })

    test('should create visual option slug', () => {
      expect(createVisualOptionSlug('my-shirt', 'blue')).toBe('my-shirt-color_blue')
      expect(createVisualOptionSlug('my-shirt-color_red', 'blue')).toBe('my-shirt-color_blue')
      expect(createVisualOptionSlug('my-shirt', undefined)).toBe('my-shirt')
    })
  })

  describe('Image filtering', () => {
    const mockImages = [
      { url: 'https://example.com/product-Color-Red.jpg', altText: null },
      { url: 'https://example.com/product-Color-Blue.jpg', altText: null },
      { url: 'https://example.com/product-Color-Green.jpg', altText: null },
    ]

    test('should filter images by visual option', () => {
      const redImages = filterImagesByVisualOption(mockImages, 'red')
      expect(redImages).toHaveLength(1)
      expect(redImages[0].url).toContain('Red')

      const blueImages = filterImagesByVisualOption(mockImages, 'blue')
      expect(blueImages).toHaveLength(1)
      expect(blueImages[0].url).toContain('Blue')
    })

    test('should return all images if no match found', () => {
      const yellowImages = filterImagesByVisualOption(mockImages, 'yellow')
      expect(yellowImages).toHaveLength(mockImages.length)
    })

    test('should return all images if no visual value provided', () => {
      const allImages = filterImagesByVisualOption(mockImages, null)
      expect(allImages).toHaveLength(mockImages.length)
    })
  })

  describe('Combination handling', () => {
    const mockVariants = [
      {
        id: '1',
        selectedOptions: [{ name: 'Color', value: 'Red' }],
        title: 'Red',
        color: 'red'
      },
      {
        id: '2',
        selectedOptions: [{ name: 'Color', value: 'Blue' }],
        title: 'Blue',
        color: 'blue'
      },
    ]

    test('should get visual option value from combination', () => {
      expect(getVisualOptionValueFromCombination({ color: 'red' })).toBe('red')
      expect(getVisualOptionValueFromCombination({ 
        selectedOptions: [{ name: 'Color', value: 'Blue' }] 
      })).toBe('Blue')
    })

    test('should get combination by visual option', () => {
      const redCombination = getCombinationByVisualOption(mockVariants, 'red')
      expect(redCombination?.id).toBe('1')

      const blueCombination = getCombinationByVisualOption(mockVariants, 'blue')
      expect(blueCombination?.id).toBe('2')
    })

    test('should validate visual options', () => {
      expect(hasValidVisualOption(mockVariants, 'red')).toBe(true)
      expect(hasValidVisualOption(mockVariants, 'blue')).toBe(true)
      expect(hasValidVisualOption(mockVariants, 'yellow')).toBe(false)
      expect(hasValidVisualOption(mockVariants, null)).toBe(true)
    })
  })
}) 