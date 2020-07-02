<template>
  <div>
  	<h2>Grandpa</h2>
	<hr/>
	<Parent msg="把这个消息传送给我孙子" other="这个消息也别用props传了"  @testOne="test1" @testTwo="test2"></Parent>
  </div>
</template>

<script>
  import Parent from "../components/grandpa/Parent"
  export default {
	components:{
	  Parent
	},
	methods: {
	  test1() {
		alert('grandpa 传给 孙子的 第一个事件！');
	  },
	  test2() {
		alert('grandpa 传给 孙子的 第二个事件！');
	  }
	},
  };
</script>
