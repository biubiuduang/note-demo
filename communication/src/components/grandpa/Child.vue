<template>
  <div>
  	<h2>Child</h2>
	<i style="color: red;">inject grandpa 提供的内容： {{grandpa}}</i>
	<p>这个是爷爷传给孙子的信息($attrs)：<i>{{$attrs}}</i></p>
	<button @click="childOne">执行grandpa的test1()</button>
	<button @click="$listeners.testTwo()">执行grandpa的test2()</button>
	<button @click="$emit('testOne')">执行grandpa的test1()</button>
  </div>
</template>

<script>
  export default {
    // inject: ['grandpa']
    inject: {
      grandpa: {
        type: String,
		default: ''
	  }
	},
	methods: {
	  childOne() {
		this.$listeners.testOne();
	  }
	}
  };
</script>
