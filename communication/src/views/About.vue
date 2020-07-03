<template>
  <div>
  	<p @click="$store.commit('add')">counter: {{$store.state.count}}</p>
	<p @click="$store.dispatch('add')">async counter: {{$store.state.count}}</p>
	<p>double : {{$store.getters.doubleCounter}}</p>
  </div>
</template>

