<template>
  <div>
    <section class="step-section d-flex justify-content-center align-items-center">
      <div class="container">
        <div class="row justify-content-center align-items-center" >

          <div class="col-md-8 col-12 text-center">

            <div class="step-title">{{step.title}}</div>
            <div class="step-subtitle" v-html="constructorTitle">

            </div>


            <div class="step-content">
              <div v-if="user_enquery === 'Finding an Engagement Ring'">
                <div v-if="step.content[0].content.element_type === 'select'" >
                  <el-select v-model="fieldStepSecond[step.content[0].content.alias]" placeholder="Select" popper-class="step3-select" >
                    <el-option
                      v-for="(value, index) in step.content[0].content.listItems.items"
                      :key="index"
                      :label="value"
                      :value="value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div v-else>
                <div v-if="step.content[1].content.element_type === 'select'" >
                  <el-select v-model="fieldStepSecond[step.content[1].content.alias]" placeholder="Select" popper-class="step3-select" >
                    <el-option
                      v-for="(value, index) in step.content[1].content.listItems.items"
                      :key="index"
                      :label="value"
                      :value="value">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>

            <div class="control-step">
              <button class="skip-step" @click="skipStep">skip</button>
              <button @click="sendData" class="next-step">next</button>
            </div>
          </div>
          <div class="dots-step d-flex justify-content-center align-items-center">
            <img src="~assets/img/stepdots3@3x.png" class="img-fluid" width="40%">
          </div>

        </div>
      </div>
    </section>
  </div>
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

    methods: {
      skipStep(){
        var options = {
          easing: 'ease-in',
          offset: 60
        }

        document.getElementById("step-appoint4").style.display = "block";
        this.$scrollTo('#step-appoint4', options)
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
            offset: 60
          }

          document.getElementById("step-appoint4").style.display = "block";
          this.$scrollTo('#step-appoint4', options)
          document.documentElement.style.overflow = 'hidden'
        }
      },
    },
    computed: {
      ...mapGetters(['user_enquery']),
      constructorTitle(){

        if( this.user_enquery === "Finding an Engagement Ring"){
          console.log(this.user_enquery);

          return this.step.subtitle
        }else{

          return this.step.description.replace("earrings", `${this.user_enquery}`.toLowerCase());
        }
      }

    },

  }
</script>
<style lang="scss">
  .dots-step{
    @media(max-width: 525px){
      display: none!important;
    }
  }</style>
