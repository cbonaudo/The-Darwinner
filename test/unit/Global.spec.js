import Global from '@/Global'
import { mount } from '@vue/test-utils'

describe('Global.vue', () => {
  const wrapper = mount(Global)

  it('should render correct contents', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have correct starting data', () => {
    expect(Global.data()).toMatchSnapshot()
  })

  describe('resetAll', () => {
    it('should reset the clicks', () => {
      wrapper.setData({ clicks: 10 })
      expect(wrapper.vm.clicks).toEqual(10)
      wrapper.vm.resetAll()
      expect(wrapper.vm.clicks).toEqual(0)
    })
    it('should reset the keyStrokes', () => {
      wrapper.setData({ keyStrokes: 10 })
      expect(wrapper.vm.keyStrokes).toEqual(10)
      wrapper.vm.resetAll()
      expect(wrapper.vm.keyStrokes).toEqual(0)
    })
  })
})
