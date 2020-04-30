import Debug from '@/components/Debug'
import { shallowMount } from '@vue/test-utils'

describe('Debug.vue', () => {
  const wrapper = shallowMount(Debug)

  it('should render correct contents', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have correct starting data', () => {
    expect(Debug.data()).toMatchSnapshot()
  })

  describe('reset', () => {
    it('should reset the timer', () => {
      wrapper.setData({ timer: 10 })
      expect(wrapper.vm.timer).toEqual(10)
      wrapper.vm.reset()
      expect(wrapper.vm.timer).toEqual(0)
    })
  })

  describe('tick', () => {
    it('should increase the timer', () => {
      wrapper.setData({ timer: 0 })
      expect(wrapper.vm.timer).toEqual(0)
      wrapper.vm.tick()
      expect(wrapper.vm.timer).toEqual(1)
    })
  })
})
