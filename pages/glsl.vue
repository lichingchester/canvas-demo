<template>
  <div id="container">
    <h1>GLSL - ThreeJS</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    require('@/components/glsl/script.js');
  }
};
</script>

<style lang="scss" scoped>
h1 {
  position: absolute;
  left: 15px;
  top: 15px;
  color: #fff;
}
</style>
