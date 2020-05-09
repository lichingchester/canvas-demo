<template>
  <div>
    <h1>C4D - ThreeJS</h1>
  </div>
</template>

<script>
// import three from 'three';

export default {
  mounted() {
    require('@/components/c4d/script.js');
    // require('@/components/c4d/gltf.js');
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
