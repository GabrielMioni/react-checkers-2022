export default class Counter {
  constructor () {
    this.count = 0
  }
  increment () {
    ++this.count
  }
  getCount () {
    return this.count
  }
}
