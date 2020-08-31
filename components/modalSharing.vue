<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="share-modal">
        <div class="share-modal__title">share to...</div>
        <div class="share-modal__social">
          <!-- Facebook Share -->
          <social-sharing :url="socialUrl" inline-template class="share-modal__social">
            <div>
              <network network="facebook" class="share-modal__social_item st-custom-button">
                Facebook
              </network>

              <network network="email" class="share-modal__social_item st-custom-button">
               Email
              </network>
              <network network="twitter" class="share-modal__social_item st-custom-button">
               Twitter
              </network>
              <network network="whatsapp" class="share-modal__social_item st-custom-button d-flex d-sm-none">
                 Whatsapp
              </network>
            </div>
          </social-sharing>

          <!-- Close Share Modal Button -->
          <button class="cancel-sharing" @click="close">Cancel</button>
        </div>
      </div>



    </div>
  </div>
</template>

<script>

  export default {
    props: ['data', 'type'],
    data(){
     return{
     }
    },
    components:{
    },
    methods:{
      close(){
        this.$emit('close-sharing', false)
      }
    },
    computed:{
      socialUrl(){
        switch (this.type) {
          case 'd':
            return this.baseUrl+'/diamonds-list/'+this.data
            break;
          case 'j':
            return this.baseUrl+'/categories/'+this.data
            break;
          case 'inst':
            return this.data
            break;
          default:
            return this.baseUrl+this.$route.path
            break;
        }
      }
    }
  }
</script>
