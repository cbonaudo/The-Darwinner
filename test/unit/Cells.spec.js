import Cells from '@/components/Cells'
import { shallowMount } from '@vue/test-utils'

describe('Cells.vue', () => {
  const wrapper = shallowMount(Cells)

  it('should render correct contents', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have correct starting data', () => {
    expect(Cells.data()).toMatchSnapshot()
  })

  describe('data', () => {
    it('should initialize correctly', () => {
      const cellsData = Cells.data
      expect(typeof cellsData).toBe('function')
      expect(cellsData()).toMatchSnapshot()
    })
  })
  describe('', () => {})
  describe('', () => {})
  describe('', () => {})
})
