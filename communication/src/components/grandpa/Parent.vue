<template>
  <div>
  	<h2>Parent</h2>
	<hr/>
	<Child v-bind="this.$attrs" v-on="this.$listeners"></Child>
  </div>
</template>

<script>
  import Child from "./Child";
  export default {
    provide() {
      return {
      	grandpa: 'this grandpa provide value!'
	  }
	},
	components: {
	  Child
	}
  };
</script>
