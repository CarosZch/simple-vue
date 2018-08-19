class Vue{
  constructor(options){
    this.data = options.data
    let data = this.data
    // data   this.data
    observe(data, this)
    let id = options.el
    // 传入节点 Compile函数来编译
    let dom = new Compile(document.getElementById(id),this)
    document.getElementById(id).appendChild(dom)
  }
}
