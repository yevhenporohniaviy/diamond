<template>

    <div v-html="linkImg"></div>

</template>

<script>

  export default {

    props: {
      widget: Object,
    },
    computed: {
      linkImg(){

        let srt = this.widget.content_text;

        let rep_string  = srt.toString().replace( /\/storage/g, '');
        return rep_string
      }
    },
    data() {
      return {

      }
    }
  }
</script>

