<!-- parent -->
<template>
  <div class="home">
    <p>Home</p>
    <i>{{msg}}</i>
    <Child>
      <p>这是传给第一个插槽的内容</p>
      <p slot="second">这是传给第二个插槽的内容</p>
      <hr/>
      <template v-slot:second="slotProps">
        {{ slotProps.slotObj }}
      </template>
    </Child>
  </div>
</template>

<script>
import Child from "../components/Child"
export default {
  name: 'Home',
  components: {
    Child
  },
  data() {
    return {
      msg: '父组件的msg在父组件的作用域'
    }
  }
}
</script>
