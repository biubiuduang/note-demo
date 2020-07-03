/**
 * 创建响应式的state，保存mutations、actions和getters
 * 实现commit根据用户传入type执行对应mutation
 * 实现dispatch根据用户传入type执行对应action，同时传递上下文
 * 实现getters，按照getters定义对state做派生
 */
let Vue;

class Store {
  constructor(options = {}) {
	this._vm = new Vue ({
	  data: {
	    $$state: options.state
	  }
	});
	
	this._mutations = options.mutations || {}
	this._actions = options.actions || {}
	
	const store = this
	const {commit ,action} = store
	this.commit = function boundCommit(type, payload){
	  commit.call(store,type,payload)
	}
	this.action = function boundAction(type, payload){
	  action.call(store,type,payload)
	}
	
	// console.log(options.getters);
	
	//getters
	//1.遍历用户传入的getters所有的key，动态的赋值，其中是函数的执行结果
	//2.确保它是响应式的，Object.defineProperty(this.getters,key,{get(){}})
	//3.缓存结果 可以利用computed
	// this.getters = options.getters || {};
	// // this.getters.doubleCounter = options.getters.doubleCounter(store.state)
 	// var a = options.getters.doubleCounter(store.state);
	// Object.defineProperty(this.getters,'doubleCounter',{
	//   get(){
	//     return a;
	//   },
	//   set(val){
	//     a = options.getters.doubleCounter(store.state);
	//   	console.log(val);
	//   }
	// })
	// console.error(store._getters.doubleCount(store.state));
	// store._getters.doubleCount(store.state)
	
	this.getters = options.getters || {};
	// var val = options.getters.doubleCounter(store.state);
	// Object.defineProperty(this.getters,'doubleCounter',{
	//   get(){
	//     return val;
	//   }
	// })
	
  }
  get state(){
    return this._vm._data.$$state
  }
  
  set state(v){
	console.error('please use replaceState to reset state');
  }
  //实现commit
  commit(type, payload){
	const entry = this._mutations[type]
	if(!entry){
	  
	  console.error(`unknown mutation type: ${type}`);
	  return
	}
	entry(this.state, payload);
  }
  //实现 dispatch
  dispatch(type, payload) {
    const entry = this._actions[type]
	
	if(!entry){
	  console.error(`unknown action type: ${type}`);
	  return
	}
	
	return entry(this, payload)
  }
}

function install(_Vue){
  Vue = _Vue;
  
  Vue.mixin({
	beforeCreate() {
	  if (this.$options.store){
	    Vue.prototype.$store = this.$options.store;
	  }
	}
  })
}

export default { Store, install }
