<template>
  <div id="app">
      <IndexFrame />    
  </div>
</template>

<script>
import IndexFrame from './components/IndexFrame.vue'

export default {
  name: 'app',
  components: {
    IndexFrame
  }
}
</script>

<style>
.ivu-layout-sider {
    height: 100vh;
}
</style>

