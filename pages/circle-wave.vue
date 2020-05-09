<template>
  <div class="page">
    <h1>Circle Wave - ThreeJS</h1>
    <canvas id="main"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    // eslint-disable-next-line nuxt/no-env-in-hooks
    if (process.client) {
      require('@/components/circle-wave/script.js');
      // require('@/components/c4d/gltf.js');
    }
  }
};
</script>

<style lang="scss" scoped>
// global
.page /deep/ {
  html,
  body {
    margin: 0;
    height: 100%;
  }
  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
}

h1 {
  position: absolute;
  left: 15px;
  top: 15px;
  color: #fff;
}
</style>
