const obj = {};
function defineReactive(obj,key,val){
  Object.defineProperty(obj,key,{
    get() {
      console.log(`get ${key}:${val}`);
      return val
	},
	set(newVal){
	  console.log(`set ${key} : ${newVal}`);
      val = newVal
	}
  })
}

defineReactive(obj,'foo','foo');

obj.foo;

obj.foo = 'fooooo';
