const defineReactive = (obj, key, val) => {
  let dep = new Dep()
  Object.defineProperty(obj, key, {
    get: () => {
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return val
    },
    set: newVal => {
      if (newVal === val) return
      val = newVal
      dep.notify()
    }
  })
}
const observe = (obj, vm) => {
  Object.keys(obj).forEach(key => {
    defineReactive(vm, key, obj[key])
  });
}