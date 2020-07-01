<template>
  <div>
	<p>Bus1</p>
	<input type="text" v-model="inputVal" />
	<button @click="handleAddBusVal">Bus1发布</button>
  </div>
</template>

<script>
  export default {
    mounted(){
	  this.$nextTick(()=>{
	    this.handleAddBusVal();
	  })
	},
	data() {
      return {
        inputVal: 'Event Bus1 message to Bus2'
	  }
	},
	methods: {
	  handleAddBusVal() {
		this.$bus.$emit('addBusVal',this.inputVal);
	  }
	},
  };
</script>

