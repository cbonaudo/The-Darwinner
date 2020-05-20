import EvolutionRush from '@/components/EvolutionRush'
import { shallowMount } from '@vue/test-utils'

describe('EvolutionRush.vue', () => {
  const wrapper = shallowMount(EvolutionRush)

  describe('isDisplayed', () => {
    it('should render if displayed', () => {
      wrapper.setProps({ isDisplayed: false })
      expect(wrapper.element).toMatchSnapshot()
    })
    it('shouldn’t render if not displayed', () => {
      wrapper.setProps({ isDisplayed: true })
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  it('should have correct starting data', () => {
    expect(EvolutionRush.data()).toMatchSnapshot()
  })

  describe('changePosition', () => {
    it('creates a new position', () => {
      wrapper.setData({ top: '5%', left: '5%' })
      expect(wrapper.vm.top).toEqual('5%')
      expect(wrapper.vm.left).toEqual('5%')
      wrapper.vm.changePosition()
      expect(wrapper.vm.top !== '5%').toBeTruthy()
      expect(wrapper.vm.left !== '5%').toBeTruthy()
    })
  })

  describe('getPosition', () => {
    it('returns the position object', () => {
      expect(EvolutionRush.computed.getPosition.call({ top: 5, left: 5 })).toEqual({ top: '5%', left: '5%' })
    })
    it('returns the position object', () => {
      expect(EvolutionRush.computed.getPosition.call({ top: 12.5, left: 12.5 })).toEqual({
        top: '12.5%',
        left: '12.5%'
      })
    })
  })
})
