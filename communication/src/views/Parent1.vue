<template>
  <div>
    <Child1 msg="msg from parent to child" @emitEvent="getFromChild"></Child1>
    <p>从child订阅的值：{{val}}</p>
  </div>
</template>
<script>
  import Child1 from "../components/module/Child1";
  export default {
    components: {
      Child1
    },
    data() {
      return {
        val : "",
      }
    },
    methods: {
      getFromChild(args){
        this.val = args;
      }
    }
  }
</script>
