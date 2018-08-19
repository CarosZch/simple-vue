class Compile {
  constructor(node, vm) {
    if (node) {
      // app this实例
      this.$frag = this.nodeToFragment(node, vm)
      return this.$frag
    }
  }
  nodeToFragment(node, vm) {
    const self = this
    let frag = document.createDocumentFragment()
    let child
    while (child = node.firstChild) {
      self.compileElement(child, vm)
      frag.append(child)
    }
    return frag
  }
  compileElement(node, vm) {
    const reg = /\{\{(.*)\}\}/
    const reg2 = /!?(\{\{(.*)\}\})/
    // 类型为元素
    if (node.nodeType === 1) {
      if (node.localName === 'input') {
        let attr = node.attributes
        for (let i = 0; i < attr.length; i++) {
          if (attr[i].nodeName === 'v-model') {
            let name = attr[i].nodeValue
            node.addEventListener('input', e => {
              vm[name] = e.target.value
            })
            new Watcher(vm, node, name, 'value')
          }
        }
      } else {
        if (reg.test(node.innerHTML)) {
          let name = RegExp.$1
          let data = vm.data[name]
          let str = node.innerHTML
          // str = str.replace(reg,data)
          new Watcher(vm, node, name, 'innerHTML', str)
        }
      }
      
    }
    if (node.nodeType === 3) {
      if (reg.test(node.nodeValue)) {
        let name = RegExp.$1
        name = name.trim()
          new Watcher(vm, node, name, 'nodeValue')
      }
    }
  }

}