<template>
  <div>
	<p>Bus2</p>
	<p>{{busVal}}</p>
  </div>
</template>

<script>
  export default {
	data() {
	  return {
		busVal: '2222'
	  };
	},
	mounted() {
	  this.$bus.$on('addBusVal',target=>{
		this.busVal = target
	  });
	}
  };
</script>
