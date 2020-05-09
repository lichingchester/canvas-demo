<template>
  <div>
    <h1>test</h1>

    <client-only>
      <FSS
        type="webgl"
        :mesh="{
          ambient: '#f0f0f0',
          diffuse: '#ffffff',
          depth: '14',
          segments: '4',
          slices: '4',
          xRange: '0.15',
          yRange: '0.35',
          speed: '0.0008'
        }"
        :light="{
          ambient: '#ffffff',
          diffuse: '#ffffff',
          count: '1',
          zOffset: '0'
        }"
        width="100%"
        height="100%"
      />
    </client-only>
  </div>
</template>

<script>
import FSS from '@/components/FSS.vue';

export default {
  components: {
    FSS
  }
};
</script>
