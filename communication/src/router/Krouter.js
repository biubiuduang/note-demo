// 作为一个插件存在:实现VueRouter类和install方法
// 实现两个全局组件:router-view用于显示匹配组件内容，
// router-link用于跳转 监控url变化:监听hashchange或popstate事件
// 响应最新url:创建一个响应式的属性current，当它改变时获取对应组件并显示
import render from "less/lib/less/render";
import Link from './krouter-link'
import View from './krouter-view'
import store from "../store";
let Vue;

class VueRouter{
  constructor(options){
    this.$options = options;
  
	/**
	 * 通过响应式的current 获取当前route.component
	 */
	//定义响应式的current属性，监听hashChange事件
    //current 应该是响应式的
	Vue.util.defineReactive(this,'current', '/')
	//定义响应式的属性current
	const initial = window.location.hash.slice(1) || '/'
	Vue.util.defineReactive(this,'current',initial)
	
	//监听hashchange
	window.addEventListener('hashchange',this.onHashChange.bind(this))
	window.addEventListener('load',this.onHashChange.bind(this))
 
	/**
	 * 为减少对routes的遍历，提前存储为对象，通过key去获取。
	 */
	this.routeMap = {};
	this.$options.routes.forEach(route => {
	  this.routeMap[route.path] = route;
	});
	
	
  }
  
  onHashChange() {
    this.current = window.location.hash.slice(1)
  }
}

VueRouter.install = function(_Vue) {
  Vue = _Vue;
  // 任务1:挂载$router 使用mixin延后当Vue装载完成后 注册 $router
  Vue.mixin({
	beforeCreate() {
	  if(this.$options.router){
		/**
		 * Vue.prototype.$router === router
		 * @type {VueRouter}
		 */
		Vue.prototype.$router = this.$options.router;
	  }
	}
  })
  // 任务2:实现两个全局组件router-link和router-view
  Vue.component('router-link',Link)
  Vue.component('router-view',View)
}

export default VueRouter;
