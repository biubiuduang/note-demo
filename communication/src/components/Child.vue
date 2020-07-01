<template>
  <div>
  	<p>Child</p>
	<button @click="getParent">执行父组件方法(this.$parent.handleParent())</button><br/>
	<p v-if="parent">父组件方法的返回值 ： {{parent}}</p>
	<button @click="getRoot">执行根组件方法(this.$root.handleRoot())</button>
	<p v-if="parent">根组件方法的返回值 ： {{root}}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        parent: '',
		root: ''
	  }
	},
	methods: {
	  getParent() {
		this.parent = this.$parent.handleParent();
	  },
	  getRoot() {
	    console.log(this.$root);
	    this.root = this.$root.handleRoot();
	  },
	  toParent() {
	    return 'children value to parent'
	  }
	},
  };
</script>

