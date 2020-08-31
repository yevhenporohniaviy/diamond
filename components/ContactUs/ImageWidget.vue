<template>
  <div v-if="widget.content">
    <a :href="widget.content.url" target="_blank" v-if="widget.content.url">
      <img :type="widget.content.type" :src="baseUrl + widget.content.image" class="img-fluid float-right">
    </a>
    <img :type="widget.content.type" :src="baseUrl + widget.content.image" class="img-fluid " v-else>
  </div>
</template>

<script>

  export default {
    props: {
      widget: Object,
    },
    data() {
      return {
      };
    }
  }
</script>
