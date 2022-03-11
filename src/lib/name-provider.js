import { Chance } from 'chance'

export default class NameProvider {
  constructor(chanceProvider = new Chance()) {
    this.chanceProvider = chanceProvider
  }

  generate() {
    return this.chanceProvider.twitter()
  }
}
