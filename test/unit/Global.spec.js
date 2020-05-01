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

  describe('unlockKeystroke', () => {
    it('should add 65 to keyStrokesAllowed', () => {
      wrapper.setData({ keyStrokesAllowed: [] })
      expect(wrapper.vm.keyStrokesAllowed).toEqual([])
      wrapper.vm.unlockKeystroke(65)
      expect(wrapper.vm.keyStrokesAllowed).toEqual([65])
    })
    it('should add 120 to keyStrokesAllowed with 65', () => {
      wrapper.setData({ keyStrokesAllowed: [65] })
      expect(wrapper.vm.keyStrokesAllowed).toEqual([65])
      wrapper.vm.unlockKeystroke(120)
      expect(wrapper.vm.keyStrokesAllowed).toEqual([65, 120])
    })
  })
})
