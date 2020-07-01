<template>
  <div>
	<h2>Child1.vue</h2>
	<p>props: {{msg}}</p>
	<input type="text" v-model="val" @input="handleInput">
  </div>
</template>
<script>
  export default {
    // props: ['msg'],
    props: {
      msg: {
        type: String,
		default: ''
	  }
	},
	data() {
	  return {
		val : "mounted init"
	  }
	},
	mounted() {
	  this.handleInput();
	},
	methods : {
	  handleInput () {
		this.$emit('emitEvent', this.val)
	  }
	}
  }
</script>
