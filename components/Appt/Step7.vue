<template>
 <div>
   <section class="step-section d-flex justify-content-center align-items-center">
     <div class="container">
       <div class="row justify-content-center align-items-center" >
         <div class="col-md-8 col-12 text-center">

           <div class="row justify-content-center align-items-center">
             <div class="col-md-7 col-12 text-center">
               <div class="step-title">{{step.title}} <span >{{user_name}}</span></div>
               <div class="step-subtitle"> {{step.subtitle}}</div>
               <div class="step-description" v-html="step.description"></div>

             </div>
           </div>
           <div class="step-content">
             <div class="row justify-content-center align-items-center">
               <div class="col-12" >
                 <div class="row justify-content-center align-items-center" v-for="(item, index) in step.content"
                      :key="index">
                   <div class="input-form-textarea" v-if="item.content.element_type === 'textarea'">
                     <el-input

                       type="textarea"
                       :rows="8"
                       :placeholder="item.content.placeholder"
                       clearable
                       v-validate="item.content.element_require === 1 ? 'required' : ''"
                       :name="item.content.alias"
                       v-model="fieldStepSecond[item.content.alias]">
                     </el-input>
                     <span v-show="errors.has(item.content.alias)" class="form-control-feedback">{{ errors.first(item.content.alias) }}</span>

                   </div>
                 </div>
               </div>
             </div>
           </div>

           <div class="control-step">
             <button class="skip-step" @click="skipStep">skip</button>
             <button @click="sendData" class="next-step">finish</button>
           </div>
         </div>
         <div class="dots-step d-flex justify-content-center align-items-center">
           <img src="~assets/img/stepdots6@3x.png" class="img-fluid" width="40%">
         </div>


       </div>
     </div>
   </section>
 </div>
</template>



<script>

  import moment from 'moment'
  import {mapGetters} from "vuex";

  export default {
    props: {
      step: Object,
      data: Object,
    },
    data() {
      return {
        fieldStepSecond: {
        },

      }
    },
    computed: {
      ...mapGetters(['user_name']),
    },
    methods: {
      skipStep(){

        this.$emit('next', {step: this.step , data: this.fieldStepSecond })
        var options = {
          easing: 'ease-in',
        }
        document.getElementById("step-appoint1").style.display = "none";
        document.getElementById("step-appoint2").style.display = "none";
        document.getElementById("step-appoint3").style.display = "none";
        document.getElementById("step-appoint4").style.display = "none";
        document.getElementById("step-appoint5").style.display = "none";
        document.getElementById("step-appoint6").style.display = "none";
        document.getElementById("step-appoint7").style.display = "none";
        document.getElementById("finish-step").style.display = "block";
        this.$scrollTo('#finish-step', options)
        document.documentElement.style.overflow = 'auto'
      },

      sendData(){
        if(Object.entries(this.fieldStepSecond).length === 0 && this.fieldStepSecond.constructor === Object){
          this.$notify({
            title: 'Warning',
            message: 'Please, choose something',
            type: 'warning'
          });

        }else {
          this.$emit('next', {step: this.step, data: this.fieldStepSecond})
          var options = {
            easing: 'ease-in',
          }

          document.getElementById("step-appoint1").style.display = "none";
          document.getElementById("step-appoint2").style.display = "none";
          document.getElementById("step-appoint3").style.display = "none";
          document.getElementById("step-appoint4").style.display = "none";
          document.getElementById("step-appoint5").style.display = "none";
          document.getElementById("step-appoint6").style.display = "none";
          document.getElementById("step-appoint7").style.display = "none";
          document.getElementById("finish-step").style.display = "block";
          this.$scrollTo('#finish-step', options)

          document.documentElement.style.overflow = 'auto'
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
  .checked-datetime {
    margin-top: 25px;

    display: flex;
    justify-content: center;
    align-items: center;

    .el-checkbox__label {
      color: #24354f;
      font-family: lato-reg;
      font-size: 12px;
      letter-spacing: 1px;
    }

    .el-checkbox__input {
      top: 2px;
      &.is-checked{
        .el-checkbox__inner{
          background-color: #fff;
          &:after{
            border-color: #409EFF!important;
          }
        }
      }
    }

    &.is-checked {

      .el-checkbox__label {
        color: #24354f;
        font-family: lato-reg;
        font-size: 12px;
        letter-spacing: 1px;
      }
    }
  }
</style>
