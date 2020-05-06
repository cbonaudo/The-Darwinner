import Atoms from '@/components/Atoms'
import { mount } from '@vue/test-utils'

describe('Atoms.vue', () => {
  jest.useFakeTimers()
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

  describe('atomKeyStroke', () => {
    it('increases atomsNumber by half the incrementValue: 1', () => {
      wrapper.setData({ atomsNumber: 0, incrementValue: 1 })
      expect(wrapper.vm.atomsNumber).toEqual(0)
      wrapper.vm.atomKeyStroke()
      expect(wrapper.vm.atomsNumber).toEqual(0.5)
    })
    it('calls getTenthKeyStroke() if activated', () => {
      wrapper.setData({ tenthKeyStrokeActivated: true, tenthKeyStroke: 0 })
      expect(wrapper.vm.tenthKeyStroke).toEqual(0)
      wrapper.vm.atomKeyStroke()
      expect(wrapper.vm.tenthKeyStroke).toEqual(1)
    })
    it("doesn't call getTenthKeyStroke() if activated", () => {
      wrapper.setData({ tenthKeyStrokeActivated: false, tenthClick: 0 })
      expect(wrapper.vm.tenthKeyStroke).toEqual(0)
      wrapper.vm.atomKeyStroke()
      expect(wrapper.vm.tenthKeyStroke).toEqual(0)
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
  describe('getTenthKeyStroke', () => {
    it('increases the tenthKeyStroke by 1', () => {
      wrapper.setData({ tenthKeyStroke: 0 })
      expect(wrapper.vm.tenthKeyStroke).toEqual(0)
      wrapper.vm.getTenthKeyStroke()
      expect(wrapper.vm.tenthKeyStroke).toEqual(1)
    })
    it('bring the tenthKeyStroke to 0', () => {
      wrapper.setData({ tenthKeyStroke: 9 })
      expect(wrapper.vm.tenthKeyStroke).toEqual(9)
      wrapper.vm.getTenthKeyStroke()
      expect(wrapper.vm.tenthKeyStroke).toEqual(0)
    })
  })
  describe('getTenthTick', () => {
    it('increases the tenthTick by 1', () => {
      wrapper.setData({ tenthTick: 0 })
      expect(wrapper.vm.tenthTick).toEqual(0)
      wrapper.vm.getTenthTick()
      expect(wrapper.vm.tenthTick).toEqual(1)
    })
    it('bring the tenthTick to 0', () => {
      wrapper.setData({ tenthTick: 9 })
      expect(wrapper.vm.tenthTick).toEqual(9)
      wrapper.vm.getTenthTick()
      expect(wrapper.vm.tenthTick).toEqual(0)
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

  // Tick Actions
  describe('tickActions', () => {
    it('increase from incrementValue', () => {
      wrapper.setData({ incrementValue: 1, tickActivated: true, atomsNumber: 1 })
      expect(wrapper.vm.atomsNumber).toEqual(1)
      wrapper.vm.tickActions()
      expect(wrapper.vm.atomsNumber).toEqual(2)
    })
    it('incrementValue increase to 64 from 32', () => {
      wrapper.setData({ incrementValue: 10, tickActivated: false, atomsNumber: 1 })
      expect(wrapper.vm.atomsNumber).toEqual(1)
      wrapper.vm.tickActions()
      expect(wrapper.vm.atomsNumber).toEqual(1)
    })
    it('getTenthTick', () => {
      wrapper.setData({ tickActivated: true, tenthTickActivated: true, tenthTick: 0 })
      expect(wrapper.vm.tenthTick).toEqual(0)
      wrapper.vm.tickActions()
      expect(wrapper.vm.tenthTick).toEqual(1)
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
      wrapper.vm.useUpgrade(0)
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
  describe('upgrade_unlockKeyStroke', () => {
    it('keyStrokeUnlocked to true', () => {
      wrapper.setData({ keyStrokeUnlocked: false })
      expect(wrapper.vm.keyStrokeUnlocked).toEqual(false)
      wrapper.vm.upgrade_unlockKeyStroke()
      expect(wrapper.vm.keyStrokeUnlocked).toEqual(true)
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
  describe('upgrade_increaseTenthClick', () => {
    it('increase tenthClickIncrement to 2 from 1', () => {
      wrapper.setData({ tenthClickIncrement: 1 })
      expect(wrapper.vm.tenthClickIncrement).toEqual(1)
      wrapper.vm.upgrade_increaseTenthClick()
      expect(wrapper.vm.tenthClickIncrement).toEqual(2)
    })
    it('keep tenthClickIncrement to 1 from 0.5', () => {
      wrapper.setData({ tenthClickIncrement: 0.5 })
      expect(wrapper.vm.tenthClickIncrement).toEqual(0.5)
      wrapper.vm.upgrade_increaseTenthClick()
      expect(wrapper.vm.tenthClickIncrement).toEqual(1)
    })
  })
  describe('upgrade_activateTenthKeyStroke', () => {
    it('switch tenthKeyStrokeActivated to true', () => {
      wrapper.setData({ tenthKeyStrokeActivated: false })
      expect(wrapper.vm.tenthKeyStrokeActivated).toEqual(false)
      wrapper.vm.upgrade_activateTenthKeyStroke()
      expect(wrapper.vm.tenthKeyStrokeActivated).toEqual(true)
    })
    it('keep tenthKeyStrokeActivated to true', () => {
      wrapper.setData({ tenthKeyStrokeActivated: true })
      expect(wrapper.vm.tenthKeyStrokeActivated).toEqual(true)
      wrapper.vm.upgrade_activateTenthKeyStroke()
      expect(wrapper.vm.tenthKeyStrokeActivated).toEqual(true)
    })
  })
  describe('upgrade_increaseTenthKeyStroke', () => {
    it('increase tenthKeyStrokeIncrement to 2 from 1', () => {
      wrapper.setData({ tenthKeyStrokeIncrement: 1 })
      expect(wrapper.vm.tenthKeyStrokeIncrement).toEqual(1)
      wrapper.vm.upgrade_increaseTenthKeyStroke()
      expect(wrapper.vm.tenthKeyStrokeIncrement).toEqual(2)
    })
    it('keep tenthKeyStrokeIncrement to 1 from 0.5', () => {
      wrapper.setData({ tenthKeyStrokeIncrement: 0.5 })
      expect(wrapper.vm.tenthKeyStrokeIncrement).toEqual(0.5)
      wrapper.vm.upgrade_increaseTenthKeyStroke()
      expect(wrapper.vm.tenthKeyStrokeIncrement).toEqual(1)
    })
  })
  describe('upgrade_activateTenthTick', () => {
    it('switch tenthTickActivated to true', () => {
      wrapper.setData({ tenthTickActivated: false })
      expect(wrapper.vm.tenthTickActivated).toEqual(false)
      wrapper.vm.upgrade_activateTenthTick()
      expect(wrapper.vm.tenthTickActivated).toEqual(true)
    })
    it('keep tenthTickActivated to true', () => {
      wrapper.setData({ tenthTickActivated: true })
      expect(wrapper.vm.tenthTickActivated).toEqual(true)
      wrapper.vm.upgrade_activateTenthTick()
      expect(wrapper.vm.tenthTickActivated).toEqual(true)
    })
  })
  describe('upgrade_increaseTenthTick', () => {
    it('increase tenthTickIncrement to 2 from 1', () => {
      wrapper.setData({ tenthTickIncrement: 1 })
      expect(wrapper.vm.tenthTickIncrement).toEqual(1)
      wrapper.vm.upgrade_increaseTenthTick()
      expect(wrapper.vm.tenthTickIncrement).toEqual(2)
    })
    it('keep tenthTickIncrement to 1 from 0.5', () => {
      wrapper.setData({ tenthTickIncrement: 0.5 })
      expect(wrapper.vm.tenthTickIncrement).toEqual(0.5)
      wrapper.vm.upgrade_increaseTenthTick()
      expect(wrapper.vm.tenthTickIncrement).toEqual(1)
    })
  })
  describe('upgrade_activateTick', () => {
    it('switch tickActivated to true', () => {
      wrapper.setData({ tickActivated: false })
      expect(wrapper.vm.tickActivated).toEqual(false)
      wrapper.vm.upgrade_activateTick()
      expect(wrapper.vm.tickActivated).toEqual(true)
    })
    it('keep tickActivated to true', () => {
      wrapper.setData({ tickActivated: true })
      expect(wrapper.vm.tickActivated).toEqual(true)
      wrapper.vm.upgrade_activateTick()
      expect(wrapper.vm.tickActivated).toEqual(true)
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

  describe('getPercentForUpgrade', () => {
    it('is 11% when 1 protein, a few atoms, and 10 proteins needed', () => {
      wrapper.setData({ proteinsNumber: 0, atomsNumber: 0, upgrades: [{ proteinsNeeded: 10 }] })
      expect(wrapper.vm.getPercentForUpgrade(0)).toBe('0%')
    })
    it('is 11% when 1 protein, a few atoms, and 10 proteins needed', () => {
      wrapper.setData({ proteinsNumber: 1, atomsNumber: 23, upgrades: [{ proteinsNeeded: 10 }] })
      expect(wrapper.vm.getPercentForUpgrade(0)).toBe('11%')
    })
    it('is empty when above protein level', () => {
      wrapper.setData({ proteinsNumber: 10, atomsNumber: 23, upgrades: [{ proteinsNeeded: 10 }] })
      expect(wrapper.vm.getPercentForUpgrade(0)).toBe('')
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

  // HOOKS
  describe('created', () => {
    it('trigger tickActions every second', async () => {
      wrapper.setData({ tickActivated: true })
      jest.runTimersToTime(1500)
      await expect(wrapper.vm.atomsNumber).toEqual(1)
    })
  })
})
