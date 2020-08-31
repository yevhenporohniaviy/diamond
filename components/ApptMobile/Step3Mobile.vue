<template>

  <section>
    <div class="row justify-content-center align-items-center flex-column">
      <div class="col-12">
        <div class="progress-moblie-app">
          <img src="~assets/img/mobile-app-pro-steps3.png" class="img-fluid">
        </div>
      </div>
      <div class="col-8">
        <div class="head-app-step">
          <div class="step-title">{{step.title}}</div>
          <div class="step-subtitle" v-html="constructorTitle">

          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="step-content">
          <div v-if="user_enquery === 'Finding an Engagement Ring'">
            <div v-if="step.content[0].content.element_type === 'select'"  class="select-data">
              <div v-for="(value, index) in step.content[0].content.listItems.items" :key="index">
                <el-radio  v-model="fieldStepSecond[step.content[0].content.alias]" :label="value" >{{value}}</el-radio>
              </div>
            </div>
          </div>
          <div v-else>
            <div v-if="step.content[1].content.element_type === 'select'"  class="select-data">
              <div v-for="(value, index) in step.content[1].content.listItems.items" :key="index">
                <el-radio  v-model="fieldStepSecond[step.content[1].content.alias]" :label="value" >{{value}}</el-radio>
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
        }
      }
    },
    computed: {
      ...mapGetters(['user_enquery']),
      constructorTitle(){

        if( this.user_enquery === "Finding an Engagement Ring"){

          return this.step.subtitle
        }else{

          return this.step.description.replace("earrings", `${this.user_enquery}`.toLowerCase());
        }
      }

    },
    methods: {
      skipStep(){
        var options = {
          easing: 'ease-in',
        }
        document.getElementById("app-step-3").style.display = "none";
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

        }else{
        this.$emit('next', {step: this.step , data: this.fieldStepSecond })
        var options = {
          easing: 'ease-in',
        }
        document.getElementById("app-step-3").style.display = "none";
        document.getElementById("app-step-4").style.display = "block";
        this.$scrollTo('#app-step-4', options)
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
