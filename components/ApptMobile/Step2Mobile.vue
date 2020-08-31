<template>

  <section>
    <div class="row justify-content-center align-items-center flex-column">
      <div class="col-12">
        <div class="progress-moblie-app">
          <img src="~assets/img/mobile-app-pro-steps2.png" class="img-fluid">
        </div>
      </div>
      <div class="col-7">
        <div class="head-app-step">
          <div class="step-title">{{step.title}} <span>{{user_name}}</span></div>
          <div class="step-subtitle"> {{step.subtitle}}</div>
          <div class="step-description" v-html="step.description"></div>
        </div>
      </div>
      <div class="col-12">
        <div class="step-content">
          <div v-for="(item, index) in step.content" :key="index" >
            <div v-if="item.content.element_type === 'select'"  class="select-data">
              <div v-for="(value, index) in item.content.listItems.items" :key="index">
                <el-radio  v-model="fieldStepSecond[item.content.alias]" :label="value" >{{value}}</el-radio>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mobile-app-control">
        <button class="cancel-step" @click="skipStep">skip</button>
        <button type="submit" @click="sendData" class="next-step">next</button>
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
      setEnquireStep(){

        const enquireAbout = this.fieldStepSecond.enquire_about;
        this.$store.dispatch('setEnquireAbout', enquireAbout)
      },
      skipStep(){
        var options = {
          easing: 'ease-in',
        }
        document.getElementById("app-step-2").style.display = "none";
        document.getElementById("app-step-4").style.display = "block";
        this.$scrollTo('#app-step-4', options)
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
          this.setEnquireStep();
          var options = {
            easing: 'ease-in',
          }
          document.getElementById("app-step-2").style.display = "none";
          document.getElementById("app-step-3").style.display = "block";
          this.$scrollTo('#app-step-3', options)
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
  }</style>
