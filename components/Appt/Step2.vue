<template>
  <div>
    <section class="step-section d-flex justify-content-center align-items-center">
      <div class="container">
        <div class="row justify-content-center align-items-center" >
          <div class="col-md-8 col-12 text-center">
            <div class="step-title">{{step.title}} <span >{{user_name}}</span></div>
            <div class="step-subtitle"> {{step.subtitle}}</div>
            <div class="step-description" v-html="step.description"></div>

            <div class="step-content">
              <div v-for="(item, index) in step.content"
                   :key="index">
                <div v-if="item.content.element_type === 'select'" >
                  <el-select v-model="fieldStepSecond[item.content.alias]" placeholder="Select" popper-class="step2-select">
                    <el-option
                      v-for="(value, index) in item.content.listItems.items"
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
            <img src="~assets/img/stepdots2@3x.png" class="img-fluid" width="40%">
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
        name: this.data.content.first_name || ''
      }
    },

    updated(){
      this.name = this.data.content.first_name
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

            }else{
              this.$emit('next', {step: this.step , data: this.fieldStepSecond })
              this.setEnquireStep();
              var options = {
                easing: 'ease-in',
                offset: 60
              }

              document.getElementById("step-appoint3").style.display = "block";
              this.$scrollTo('#step-appoint3', options)
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
  }</style>
