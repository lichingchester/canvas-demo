<template>
  <div class="py-5">
    <div class="container">
      <h1>three.js</h1>

      <hr />

      <div class="lead">Page List</div>

      <div class="list-group my-5">
        <a
          v-for="(item, index) in $router.options.routes"
          :key="index"
          :href="item.path"
          class="list-group-item list-group-item-action"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {}
};
</script>
