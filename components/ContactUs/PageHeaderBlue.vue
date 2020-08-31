<template>
  <div class="row acc-banner">
    <div class="banner-contact">
      <div class="title">{{widget.title}}</div>
      <div class="group-btn" v-if="$device.isDesktop">
        <a href="https://facebook.com" class="messenger"><img src="~assets/img/messenger-icon.svg" class="img-fluid"><span>Say Hi in Messenger</span></a>
        <nuxt-link to="/appt" class="appointment"><img src="~assets/img/Combined_Shape.svg"> <span>BOOK AN APPOINTMENT</span></nuxt-link>
      </div>
    </div>
  </div>
</template>


<script>

  export default {

    props: {
      widget: Object,
    },
    components: {

    },
    data() {
      return {


      }
    }
  }
</script>

