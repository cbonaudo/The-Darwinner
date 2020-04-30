import Atoms from '@/components/Atoms'
import { mount } from '@vue/test-utils'

describe('Atoms.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Atoms)
  })

  it('should render correct contents', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('should have correct starting data', () => {
    expect(Atoms.data()).toMatchSnapshot()
  })

  describe('atomClick', () => {
    it('it increases atomsNumber by the incrementValue: 1', () => {
      wrapper.setData({ atomsNumber: 0, incrementValue: 1 })
      expect(wrapper.vm.atomsNumber).toEqual(0)
      wrapper.vm.atomClick()
      expect(wrapper.vm.atomsNumber).toEqual(1)
    })
    it('it increases atomsNumber by the incrementValue: 2', () => {
      wrapper.setData({ atomsNumber: 0, incrementValue: 2 })
      expect(wrapper.vm.atomsNumber).toEqual(0)
      wrapper.vm.atomClick()
      expect(wrapper.vm.atomsNumber).toEqual(2)
    })
    it('it increases clicksNumber by 1', () => {
      wrapper.setData({ clicksNumber: 0 })
      expect(wrapper.vm.clicksNumber).toEqual(0)
      wrapper.vm.atomClick()
      expect(wrapper.vm.clicksNumber).toEqual(1)
    })
    it('it increases clicksNumber by 1 even when incrementValue increases', () => {
      wrapper.setData({ clicksNumber: 0, incrementValue: 2 })
      expect(wrapper.vm.clicksNumber).toEqual(0)
      wrapper.vm.atomClick()
      expect(wrapper.vm.clicksNumber).toEqual(1)
    })
  })

  describe('useUpgrade', () => {
    it('splice the upgrades array', () => {
      wrapper.setData({
        upgrades: [
          {
            text: 'Add Increment 1',
            action: 'addIncrement',
            unlock: () => true
          },
          {
            text: 'Add Increment 2',
            action: 'addIncrement',
            unlock: () => true
          }
        ]
      })
      expect(wrapper.vm.upgrades.length).toEqual(2)
      wrapper.vm.useUpgrade('addIncrement', 1)
      expect(wrapper.vm.upgrades.length).toEqual(1)
    })
  })

  describe('addIncrement', () => {
    it('incrementValue increase to 2 from 1', () => {
      wrapper.setData({ incrementValue: 1 })
      expect(wrapper.vm.incrementValue).toEqual(1)
      wrapper.vm.addIncrement()
      expect(wrapper.vm.incrementValue).toEqual(2)
    })
    it('incrementValue increase to 64 from 32', () => {
      wrapper.setData({ incrementValue: 32 })
      expect(wrapper.vm.incrementValue).toEqual(32)
      wrapper.vm.addIncrement()
      expect(wrapper.vm.incrementValue).toEqual(64)
    })
  })

  describe('isUnlocked', () => {
    it('return the result (true) of the function provided in the upgrade', () => {
      const upgrade = {
        unlock() {
          return true
        }
      }
      expect(wrapper.vm.isUnlocked(upgrade)).toBe(true)
    })
    it('return the result (false) of the function provided in the upgrade', () => {
      const upgrade = {
        unlock() {
          return false
        }
      }
      expect(wrapper.vm.isUnlocked(upgrade)).toBe(false)
    })
  })

  // DEBUG
  describe('resetAtoms', () => {
    it('reste atoms to 0', () => {
      wrapper.setData({ atomsNumber: 100 })
      expect(wrapper.vm.atomsNumber).toEqual(100)
      wrapper.vm.resetAtoms()
      expect(wrapper.vm.atomsNumber).toEqual(0)
    })
  })
})
