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
                 <div class="row justify-content-center align-items-center">
                   <div class="col-1 text-right"></div>
                   <div class="col-5 text-right">
                     <div>
                       <label class="label-date">Date</label>
                       <!--<datepicker  v-model="fieldStepSecond.date"-->
                       <!--placeholder="Select"-->
                       <!--:format="customFormatter"  :disabled="fieldStepSecond.discuss">-->

                       <!--</datepicker>-->
                       <el-select v-model="fieldStepSecond.date" placeholder="Select" popper-class="step6-select-date" class="select-date" :disabled="fieldStepSecond.discuss">
                         <el-option
                           v-for="(value, index) in list_date"
                           :key="index"
                           :label="value"
                           :value="value">
                         </el-option>
                       </el-select>
                     </div>
                   </div>
                   <div class="col-1 text-center">
                     <div class="content-title text-uppercase">
                       at
                     </div>
                   </div>

                   <div class="col-4 text-left">
                     <label class="label-time">Time</label>
                     <el-select v-model="fieldStepSecond.time" placeholder="Select" class="select-time" popper-class="step6-select" :disabled="fieldStepSecond.discuss">
                       <el-option
                         v-for="(value, index) in list_time"
                         :key="index"
                         :label="value"
                         :value="value">
                       </el-option>
                     </el-select>
                   </div>
                 </div>
               </div>
               <div class="col-12">
                 <el-checkbox class="checked-datetime" v-model="fieldStepSecond.discuss" > Please contact me to discuss a time.</el-checkbox>

               </div>
             </div>
           </div>

           <div class="control-step">
             <button class="skip-step" @click="skipStep">skip</button>
             <button @click="sendData" class="next-step">next</button>
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
        list_date: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        list_time: [
          '9:00 AM - 10:00 AM',
          '10:00 AM - 11:00 AM',
          '11:00 AM - 12:00 PM',
          '1:00 PM - 2:00 PM',
          '2:00 PM - 3:00 PM',
          '3:00 PM - 4:00 PM',
          '4:00 PM - 5:00 PM',

        ]
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
        document.getElementById("step-appoint7").style.display = "block";
        this.$scrollTo('#step-appoint7', options)
        document.documentElement.style.overflow = 'hidden'
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
          document.getElementById("step-appoint7").style.display = "block";
          this.$scrollTo('#step-appoint7', options)

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
