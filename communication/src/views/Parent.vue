<!-- Parent.vue -->
<template>
  <div>
  	<p>Parent</p>
	<button @click="getChildVal">获取子传给父的值(this.$children[0].toParent)</button><br/>
	<p v-if="childVal">{{childVal}}</p>
	<button @click="getChildByRefs">获取子传给父的值(this.$refs.child1.toParentRefs)</button><br/>
	<p v-if="childRefsVal">{{childRefsVal}}</p>
	<p>----------------------------------</p>
	<Child ref="child1"></Child>
  </div>
</template>

<script>
  import Child from "../components/Child";
  export default {
	components: {
	  Child
	},
	data() {
	  return {
		childVal: '',
		childRefsVal: ''
	  };
	},
	methods: {
	  handleParent() {
		return "event for parent!";
	  },
	  getChildVal() {
	    //children 是一个数组， 对于异步子组件或者按需加载子组件 children的下标 有可能不准
	    this.childVal = this.$children[0].toParent();
	  },
	  getChildByRefs() {
	    this.childRefsVal = this.$refs.child1.toParentRefs();
	  }
	},
  };
</script>
