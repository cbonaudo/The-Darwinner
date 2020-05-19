import Atoms from '@/components/Atoms'
import { mount } from '@vue/test-utils'
import atomStore from '@/store/atomStore'

describe('Atoms.vue', () => {
  jest.useFakeTimers()
  let wrapper

  beforeEach(() => {
    wrapper = mount(Atoms, {
      mocks: {
        $atomStore: atomStore
      }
    })
  })

  it('should render correct contents', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
  it('should have correct starting data', () => {
    expect(atomStore).toMatchSnapshot()
  })

  // HOOKS
  describe('created', () => {
    it('trigger tickActions every second', async () => {
      atomStore.tickActivated = true
      atomStore.globalMultiplier = 1
      atomStore.tickIncrement = 1
      atomStore.atomsNumber = 0
      atomStore.tenthClickActivated = false
      await expect(atomStore.atomsNumber).toEqual(0)
      jest.runTimersToTime(1500)

      await expect(atomStore.atomsNumber).toEqual(3)
    })
  })

  describe('atomClick', () => {
    it('increases atomsNumber by the clickIncrement: 1', () => {
      atomStore.atomsNumber = 0
      atomStore.clickIncrement = 1
      expect(atomStore.atomsNumber).toEqual(0)
      wrapper.vm.atomClick()

      expect(atomStore.atomsNumber).toEqual(1)
    })
    it('increases atomsNumber by the clickIncrement: 2', () => {
      atomStore.atomsNumber = 0
      atomStore.clickIncrement = 2
      expect(atomStore.atomsNumber).toEqual(0)
      wrapper.vm.atomClick()

      expect(atomStore.atomsNumber).toEqual(2)
    })
    it('increases atomsNumber by the clickIncrement x globalMultiplier: 4', () => {
      atomStore.atomsNumber = 0
      atomStore.clickIncrement = 2
      atomStore.globalMultiplier = 2
      expect(atomStore.atomsNumber).toEqual(0)
      wrapper.vm.atomClick()

      expect(atomStore.atomsNumber).toEqual(4)
    })
    it('calls getTenthClick() if activated', () => {
      atomStore.tenthClickActivated = true
      atomStore.tenthClick = 0
      expect(atomStore.tenthClick).toEqual(0)
      wrapper.vm.atomClick()

      expect(atomStore.tenthClick).toEqual(1)
    })
    it("doesn't call getTenthClick() if activated", () => {
      atomStore.tenthClickActivated = false
      atomStore.tenthClick = 0
      expect(atomStore.tenthClick).toEqual(0)
      wrapper.vm.atomClick()

      expect(atomStore.tenthClick).toEqual(0)
    })
  })

  describe('atomKeyStroke', () => {
    it('increases atomsNumber by half the keyStrokeIncrement: 0.5', () => {
      atomStore.atomsNumber = 0
      atomStore.keyStrokeIncrement = 0.5
      atomStore.globalMultiplier = 1
      expect(atomStore.atomsNumber).toEqual(0)
      wrapper.vm.atomKeyStroke()

      expect(atomStore.atomsNumber).toEqual(0.5)
    })
    it('increases atomsNumber by half the keyStrokeIncrement x globalMultiplier: 2', () => {
      atomStore.atomsNumber = 0
      atomStore.keyStrokeIncrement = 2
      atomStore.globalMultiplier = 1
      expect(atomStore.atomsNumber).toEqual(0)
      wrapper.vm.atomKeyStroke()

      expect(atomStore.atomsNumber).toEqual(2)
    })
    it('increases atomsNumber by half the keyStrokeIncrement x globalMultiplier: 1', () => {
      atomStore.atomsNumber = 0
      atomStore.keyStrokeIncrement = 0.5
      atomStore.globalMultiplier = 2
      expect(atomStore.atomsNumber).toEqual(0)
      wrapper.vm.atomKeyStroke()

      expect(atomStore.atomsNumber).toEqual(1)
    })
    it('calls getTenthKeyStroke() if activated', () => {
      atomStore.tenthKeyStrokeActivated = true
      atomStore.tenthKeyStroke = 0
      expect(atomStore.tenthKeyStroke).toEqual(0)
      wrapper.vm.atomKeyStroke()

      expect(atomStore.tenthKeyStroke).toEqual(1)
    })
    it("doesn't call getTenthKeyStroke() if not activated", () => {
      atomStore.tenthKeyStrokeActivated = false
      atomStore.tenthKeyStroke = 0
      expect(atomStore.tenthKeyStroke).toEqual(0)
      wrapper.vm.atomKeyStroke()

      expect(atomStore.tenthKeyStroke).toEqual(0)
    })
  })

  describe('atomBuying', () => {
    it('increases atomsNumber by the globalMultiplier: 1', () => {
      atomStore.atomsNumber = 0
      atomStore.globalMultiplier = 1
      expect(atomStore.atomsNumber).toEqual(0)
      wrapper.vm.atomBuying()

      expect(atomStore.atomsNumber).toEqual(1)
    })
    it('increases atomsNumber by the globalMultiplier: 2', () => {
      atomStore.atomsNumber = 0
      atomStore.globalMultiplier = 2
      expect(atomStore.atomsNumber).toEqual(0)
      wrapper.vm.atomBuying()

      expect(atomStore.atomsNumber).toEqual(2)
    })
    it('increases atomsNumber by half the globalMultiplier: 1', () => {
      atomStore.atomsNumber = 0
      atomStore.globalMultiplier = 1
      expect(atomStore.atomsNumber).toEqual(0)
      wrapper.vm.atomBuying(0.5)

      expect(atomStore.atomsNumber).toEqual(0.5)
    })
  })

  describe('getTenthClick', () => {
    it('increases the tenthClick by 1', () => {
      atomStore.tenthClick = 0
      expect(atomStore.tenthClick).toEqual(0)
      wrapper.vm.getTenthClick()

      expect(atomStore.tenthClick).toEqual(1)
    })
    it('bring the tenthClick to 0', () => {
      atomStore.tenthClick = 9
      expect(atomStore.tenthClick).toEqual(9)
      wrapper.vm.getTenthClick()

      expect(atomStore.tenthClick).toEqual(0)
    })
  })
  describe('getTenthKeyStroke', () => {
    it('increases the tenthKeyStroke by 1', () => {
      atomStore.tenthKeyStroke = 0
      expect(atomStore.tenthKeyStroke).toEqual(0)
      wrapper.vm.getTenthKeyStroke()

      expect(atomStore.tenthKeyStroke).toEqual(1)
    })
    it('bring the tenthKeyStroke to 0', () => {
      atomStore.tenthKeyStroke = 9
      expect(atomStore.tenthKeyStroke).toEqual(9)
      wrapper.vm.getTenthKeyStroke()

      expect(atomStore.tenthKeyStroke).toEqual(0)
    })
  })
  describe('getTenthTick', () => {
    it('increases the tenthTick by 1', () => {
      atomStore.tenthTick = 0
      expect(atomStore.tenthTick).toEqual(0)
      wrapper.vm.getTenthTick()

      expect(atomStore.tenthTick).toEqual(1)
    })
    it('bring the tenthTick to 0', () => {
      atomStore.tenthTick = 9
      expect(atomStore.tenthTick).toEqual(9)
      wrapper.vm.getTenthTick()

      expect(atomStore.tenthTick).toEqual(0)
    })
  })

  // Proteins
  describe('getProteins', () => {
    it('gives 1 protein when above 210 atoms', () => {
      atomStore.atomsNumber = 212
      atomStore.proteinsNumber = 0
      expect(atomStore.proteinsNumber).toEqual(0)
      wrapper.vm.getProteins()

      expect(atomStore.proteinsNumber).toEqual(1)
      expect(atomStore.atomsNumber).toEqual(2)
    })
    it('gives 10 protein when above 2100 atoms', () => {
      atomStore.atomsNumber = 2101
      atomStore.proteinsNumber = 0
      expect(atomStore.proteinsNumber).toEqual(0)
      wrapper.vm.getProteins()

      expect(atomStore.proteinsNumber).toEqual(10)
      expect(atomStore.atomsNumber).toEqual(1)
    })
    it('gives 0 protein when below 210 atoms', () => {
      atomStore.atomsNumber = 199
      atomStore.proteinsNumber = 0
      expect(atomStore.proteinsNumber).toEqual(0)
      wrapper.vm.getProteins()

      expect(atomStore.proteinsNumber).toEqual(0)
      expect(atomStore.atomsNumber).toEqual(199)
    })
  })

  // Tick Actions
  describe('tickActions', () => {
    it('increases from tickIncrement: 1', () => {
      atomStore.tickIncrement = 1
      atomStore.tickActivated = true
      atomStore.atomsNumber = 1
      expect(atomStore.atomsNumber).toEqual(1)
      wrapper.vm.tickActions()

      expect(atomStore.atomsNumber).toEqual(2)
    })
    it('increases from tickIncrement: 2', () => {
      atomStore.tickIncrement = 2
      atomStore.tickActivated = true
      atomStore.atomsNumber = 1
      expect(atomStore.atomsNumber).toEqual(1)
      wrapper.vm.tickActions()

      expect(atomStore.atomsNumber).toEqual(3)
    })
    it('increases from tickIncrement x globalMultiplier: 4', () => {
      atomStore.tickIncrement = 2
      atomStore.globalMultiplier = 2
      atomStore.tickActivated = true
      atomStore.atomsNumber = 1
      expect(atomStore.atomsNumber).toEqual(1)
      wrapper.vm.tickActions()

      expect(atomStore.atomsNumber).toEqual(5)
    })
    it('doesn’t increase', () => {
      atomStore.tickIncrement = 10
      atomStore.tickActivated = false
      atomStore.atomsNumber = 1
      expect(atomStore.atomsNumber).toEqual(1)
      wrapper.vm.tickActions()

      expect(atomStore.atomsNumber).toEqual(1)
    })
    it('getTenthTick', () => {
      atomStore.tickActivated = true
      atomStore.tenthTickActivated = true
      atomStore.tenthTick = 0
      expect(atomStore.tenthTick).toEqual(0)
      wrapper.vm.tickActions()

      expect(atomStore.tenthTick).toEqual(1)
    })
  })

  // Upgrades
  describe('useUpgrade', () => {
    it('splice the upgrades array', () => {
      atomStore.upgrades = [
        {
          text: 'Add Increment 1',
          action: 'doubleGlobal',
          proteinsNeeded: 1
        },
        {
          text: 'Add Increment 2',
          action: 'unlockKeystroke',
          proteinsNeeded: 1
        }
      ]
      expect(atomStore.upgradesBought).toEqual([])
      expect(atomStore.upgrades.length).toEqual(2)
      wrapper.vm.useUpgrade(0)

      expect(atomStore.upgrades.length).toEqual(1)
      expect(atomStore.upgradesBought).toEqual([
        {
          text: 'Add Increment 1',
          action: 'doubleGlobal',
          proteinsNeeded: 1
        }
      ])
    })
  })

  describe('upgrade_doubleGlobal', () => {
    it('globalMultiplier increase to 2 from 1', () => {
      atomStore.globalMultiplier = 1
      expect(atomStore.globalMultiplier).toEqual(1)
      wrapper.vm.upgrade_doubleGlobal()

      expect(atomStore.globalMultiplier).toEqual(2)
    })
    it('globalMultiplier increase to 64 from 32', () => {
      atomStore.globalMultiplier = 32
      expect(atomStore.globalMultiplier).toEqual(32)
      wrapper.vm.upgrade_doubleGlobal()

      expect(atomStore.globalMultiplier).toEqual(64)
    })
  })
  describe('upgrade_increaseKeyStroke', () => {
    it('increase keyStrokeIncrement to 2 from 1', () => {
      atomStore.keyStrokeIncrement = 1
      expect(atomStore.keyStrokeIncrement).toEqual(1)
      wrapper.vm.upgrade_increaseKeyStroke()

      expect(atomStore.keyStrokeIncrement).toEqual(2)
    })
    it('increase keyStrokeIncrement to 1 from 0.5', () => {
      atomStore.keyStrokeIncrement = 0.5
      expect(atomStore.keyStrokeIncrement).toEqual(0.5)
      wrapper.vm.upgrade_increaseKeyStroke()

      expect(atomStore.keyStrokeIncrement).toEqual(1)
    })
  })
  describe('upgrade_unlockKeyStroke', () => {
    it('keyStrokeUnlocked to true', () => {
      atomStore.keyStrokeUnlocked = false
      expect(atomStore.keyStrokeUnlocked).toEqual(false)
      wrapper.vm.upgrade_unlockKeyStroke()

      expect(atomStore.keyStrokeUnlocked).toEqual(true)
    })
  })
  describe('upgrade_increaseClick', () => {
    it('increase clickIncrement to 2 from 1', () => {
      atomStore.clickIncrement = 1
      expect(atomStore.clickIncrement).toEqual(1)
      wrapper.vm.upgrade_increaseClick()

      expect(atomStore.clickIncrement).toEqual(2)
    })
    it('increase clickIncrement to 1 from 0.5', () => {
      atomStore.clickIncrement = 0.5
      expect(atomStore.clickIncrement).toEqual(0.5)
      wrapper.vm.upgrade_increaseClick()

      expect(atomStore.clickIncrement).toEqual(1)
    })
  })
  describe('upgrade_activateTenthClick', () => {
    it('switch tenthClickActivated to true', () => {
      atomStore.tenthClickActivated = false
      expect(atomStore.tenthClickActivated).toEqual(false)
      wrapper.vm.upgrade_activateTenthClick()

      expect(atomStore.tenthClickActivated).toEqual(true)
    })
    it('keep tenthClickActivated to true', () => {
      atomStore.tenthClickActivated = true
      expect(atomStore.tenthClickActivated).toEqual(true)
      wrapper.vm.upgrade_activateTenthClick()

      expect(atomStore.tenthClickActivated).toEqual(true)
    })
  })
  describe('upgrade_increaseTenthClick', () => {
    it('increase tenthClickIncrement to 2 from 1', () => {
      atomStore.tenthClickIncrement = 1
      expect(atomStore.tenthClickIncrement).toEqual(1)
      wrapper.vm.upgrade_increaseTenthClick()

      expect(atomStore.tenthClickIncrement).toEqual(2)
    })
    it('keep tenthClickIncrement to 1 from 0.5', () => {
      atomStore.tenthClickIncrement = 0.5
      expect(atomStore.tenthClickIncrement).toEqual(0.5)
      wrapper.vm.upgrade_increaseTenthClick()

      expect(atomStore.tenthClickIncrement).toEqual(1)
    })
  })
  describe('upgrade_activateTenthKeyStroke', () => {
    it('switch tenthKeyStrokeActivated to true', () => {
      atomStore.tenthKeyStrokeActivated = false
      expect(atomStore.tenthKeyStrokeActivated).toEqual(false)
      wrapper.vm.upgrade_activateTenthKeyStroke()

      expect(atomStore.tenthKeyStrokeActivated).toEqual(true)
    })
    it('keep tenthKeyStrokeActivated to true', () => {
      atomStore.tenthKeyStrokeActivated = true
      expect(atomStore.tenthKeyStrokeActivated).toEqual(true)
      wrapper.vm.upgrade_activateTenthKeyStroke()

      expect(atomStore.tenthKeyStrokeActivated).toEqual(true)
    })
  })
  describe('upgrade_increaseTenthKeyStroke', () => {
    it('increase tenthKeyStrokeIncrement to 2 from 1', () => {
      atomStore.tenthKeyStrokeIncrement = 1
      expect(atomStore.tenthKeyStrokeIncrement).toEqual(1)
      wrapper.vm.upgrade_increaseTenthKeyStroke()

      expect(atomStore.tenthKeyStrokeIncrement).toEqual(2)
    })
    it('keep tenthKeyStrokeIncrement to 1 from 0.5', () => {
      atomStore.tenthKeyStrokeIncrement = 0.5
      expect(atomStore.tenthKeyStrokeIncrement).toEqual(0.5)
      wrapper.vm.upgrade_increaseTenthKeyStroke()

      expect(atomStore.tenthKeyStrokeIncrement).toEqual(1)
    })
  })
  describe('upgrade_activateTenthTick', () => {
    it('switch tenthTickActivated to true', () => {
      atomStore.tenthTickActivated = false
      expect(atomStore.tenthTickActivated).toEqual(false)
      wrapper.vm.upgrade_activateTenthTick()

      expect(atomStore.tenthTickActivated).toEqual(true)
    })
    it('keep tenthTickActivated to true', () => {
      atomStore.tenthTickActivated = true
      expect(atomStore.tenthTickActivated).toEqual(true)
      wrapper.vm.upgrade_activateTenthTick()

      expect(atomStore.tenthTickActivated).toEqual(true)
    })
  })
  describe('upgrade_increaseTenthTick', () => {
    it('increase tenthTickIncrement to 2 from 1', () => {
      atomStore.tenthTickIncrement = 1
      expect(atomStore.tenthTickIncrement).toEqual(1)
      wrapper.vm.upgrade_increaseTenthTick()

      expect(atomStore.tenthTickIncrement).toEqual(2)
    })
    it('keep tenthTickIncrement to 1 from 0.5', () => {
      atomStore.tenthTickIncrement = 0.5
      expect(atomStore.tenthTickIncrement).toEqual(0.5)
      wrapper.vm.upgrade_increaseTenthTick()

      expect(atomStore.tenthTickIncrement).toEqual(1)
    })
  })
  describe('upgrade_increaseTick', () => {
    it('increase tickIncrement to 2 from 1', () => {
      atomStore.tickIncrement = 1
      expect(atomStore.tickIncrement).toEqual(1)
      wrapper.vm.upgrade_increaseTick()

      expect(atomStore.tickIncrement).toEqual(2)
    })
    it('increase tickIncrement to 1 from 0.5', () => {
      atomStore.tickIncrement = 0.5
      expect(atomStore.tickIncrement).toEqual(0.5)
      wrapper.vm.upgrade_increaseTick()

      expect(atomStore.tickIncrement).toEqual(1)
    })
  })
  describe('upgrade_activateTick', () => {
    it('switch tickActivated to true', () => {
      atomStore.tickActivated = false
      expect(atomStore.tickActivated).toEqual(false)
      wrapper.vm.upgrade_activateTick()
      expect(atomStore.tickActivated).toEqual(true)
    })
    it('keep tickActivated to true', () => {
      atomStore.tickActivated = true
      expect(atomStore.tickActivated).toEqual(true)
      wrapper.vm.upgrade_activateTick()
      expect(atomStore.tickActivated).toEqual(true)
    })
  })

  describe('isUnlocked', () => {
    it('is not unlocked when 157 needed and 145 obtained', () => {
      atomStore.proteinsNumber = 1
      const upgrade = { proteinsNeeded: 1 }

      expect(wrapper.vm.isUnlocked(upgrade)).toBe(true)
    })
    it('is not unlocked when 157 needed and 145 obtained', () => {
      atomStore.proteinsNumber = 145
      const upgrade = { proteinsNeeded: 157 }

      expect(wrapper.vm.isUnlocked(upgrade)).toBe(false)
    })
  })

  describe('getPercentForUpgrade', () => {
    it('is 0% when 0 protein, 0 atoms, and 10 proteins needed', () => {
      atomStore.proteinsNumber = 0
      atomStore.atomsNumber = 0
      atomStore.upgrades = [{ proteinsNeeded: 10 }]

      expect(wrapper.vm.getPercentForUpgrade(0)).toBe('0%')
    })
    it('is 11% when 1 protein, a few atoms, and 10 proteins needed', () => {
      atomStore.proteinsNumber = 1
      atomStore.atomsNumber = 23
      atomStore.upgrades = [{ proteinsNeeded: 10 }]

      expect(wrapper.vm.getPercentForUpgrade(0)).toBe('11%')
    })
    it('is empty when above protein level', () => {
      atomStore.proteinsNumber = 10
      atomStore.atomsNumber = 23
      atomStore.upgrades = [{ proteinsNeeded: 10 }]

      expect(wrapper.vm.getPercentForUpgrade(0)).toBe('')
    })
  })

  // DEBUG
  describe('resetAtoms', () => {
    it('reset atoms to 0', () => {
      atomStore.atomsNumber = 100
      expect(atomStore.atomsNumber).toEqual(100)
      wrapper.vm.resetAtoms()

      expect(atomStore.atomsNumber).toEqual(0)
    })
  })

})
