export default {
  render(h) {
     const {routeMap, current} = this.$router;
     let component = routeMap[current] ? routeMap[current].component : null;
     return h(component);
  }
}
