import Atoms from '@/components/Atoms'
import { mount } from '@vue/test-utils'

describe('Atoms.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Atoms)
  })

  it('should render correct contents', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
  it('should have correct starting data', () => {
    expect(Atoms.data()).toMatchSnapshot()
  })

  describe('atomClick', () => {
    it('increases atomsNumber by the incrementValue: 1', () => {
      wrapper.setData({ atomsNumber: 0, incrementValue: 1 })
      expect(wrapper.vm.atomsNumber).toEqual(0)
      wrapper.vm.atomClick()
      expect(wrapper.vm.atomsNumber).toEqual(1)
    })
    it('calls getTenthClick() if activated', () => {
      wrapper.setData({ tenthClickActivated: true, tenthClick: 0 })
      expect(wrapper.vm.tenthClick).toEqual(0)
      wrapper.vm.atomClick()
      expect(wrapper.vm.tenthClick).toEqual(1)
    })
    it("doesn't call getTenthClick() if activated", () => {
      wrapper.setData({ tenthClickActivated: false, tenthClick: 0 })
      expect(wrapper.vm.tenthClick).toEqual(0)
      wrapper.vm.atomClick()
      expect(wrapper.vm.tenthClick).toEqual(0)
    })
  })

  describe('atomKeyStrike', () => {
    it('increases atomsNumber by half the incrementValue: 1', () => {
      wrapper.setData({ atomsNumber: 0, incrementValue: 1 })
      expect(wrapper.vm.atomsNumber).toEqual(0)
      wrapper.vm.atomKeyStrike()
      expect(wrapper.vm.atomsNumber).toEqual(0.5)
    })
  })

  describe('atomBuying', () => {
    it('increases atomsNumber by the incrementValue: 1', () => {
      wrapper.setData({ atomsNumber: 0, incrementValue: 1 })
      expect(wrapper.vm.atomsNumber).toEqual(0)
      wrapper.vm.atomBuying()
      expect(wrapper.vm.atomsNumber).toEqual(1)
    })
    it('increases atomsNumber by the incrementValue: 2', () => {
      wrapper.setData({ atomsNumber: 0, incrementValue: 2 })
      expect(wrapper.vm.atomsNumber).toEqual(0)
      wrapper.vm.atomBuying()
      expect(wrapper.vm.atomsNumber).toEqual(2)
    })
    it('increases atomsNumber by half the incrementValue: 1', () => {
      wrapper.setData({ atomsNumber: 0, incrementValue: 1 })
      expect(wrapper.vm.atomsNumber).toEqual(0)
      wrapper.vm.atomBuying(0.5)
      expect(wrapper.vm.atomsNumber).toEqual(0.5)
    })
  })

  describe('getTenthClick', () => {
    it('increases the tenthClick by 1', () => {
      wrapper.setData({ tenthClick: 0 })
      expect(wrapper.vm.tenthClick).toEqual(0)
      wrapper.vm.getTenthClick()
      expect(wrapper.vm.tenthClick).toEqual(1)
    })
    it('bring the tenthClick to 0', () => {
      wrapper.setData({ tenthClick: 9 })
      expect(wrapper.vm.tenthClick).toEqual(9)
      wrapper.vm.getTenthClick()
      expect(wrapper.vm.tenthClick).toEqual(0)
    })
  })

  describe('upgrade_activateTenthClick', () => {
    it('switch tenthClickActivated to true', () => {
      wrapper.setData({ tenthClickActivated: false })
      expect(wrapper.vm.tenthClickActivated).toEqual(false)
      wrapper.vm.upgrade_activateTenthClick()
      expect(wrapper.vm.tenthClickActivated).toEqual(true)
    })
    it('keep tenthClickActivated to true', () => {
      wrapper.setData({ tenthClickActivated: true })
      expect(wrapper.vm.tenthClickActivated).toEqual(true)
      wrapper.vm.upgrade_activateTenthClick()
      expect(wrapper.vm.tenthClickActivated).toEqual(true)
    })
  })

  // Proteins
  describe('getProteins', () => {
    it('gives 1 protein when above 210 atoms', () => {
      wrapper.setData({ atomsNumber: 212, proteinsNumber: 0 })
      expect(wrapper.vm.proteinsNumber).toEqual(0)
      wrapper.vm.getProteins()
      expect(wrapper.vm.proteinsNumber).toEqual(1)
      expect(wrapper.vm.atomsNumber).toEqual(2)
    })
    it('gives 10 protein when above 2100 atoms', () => {
      wrapper.setData({ atomsNumber: 2101, proteinsNumber: 0 })
      expect(wrapper.vm.proteinsNumber).toEqual(0)
      wrapper.vm.getProteins()
      expect(wrapper.vm.proteinsNumber).toEqual(10)
      expect(wrapper.vm.atomsNumber).toEqual(1)
    })
    it('gives 0 protein when below 210 atoms', () => {
      wrapper.setData({ atomsNumber: 199, proteinsNumber: 0 })
      expect(wrapper.vm.proteinsNumber).toEqual(0)
      wrapper.vm.getProteins()
      expect(wrapper.vm.proteinsNumber).toEqual(0)
      expect(wrapper.vm.atomsNumber).toEqual(199)
    })
  })

  // Upgrades
  describe('useUpgrade', () => {
    it('splice the upgrades array', () => {
      wrapper.setData({
        upgrades: [
          {
            text: 'Add Increment 1',
            action: 'doubleIncrement',
            proteinsNeeded: 1
          },
          {
            text: 'Add Increment 2',
            action: 'unlockKeystroke',
            proteinsNeeded: 1
          }
        ]
      })
      expect(wrapper.vm.upgradesBought).toEqual([])
      expect(wrapper.vm.upgrades.length).toEqual(2)
      wrapper.vm.useUpgrade(
        {
          text: 'Add Increment 1',
          action: 'doubleIncrement',
          proteinsNeeded: 1
        },
        1
      )
      expect(wrapper.vm.upgrades.length).toEqual(1)
      expect(wrapper.vm.upgradesBought).toEqual([
        {
          text: 'Add Increment 1',
          action: 'doubleIncrement',
          proteinsNeeded: 1
        }
      ])
    })
  })

  describe('upgrade_doubleIncrement', () => {
    it('incrementValue increase to 2 from 1', () => {
      wrapper.setData({ incrementValue: 1 })
      expect(wrapper.vm.incrementValue).toEqual(1)
      wrapper.vm.upgrade_doubleIncrement()
      expect(wrapper.vm.incrementValue).toEqual(2)
    })
    it('incrementValue increase to 64 from 32', () => {
      wrapper.setData({ incrementValue: 32 })
      expect(wrapper.vm.incrementValue).toEqual(32)
      wrapper.vm.upgrade_doubleIncrement()
      expect(wrapper.vm.incrementValue).toEqual(64)
    })
  })

  describe('upgrade_unlockKeystroke', () => {
    it('unlockedKeystroke to true', () => {
      wrapper.setData({ maintainUnlocked: false })
      expect(wrapper.vm.maintainUnlocked).toEqual(false)
      wrapper.vm.upgrade_unlockKeystroke()
      expect(wrapper.vm.maintainUnlocked).toEqual(true)
    })
  })

  describe('isUnlocked', () => {
    it('is not unlocked when 157 needed and 145 obtained', () => {
      wrapper.setData({ proteinsNumber: 1 })
      const upgrade = { proteinsNeeded: 1 }
      expect(wrapper.vm.isUnlocked(upgrade)).toBe(true)
    })
    it('is not unlocked when 157 needed and 145 obtained', () => {
      wrapper.setData({ proteinsNumber: 145 })
      const upgrade = { proteinsNeeded: 157 }
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
