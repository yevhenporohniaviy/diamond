<template>
  <section class="step-section main">
    <div class="container">
    <div class="row justify-content-center">

      <div class="col-12 col-sm-10 col-md-12 col-lg-8">

        <form class="row " id="apptForm"   >
          <div class="col-12 col-md-12">

            <div v-for="(item, index) in step.content"
                  :key="index"
                  class="d-flex justify-content-center">
              <div class="input-form" v-if="item.content.element_type === 'input'">
                <div v-if="item.content.alias === 'email'">
                  <el-input
                    :id="item.content.alias"
                    v-model="fieldStepFirst[item.content.alias]"
                    :placeholder="item.content.placeholder"
                    :name="item.content.name"
                    type="email"
                    ref="email"
                    v-validate="'required|email'"/>
                </div>
                <div v-else-if="item.content.alias === 'confirm_email'">
                  <el-input
                    type="email"
                    :id="item.content.alias"
                    v-model="fieldStepFirst[item.content.alias]"
                    :placeholder="item.content.placeholder"
                    :name="item.content.name"
                    v-validate="'required|email|confirmed:email'"
                    :ref="item.content.alias"/>
                </div>
                <div v-else>

                  <el-input
                    :id="item.content.alias"
                    :name="item.content.name"
                    v-model="fieldStepFirst[item.content.alias]"
                    :placeholder="item.content.placeholder"
                    v-validate="item.content.element_require === 1 ? 'required' : ''">

                  </el-input>
                </div>

                <span v-show="errors.has(item.content.name)" class="form-control-feedback">
                  {{ errors.first(item.content.name) }}
                </span>
              </div>
              <div class="input-form-label " v-if="item.content.element_type === 'label'">
                <div class="required mb-3">
                  {{item.content.placeholder}}
                </div>
                <div  class="extra" v-if="item.content.alias === 'extra_comments'">
                  <img src="~assets/img/default/extra-comments.png" class="img-fluid mr-1"> {{item.content.placeholder}}
                </div>
                <!--<div  class="send" v-else>-->
                  <!--<button  class="send-btn">-->
                    <!--{{item.content.placeholder}}-->
                  <!--</button>-->
                <!--</div>-->
              </div>
              <div class="input-form-select" v-if="item.content.element_type === 'select'">
                <el-select v-model="fieldStepFirst[item.content.alias]"
                           :placeholder="item.content.placeholder"
                           :name="item.content.name"
                           :id="item.content.name"
                           v-validate="item.content.element_require === 1 ? 'required' : ''">
                  <el-option
                    v-for="value in item.content.listItems.items"
                    :key="value"
                    :label="value"
                    :value="value"
                    >
                  </el-option>
                </el-select>
                <span v-show="errors.has(item.content.name)" class="form-control-feedback">{{ errors.first(item.content.name) }}</span>

              </div>
              <div class="input-form-textarea" v-if="item.content.element_type === 'textarea'">
                <el-input

                  type="textarea"
                  :rows="6"
                  :placeholder="item.content.placeholder"
                  clearable
                  v-validate="item.content.element_require === 1 ? 'required' : ''"
                  :name="item.content.alias"
                  v-model="fieldStepFirst[item.content.alias]">
                </el-input>
                <span v-show="errors.has(item.content.alias)" class="form-control-feedback">{{ errors.first(item.content.alias) }}</span>

              </div>
            </div>

          </div>
        </form>
        <div class="control-step">
          <button class="cancel-step" @click='showCloseAppoint = !showCloseAppoint'>cancel</button>
          <button type="submit" @click.prevent="validateBeforeSubmit" class="next-step">next</button>
        </div>
      </div>
      <div class="dots-step d-flex justify-content-center align-items-center">
        <img src="~assets/img/stepdots1@3x.png" class="img-fluid" width="40%">
      </div>
    </div>


  </div>
    <el-dialog
      :visible.sync="showCloseAppoint"
      :show-close="false"
      custom-class="closeAppoint">
      <div class="content-modal-appoint-close">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8">
            <div class="title">LEAVE BOOKING PROCESS</div>
            <div class="description">
              Are you sure you want to leave the booking process?<br>
              Your booking details will not be saved.
            </div>
            <div class="group-btn-success">
              <button class="leave" @click="leave">yes, leave</button>
              <button class="stay" @click="stay">stay</button>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </section>
</template>


<script>



  export default {
    props: {
      step: Object,
    },
    data() {
      return {
        fieldStepFirst: {},
        showCloseAppoint: false,
      }
    },
    computed: {


    },
    methods:{
      setName(){
        const nameUser = this.fieldStepFirst.first_name;
        this.$store.dispatch('setNameUser', nameUser)
      },
      stay(){
        this.showCloseAppoint = false
      },
      leave(){
        this.$router.push({path: '/'})
      },
      sendData(){
        this.$emit('next', {step: this.step , data: this.fieldStepFirst })
        var options = {
          easing: 'ease-in',
        }

       document.getElementById("step-appoint2").style.display = "block";

        this.$scrollTo('#step-appoint2', options)
        document.documentElement.style.overflow = 'hidden'

      },
      validateBeforeSubmit(e) {
        let vm = this

        this.$validator.validateAll()

          .then(valid => {
            if(valid){
              this.sendData();
              this.setName();
            }
          }).catch(e => {
          return e;
        })
      },
    },

  }
</script>

<style lang="scss" >
  .dots-step{
    @media(max-width: 525px){
      display: none!important;
    }
  }
  .el-select-dropdown{
    .el-select-dropdown__item{
      color: #24354f;
      font-family: lato-reg;
      font-size: 14px;
      text-align: center;
    }
  }
  .closeAppoint{
    border-top:4px solid  #cae3f6;
    border-bottom:4px solid  #cae3f6;
    border-radius: 0;
    width: 50%;
    @media(max-width: 525px){
      width: 100%;
    }
    .el-dialog__header{

    }
    .el-dialog__body{
      padding: 0;
      .content-modal-appoint-close{
        .title{
          width: 300px;
          margin: 0 auto;
          color: #24354f;
          font-family: lato-bold;
          font-size: 14px;
          letter-spacing: 3.1px;
          line-height: 30px;
          text-transform: uppercase;
          padding: 15px;
          text-align: center;
          border-bottom: 1px solid #cae3f6;

        }
        .description{
          text-align: center;
          margin-top: 60px;
          margin-bottom: 55px;
          opacity: 0.7;
          color: #000000;
          font-family: lato-reg;
          font-size: 16px;
          letter-spacing: 0.67px;
          line-height: 24px;
        }
        .group-btn-success{
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;

          margin-bottom: 40px;
          .stay{
            width: 300px;
            height: 48px;
            border:1px solid #24354f;
            background-color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #24354f;
            font-family: lato-reg;
            font-size: 14px;
            letter-spacing: 1.17px;
            text-transform: uppercase;

          }
          .leave{
            margin-bottom: 20px;
            width: 300px;
            height: 48px;
            border:1px solid #24354f;
            background-color: #24354f;

            display: flex;
            justify-content: center;
            align-items: center;

            color: #fff;
            font-family: lato-reg;
            font-size: 14px;
            letter-spacing: 1.17px;
            text-transform: uppercase;
          }
        }
      }
    }

  }
</style>
