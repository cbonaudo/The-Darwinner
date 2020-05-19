import { upgrades } from '@/data/upgradesAtoms'

const atomStore = { // default values
  atomsNumber: 0, // 0
  proteinsNumber: 0, // 0
  // Resources Multiplier
  globalMultiplier: 1, // 1
  clickIncrement: 1, // 1
  tickIncrement: 1, // 1
  tickActivated: false, // false
  keyStrokeIncrement: 0.5, // 0.5
  keyStrokeUnlocked: false, // false
  // Tenths
  tenthClick: 0, // 0
  tenthClickActivated: false, // false
  tenthClickIncrement: 1, // 1
  tenthKeyStroke: 0, // 0
  tenthKeyStrokeActivated: false, // false
  tenthKeyStrokeIncrement: 0.5, // 0.5
  tenthTick: 0, // 0
  tenthTickActivated: false, // false
  tenthTickIncrement: 1, // 1
  // Upgrades
  upgrades,
  upgradesBought: [] // []
}

export default atomStore
