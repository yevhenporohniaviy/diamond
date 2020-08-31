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
          <div class="col-12 ">

            <div class="label-date" @click="dialogData = true" >
              <img src="~assets/img/pick-data@2x.png" class="img-fluid" >

              <span class="data" v-if="!fieldStepSecond.date">Date</span>
              <span class="data is-select" v-else><img src="~assets/img/done-select.png" class="img-fluid">{{fieldStepSecond.date}}</span>
            </div>

            <el-dialog

              :visible.sync="dialogData"
              width="100%">
              <div class="select-data-content">
                <div class="icon-data py-4 d-flex justify-content-center align-items-center">
                    <img src="~assets/img/pick-data@2x.png" class="img-fluid" >
                  </div>

                  <div class="select-data">
                    <div v-for="(value, index) in list_date" :key="index">
                      <el-radio  v-model="fieldStepSecond.date" :label="value" >{{value}}</el-radio>
                    </div>
                  </div>
                <div class="button-save" @click="dialogData = false">
                  save
                </div>
              </div>
            </el-dialog>

          </div>
          <div class="col-12">
            <div class="label-time" @click="dialogTime = true" >
              <img src="~assets/img/pick-time@2x.png" class="img-fluid">
              <span class="time" v-if="!fieldStepSecond.time">Time</span>
              <span class="time is-select" v-else><img src="~assets/img/done-select.png" class="img-fluid">{{fieldStepSecond.time}}</span>
            </div>
            <el-dialog
              :visible.sync="dialogTime"
              width="100%">
              <div class="select-time-content">
                <div class="icon-time py-4 d-flex justify-content-center align-items-center">
                  <img src="~assets/img/pick-time@2x.png" class="img-fluid" >
                </div>
                <div class="select-data">
                  <div v-for="(value, index) in list_time" :key="index">
                    <el-radio  v-model="fieldStepSecond.time" :label="value" >{{value}}</el-radio>
                  </div>
                </div>
                <div class="button-save" @click="dialogTime = false">
                  save
                </div>
              </div>
            </el-dialog>


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
        dialogTime: false,
        dialogData: false,
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

        document.getElementById("app-step-6").style.display = "none";
        document.getElementById("app-step-7").style.display = "block";
        this.$scrollTo('#app-step-7', options)

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

          document.getElementById("app-step-6").style.display = "none";
          document.getElementById("app-step-7").style.display = "block";
          this.$scrollTo('#app-step-7', options)

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
