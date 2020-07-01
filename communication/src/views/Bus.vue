<template>
  <div>
  	<Bus1></Bus1>
	<Bus2></Bus2>
	<h1>event bus 基本实现</h1>
	<img src="../assets/bus.png" alt="">
  </div>
</template>

<script>
  import Bus1 from "../components/module/Bus1";
  import Bus2 from "../components/module/Bus2";
  export default {
	components: {
	  Bus1,
	  Bus2
	}
  };
</script>
