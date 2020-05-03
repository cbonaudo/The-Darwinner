import Global from '@/Global'
import { mount } from '@vue/test-utils'

describe('Global.vue', () => {
  const wrapper = mount(Global, { attachToDocument: true })

  it('should render correct contents', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have correct starting data', () => {
    expect(Global.data()).toMatchSnapshot()
  })

  describe('onkeydown', () => {
    it('should trigger on "A" key, if keystrokesAllowed', () => {
      wrapper.setData({ keyStrokes: 10, keyStrokesAllowed: [65] })
      wrapper.trigger('keydown', { keyCode: '65' })
      expect(wrapper.vm.keyStrokes).toEqual(11)
    })
    it('should not trigger on "A" key, if keystrokes 65 is not allowed', () => {
      wrapper.setData({ keyStrokes: 10, keyStrokesAllowed: [] })
      wrapper.trigger('keydown', { keyCode: '65' })
      expect(wrapper.vm.keyStrokes).toEqual(10)
    })
    it('should do nothing on other keys', () => {
      wrapper.setData({ keyStrokes: 10 })
      wrapper.trigger('keydown.esc')
      expect(wrapper.vm.keyStrokes).toEqual(10)
    })
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
