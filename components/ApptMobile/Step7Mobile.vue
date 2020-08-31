<template>
  <section>
    <div class="row justify-content-center align-items-center flex-column">
      <div class="col-12">
        <div class="progress-moblie-app">
          <img src="~assets/img/mobile-app-pro-steps6.png" class="img-fluid">
        </div>
      </div>
      <div class="col-8">
        <div class="head-app-step">
          <div class="step-title">{{step.title}} <span >{{user_name}}</span></div>
          <div class="step-subtitle"> {{step.subtitle}}</div>
          <div class="step-description" v-html="step.description"></div>
        </div>
      </div>
      <div class="col-12">
        <div class="step-content">
          <div class="row justify-content-center align-items-center" v-for="(item, index) in step.content"
               :key="index">
            <div class="input-form-textarea" v-if="item.content.element_type === 'textarea'">
              <el-input
                type="textarea"
                :rows="10"
                :placeholder="item.content.placeholder"
                clearable
                :name="item.content.alias"
                v-model="fieldStepSecond[item.content.alias]">
              </el-input>

            </div>
          </div>

        </div>
      </div>
      <div class="mobile-app-control">
        <button class="cancel-step" @click="skipStep">skip</button>
        <button type="submit" @click="sendData" class="next-step">finish</button>
      </div>
    </div>
  </section>
</template>



<script>


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
        document.getElementById("app-step-1").style.display = "none";
        document.getElementById("app-step-2").style.display = "none";
        document.getElementById("app-step-3").style.display = "none";
        document.getElementById("app-step-4").style.display = "none";
        document.getElementById("app-step-5").style.display = "none";
        document.getElementById("app-step-6").style.display = "none";
        document.getElementById("app-step-7").style.display = "none";
        document.getElementById("app-step-finish").style.display = "block";
        this.$scrollTo('#app-step-finish', options)
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
          document.getElementById("app-step-1").style.display = "none";
          document.getElementById("app-step-2").style.display = "none";
          document.getElementById("app-step-3").style.display = "none";
          document.getElementById("app-step-4").style.display = "none";
          document.getElementById("app-step-5").style.display = "none";
          document.getElementById("app-step-6").style.display = "none";
          document.getElementById("app-step-7").style.display = "none";
          document.getElementById("app-step-finish").style.display = "block";
          this.$scrollTo('#app-step-finish', options)

          document.documentElement.style.overflow = 'auto'
        }
      },
    }
  }
</script>

<style lang="scss">

  .select-data-content,
  .select-time-content{
    position: relative;
    .icon-data,
    .icon-time,{
      border-bottom: 1px solid #cae3f6;
    }
    .button-save{
      position: absolute;
      bottom: -10px;
      width: 100%;
      height: 50px;
      background-color: #24354f;
      color: #ffffff;
      font-family: lato-bold;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1.2px;
      line-height: 18px;
      text-transform: uppercase;
      display: flex;
      justify-content: center;
      align-items: center;

    }
  }
</style>
