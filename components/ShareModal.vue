<template>
  <div class="share-modal js-share-modal" v-show="showModal">
    <div class="share-modal__wrapper" :class="noneBorder">
      <div class="share-modal__title">share to...</div>
      <div class="share-modal__social">
        <!-- Facebook Share -->
        <button
          class="share-modal__social_item st-custom-button"
          data-network="facebook"
          :data-url="shareUrl">
          Facebook
        </button>
        <!-- Instagram Share -->
        <button
          class="share-modal__social_item st-custom-button"
          data-network="instapaper"
          :data-url="shareUrl">
          Instagram
        </button>
        <!-- Twitter Share -->
        <button
          class="share-modal__social_item st-custom-button"
          data-network="twitter"
          :data-url="shareUrl">
          Twitter
        </button>
        <!-- Email Share -->
        <button
          class="share-modal__social_item st-custom-button"
          data-network="email"
          :data-url="shareUrl">
          Email
        </button>
        <!-- WhatsApp Share -->
        <button
          v-if="showShareModalWhatsapp"
          class="share-modal__social_item st-custom-button"
          data-network="whatsapp"
          :data-url="shareUrl">
          WhatsApp
        </button>
        <!-- Close Share Modal Button -->
        <button class="share-modal__social_item share-modal__cancel" @click="closeShareModal">Cancel</button>
      </div>
    </div>
    <!-- Import Sharethis Library -->
    <!-- <script type="text/javascript" src="https://platform-api.sharethis.com/js/sharethis.js#property=5e6a0dec7dbd790012fb1c91&product=inline-share-buttons" async="async"></script>
    <script type="text/javascript" src="//platform-api.sharethis.com/js/sharethis.js#property=#{property?._id}&product=custom-share-buttons"></script> -->
  </div>
</template>

<script>

export default {

  name: 'ShareModal',
  props: {
    showShareModal: {
      type: Boolean,
      required: true
    },
    borderNone: {
      type: Boolean,
      required: false
    }
  },
  head: {
    script: [
      // Import Sharethis Library
      { src: 'https://platform-api.sharethis.com/js/sharethis.js#property=5e6a0dec7dbd790012fb1c91&product=inline-share-buttons' },
      { src: '//platform-api.sharethis.com/js/sharethis.js#property=#{property?._id}&product=custom-share-buttons' }
    ]
  },
  data(){
    return{
      showModal: false,
      shareUrl: '/',
      showShareModalWhatsapp: false,
      noneBorder: ''
    }
  },
  methods: {
    // Close Share Modal (With Animation)
    closeShareModal(){
      this.showModal = !this.showModal
      this.$emit('showShareModalValue', false)
    },
    checkUrl() {
      if(sessionStorage.getItem('shareUrl')) {
        this.shareUrl = window.location.origin + '/' + sessionStorage.getItem('shareUrl');
      } else {
        this.shareUrl = window.location.origin;
      }
    }
  },

  beforeUpdate() {
    this.checkUrl();
  },
  mounted() {
    // Check Client Width & Show WhatsApp If Need
    if(document.documentElement.clientWidth < 1024) {
      this.showShareModalWhatsapp = true;
    }
    if(this.borderNone) {
      this.noneBorder = 'share-modal__wrapper--border-none'
    }
  },
  watch: {
    showShareModal() {
      this.showModal = this.showShareModal;
    }
  }
}
</script>


