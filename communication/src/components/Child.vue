<!-- child -->
<template>
  <div>
	<p>Child</p>
	<i>{{msg}}</i>
	<p>第一个插槽(default)</p>
	<slot></slot>
	<p>第二个插槽(name="second")</p>
	<slot name="second" :slotObj="slotObj"></slot>
  </div>
</template>

<script>
  export default {
	data() {
	  return {
	    msg: '子组件的msg在子组件的作用域',
	    slotObj: {
	      firstName: '张三',
		  lastName: '尼古拉斯'
		}
	  }
	}
  };
</script>

<style scoped>

</style>
