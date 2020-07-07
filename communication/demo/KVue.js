//数据响应式
function defineReactive(obj,key,val){
  //递归处理
  observe(val);
  //创建一个Dep实例
  const dep = new Dep();
  Object.defineProperty(obj,key, {
	get() {
	  Dep.target && dep.addDep(Dep.target);
	  return val;
	},
	set(v) {
	  if(v!==val){
		observe(v);
		val = v;
		
		//通知更新
		dep.notify()
	  }
	}
  })
}

//使得一个对象所有属性都被拦截
function observe(obj){
  if (typeof obj !== "object" || obj == null) {
    return
  }
  new Observer(obj)
}
//代理data中数据
function proxy(vm) {
  Object.keys(vm.$data).forEach(key =>{
	Object.defineProperty(vm,key,{
	  get() {
		return vm.$data[key];
	  },
	  set(v) {
		vm.$data[key] = v;
	  }
	})
  })
}

// KVue
// 1.响应式操作
class KVue {
  constructor(options){
    this.$options = options;
    this.$data = options.data;
    this.$methods = options.methods;
    
    observe(this.$data);
    //代理
    proxy(this);
    
  	new Compiler('#app',this);
  }
}
//做数据响应化
class Observer {
  constructor(value){
	this.value = value;
	this.walk(value);
  }
  walk(obj){
	Object.keys(obj).forEach(key=>{
	  defineReactive(obj,key,obj[key])
	})
  }
}

// Compiler: 解析模版，找到依赖，并和当前拦截的属性关联起来
// new Compiler('#app',vm)
class Compiler {
  constructor(el,vm){
    this.$vm = vm;
    this.$el = document.querySelector(el);
    
    //执行编译
	this.compile(this.$el);
  }
  compile(el) {
	const childNodes = el.childNodes;
	Array.from(childNodes).forEach(node => {
	  //1.如果节点是一个元素
	  if (node.nodeType === 1){
		console.log('编译元素', node.nodeName);
		this.compileElement(node);
	  } else if (this.isInter(node)) { //2.如果节点是插值文本{{}}
	    console.log('编译文本',node.textContent);
	    this.compileText(node);
	  }
	  //3.如果节点存在子节点
	  if(node.childNodes) {
	    this.compile(node)
	  }
	})
  }
  isInter(node){
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }
  compileElement(node){
    //处理元素上面的属性，典型的是 k- ，@开头的
  	const attrs = node.attributes;
  	Array.from(attrs).forEach(attr=>{
  	  const attrName = attr.name;
  	  const exp = attr.value;
  	  if(attrName.indexOf('k-') === 0){
  	    //截取指令名称
  	    const dir = attrName.substring(2);
  	    this[dir] && this[dir](node,exp)
	  }
  	  //事件处理
	  if (attrName.startsWith('@')){
	    const event = attrName.substring(1);
	    this.bindEvent(node,event,exp,this.$vm)
	  }
	})
  }
  //暗号：冬瓜冬瓜我是西瓜
  bindEvent(node, event, exp, vm) {
    console.log(vm.$methods);
	node.addEventListener(event,vm.$methods[exp].bind(vm));
  }
  
  
  text(node,exp) {
    this.update(node,exp,'text');
  }
  html(node,exp) {
    this.update(node,exp,'html');
  }
  
  compileText(node){
  	this.update(node,RegExp.$1,'text');
  }
  update(node,exp,dir){
    //初始化
    const fn = this[dir+'Updater'];
    fn && fn(node,this.$vm[exp]);
    
    //更新，创建要给Watcher实例
	new Watcher(this.$vm,exp,val=>{
	  fn && fn(node,val)
	})
  }
  
  textUpdater(node,val){
    node.textContent = val;
  }
  htmlUpdater(node,val){
    node.innerHTML = val;
  }
}

// 管理一个依赖，未来执行更新
class Watcher {
  constructor(vm,key,undateFn) {
	this.vm = vm;
	this.key = key;
	this.updateFn = undateFn;
	
	// 读一下当前key，触发依赖收集
	Dep.target = this;
	vm[key];
	Dep.target = null
  }
  // 未来会被dep调用
  update() {
    this.updateFn.call(this.vm,this.vm[this.key]);
  }
}

//Dep: 保存所有watcher 实例，当某个key发生变化，通知他们执行更新
class Dep {
  constructor(){
    this.deps = [];
  }
  addDep(watcher){
    this.deps.push(watcher)
  }
  notify(){
    this.deps.forEach(dep=>{
      dep.update();
	})
  }
}
