function defineReactive(obj,key,val){
  observe(val);
  Object.defineProperty(obj,key,{
	get() {
	  console.log(`get ${key}:${typeof val === "object" ? JSON.stringify(val) : val}`);
	  return val
	},
	set(newVal){
	  console.log(`set ${key} : ${newVal}`);
	  if(newVal !== val){
		observe(newVal); //新值是对象的情况
		val = newVal;
		undate();
	  }
	}
  })
}
function undate(){
  app.innerText = obj.foo
}
function observe(obj){
  if(typeof obj !== "object" || obj == null){
	return
  }
  Object.keys(obj).forEach(key=>{
	defineReactive(obj,key,obj[key])
  })
}

function set(obj,key,val){
  defineReactive(obj,key,val)
}
const obj = {foo: 'foo',bar : 'bar',a : {b: 1} };
observe(obj);



const one = {data: {
  	a: 1,
	b: 2,
  }
}

function proxy(obj){
	Object.keys(obj.data).forEach(key=>{
	  Object.defineProperty(obj,key,{
	    get() {
	      return obj.data[key]
		},
		set(v) {
	      obj.data[key] = v;
		}
	  })
	})
}

proxy(one);
console.log(one.data.a === one.a);

