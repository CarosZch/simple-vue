class Watcher {
  constructor(vm, node, name, type, str) {
    Dep.target = this
    this.reg = /\{\{(.*)\}\}/
    this.name = name
    this.node = node
    this.vm = vm
    this.type = type
    this.str = str
    this.update()
    Dep.target = null
  }
  update () {
    this.get()
    if (this.str) {
      this.value = this.str.replace(this.reg, this.value)
      this.node[this.type] = this.value
    } else {
      this.node[this.type] = this.value
    }
  }
  get () {
    this.value = this.vm[this.name]
  }
}