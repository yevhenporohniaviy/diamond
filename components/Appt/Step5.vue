
<template>
 <div>
   <section class="step-section d-flex justify-content-center align-items-center">
     <div class="container">
       <div class="row justify-content-center align-items-center" >
         <div class="col-md-8 col-12 text-center">

           <div class="step-title">{{step.title}}</div>
           <div class="step-subtitle"> {{step.subtitle}}</div>
           <div class="step-description" v-html="step.description"></div>

           <div class="step-content">
             <div v-for="(item, index) in step.content"
                  :key="index">

               <div v-if="item.content.element_type === 'loader'" >
                 <el-upload
                   action=""
                   multiple
                   :on-remove="handleRemove"
                   :on-success="checkImage"
                   list-type="picture-card">
                   <span>{{item.content.placeholder}}</span>
                 </el-upload>
                 <el-dialog :visible.sync="dialogVisible">
                   <img width="100%" :src="dialogImageUrl" alt="">
                 </el-dialog>
               </div>
               <div v-if="item.content.element_type === 'label'" >

               </div>
             </div>
           </div>

           <div class="control-step">
             <button class="skip-step" @click="skipStep">skip</button>
             <button @click="sendData" class="next-step">next</button>
           </div>
         </div>
         <div class="dots-step d-flex justify-content-center align-items-center">
           <img src="~assets/img/stepdots5@3x.png" class="img-fluid" width="40%">
         </div>

       </div>
     </div>
   </section>
 </div>
</template>


<script>


  export default {
    props: {
      step: Object,
      data: Object,
    },
    data() {
      return {
        fieldStepSecond: {
        },
        dialogImageUrl: '',
        listImages: [],
        dialogVisible: false,
      }
    },
    computed: {

    },
    methods: {
      skipStep(){
        var options = {
          easing: 'ease-in',
          offset: 60
        }

        document.getElementById("step-appoint6").style.display = "block";
        this.$scrollTo('#step-appoint6', options)
        document.documentElement.style.overflow = 'hidden'
      },
      handleRemove(file){
        let index = this.listImages.indexOf(file);
        if (index > -1) {
          this.listImages.splice(index, 1);
        }
      },
      checkImage(response, image){
        this.listImages.push(image.response)
      },
      sendData(){
        if(Object.entries(this.listImages).length === 0 && this.listImages.constructor === Object){
          this.$notify({
            title: 'Warning',
            message: 'Please, choose something',
            type: 'warning'
          });

        }else {
          this.$emit('next', {step: this.step, data: this.listImages})
          var options = {
            easing: 'ease-in',
            offset: 60
          }

          document.getElementById("step-appoint6").style.display = "block";
          this.$scrollTo('#step-appoint6', options)
          document.documentElement.style.overflow = 'hidden'
        }
      },
    }
  }
</script>
<style lang="scss">
  .dots-step{
    @media(max-width: 525px){
      display: none!important;
    }
  }
  .el-progress-circle .el-progress-circle__path {
    stroke: rgb(36, 53, 79);
  }
  .el-upload-list--picture-card .el-upload-list__item-thumbnail{
    object-fit: contain;
  }
  .el-upload-list--picture-card .el-upload-list__item-status-label{
    background: rgb(36, 53, 79);
  }
</style>
