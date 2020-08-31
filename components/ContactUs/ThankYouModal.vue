<template>
  <div>

    <el-dialog
      title=""
      :visible.sync="thankModal"
      center
      :show-close="false"
      custom-class="modalThx">
      <div class="container" >
        <div class="thxClose" @click="closeModal">
          <img src="~assets/img/default/close-save.png" class="img-fluid">
        </div>
       <div class="d-flex justify-content-center align-items-center flex-column">
         <div class="title-thank">{{widget.title}}</div>
         <div class="description-thank">{{widget.description}}</div>
       </div>


      </div>

    </el-dialog>
  </div>
</template>

<script>

  export default {
    props: {
      widget: Object,
      visible: Boolean
    },
    data() {
      return {
        thankModal: false,

      }
    },

    methods: {
      closeModal(){
        this.$emit('closeThxModal', false);
      }
    },
    mounted(){

    },
    watch: {
      visible(){
        this.thankModal = this.visible

      }
    }

  }
</script>
