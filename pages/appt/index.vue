<template>
  <div>
    <div v-if="$device.isDesktop">
      <div class="container" >
        <div class="row acc-banner" id="header-appoint">
          <div class="banner">
            <div class="title">{{header.title ? header.title : 'Helloa '}}</div>
            <div class="group-btn-faq appt-btn" >
              <div class="info w-75 mb-3"
                   v-html="header.description ? header.description : 'To book an appointment we would like to understand a little about you and what you need.'">
              </div>
              <a href="https://www.facebook.com/"
                 class="message ">
                <img src="~assets/img/messenger-icon.svg" class="img-fluid">
                <span>Talk to us in Messenger</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div v-for="step in steps" :key="step.id" >
          <component v-bind:is="`Step${step.id}`" :step="step" :data.sync="appoint_data" @next="fetchData" :id="`step-appoint${step.id}`" >
          </component>
        </div>

        <div class="container-fluid confirmed-appt" id="finish-step">
          <div class="row justify-content-center align-items-center" style="  min-height: 100vh;">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-md-6 col-12">
                  <div class="confirm-icon d-flex justify-content-center mb-4">
                    <img src="~assets/img/confirm.png" class="img-fluid">
                  </div>
                  <div class="confirm-main-title text-center">
                    Your appointment is confirmed and we have emailed you the details.
                    <br>We look forward to seeing you!
                  </div>
                </div>
                <div class="col-12">
                  <div class="row justify-content-center">
                    <div class="col-md-6 col-12">
                      <div class="row justify-content-center">
                        <div class="col-md-9 col-12">
                          <div class="confirm-info text-center mb-5">
                            Create an account to complete the
                            <br>Diamond Emporium experience!
                          </div>
                          <div class="d-flex justify-content-between">
                            <img src="~assets/img/default/conf1.png" class="img-fluid">
                            <img src="~assets/img/default/conf2.png" class="img-fluid">
                            <img src="~assets/img/default/conf3.png" class="img-fluid">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 col-12">
                      <div class="row justify-content-center align-items-center">
                        <div class="col-9">
                          <div class="box-registration py-5">

                            <div class="row justify-content-center mb-5">
                              <div class="col-8 p-0">
                                <div class="group-btn-login">
                                  <div class="facebook-login" @click="loginFacebook">
                                    <img src="~assets/img/facebook.png" class="img-fluid">
                                    <span>LOGIN WITH FACEBOOK</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="row justify-content-center">
                              <div class="col-8">
                                <div class="text-center w-100">
                                  <img src="~assets/img/line.png" class="text-center w-100">
                                </div>
                                <form id="profileForm" @submit.prevent="login">
                                  <div class="input-group">

                                    <el-input

                                      v-model="form.email"
                                      placeholder="Email address"
                                      type="email"/>
                                  </div>
                                  <div class="input-group">
                                    <el-input
                                      v-model="form.password"
                                      placeholder="Password"
                                      type="password"/>
                                  </div>

                                  <button type="submit" class="login">
                                    login
                                  </button>
                                </form>
                                <div class="box-registration-control">
                                  <div class="d-flex">
                                    <div class="col-md-6 col-12">
                                      <div class="d-flex">

                                          <nuxt-link class="no-login"  :to="{name: 'appt-success', params: { data: this.appoint_data.content } }">
                                          NO THANK YOU
                                        </nuxt-link>
                                      </div>
                                    </div>
                                    <div class="col-md-6 col-12 p-0">
                                      <div class="d-flex">
                                        <button type="submit" class="registr" >
                                          <nuxt-link :to="{name: 'auth-register', params: { data: this.appoint_data.content } }">
                                                     CREATE ACCOUNT</nuxt-link>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>


                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div v-else>
      <div class="container-fluid" >
        <div class="row">
          <div class="mobile-app">
            <div id="app-step-start">
              <div class="content">
                <img src="~assets/img/mobile-app-logo.png" class="img-fluid emblem-app">
                <div class="title">{{header.title ? header.title : 'Helloa '}}</div>
                <div class="description">
                  To book an appointment we would like to understand a little about you and what you need.
                </div>
                <div class="attention">
                  It only takes 3 minutes.
                </div>

                <div class="choose-buttons">
                  <button class="continue" @click="continueAppointment">BOOK AN APPOINTMENT</button>
                  <div class="way">or</div>
                  <button class="message-fb"><img src="~assets/img/messenger-icon.svg" class="img-fluid">Talk to us in Messenger</button>
                </div>
              </div>
            </div>
            <div v-for="step in steps" :key="step.id" :id="`app-step-${step.id}`">
              <component v-bind:is="`Step${step.id}Mobile`" :step="step" :data.sync="appoint_data" @next="fetchDataMobile" >
              </component>
            </div>
            <div id="app-step-finish">
              <div class="container-fluid confirmed-appt">
                <div class="row justify-content-center">
                  <div class="col-10">
                    <div class="confirm-icon d-flex justify-content-center mb-4">
                      <img src="~assets/img/confirm.png" class="img-fluid">
                    </div>
                    <div class="confirm-main-title text-center">
                      Your appointment is confirmed.
                    </div>
                    <div class="confirm-main-description text-center">
                      We have emailed you the details.
                      We look forward to seeing you!
                    </div>
                  </div>


                    <div class="col-12">
                      <div class="d-flex justify-content-center align-items-center">
                        <div class="box-registration w-100">
                          <div class="row justify-content-center">
                            <div class="col-12">
                              <div class="confirm-info text-center">
                                Create an account to complete the
                                <br>Diamond Emporium experience!
                              </div>

                              <div class="d-flex justify-content-center">

                                <img src="~assets/img/appt-mobile-confirm.png" class="img-fluid">

                              </div>
                              <div class="col-12">
                                <div class="row justify-content-center" >

                                  <nuxt-link class="register-from-app mt-5" :to="{name: 'auth-register', params: { data: this.appoint_data.content } }">
                                    CREATE ACCOUNT</nuxt-link>
                                </div>
                              </div>
                              <div class="col-12 text-center p-4">
                                <nuxt-link to="/auth/login" class="register-social-from-app" >
                                  LOGIN WITH <span>FACEBOOK</span>
                                </nuxt-link>
                              </div>
                            </div>
                          </div>

                        </div>

                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Step1 from '~/components/Appt/Step1.vue'
  import Step2 from '~/components/Appt/Step2.vue'
  import Step3 from '~/components/Appt/Step3.vue'
  import Step4 from '~/components/Appt/Step4.vue'
  import Step5 from '~/components/Appt/Step5.vue'
  import Step6 from '~/components/Appt/Step6.vue'
  import Step7 from '~/components/Appt/Step7.vue'

  import Step1Mobile from '~/components/ApptMobile/Step1Mobile.vue'
  import Step2Mobile from '~/components/ApptMobile/Step2Mobile.vue'
  import Step3Mobile from '~/components/ApptMobile/Step3Mobile.vue'
  import Step4Mobile from '~/components/ApptMobile/Step4Mobile.vue'
  import Step5Mobile from '~/components/ApptMobile/Step5Mobile.vue'
  import Step6Mobile from '~/components/ApptMobile/Step6Mobile.vue'
  import Step7Mobile from '~/components/ApptMobile/Step7Mobile.vue'
  export default {
    layout: 'appoint',
    data() {
      return {

        step: {},
        appoint_data : {
          content: {},
          images: []
        },
        form:{
          password: '',
          email: '',
        },
        error_login: null,
        error_registration: null,
        form_registration : {
          first_name: '',
          last_name: '',
          password: '',
          confirm_password: '',
          email: '',
        },
      }
    },
    components: {
      Step1,
      Step2,
      Step3,
      Step4,
      Step5,
      Step6,
      Step7,
      Step1Mobile,
      Step2Mobile,
      Step3Mobile,
      Step4Mobile,
      Step5Mobile,
      Step6Mobile,
      Step7Mobile,

    },
    methods: {

      loginFacebook(){
        FB.login(response => {

          if (response.authResponse) {

            FB.api('/me', response => {

              let user = {
                socialUser: {
                  id: response.id,
                }
              };
              this.$axios.$post(`/auth/social_login`, user.socialUser)
                .then((resp) => {
                  this.$auth.setUserToken(resp.token);
                  FB.logout();
                  this.$router.push('/')
                })
                .catch(error => {

                });

            });
          } else {
            console.log('User cancelled login or did not fully authorize.');
          }
        });
      },
      async login() {
        try {
          this.$auth.loginWith('local', {data: this.form});
          this.$router.push('/')
        } catch (e) {
          this.error_login = e.response.data.message
        }
      },
      fetchData(value){

        if(value.step.type !== 'Images'){
          Object.assign(this.appoint_data.content,  value.data);
        }else{
          this.appoint_data.images  = this.appoint_data.images.concat(value.data)
        }
          if(value.step.id === 7){
            this.sendData();
          }
      },
      sendData(){
        this.$axios.post('/api/appointments', this.appoint_data)
          .then(function (resp) {
            console.log(resp)
            var options = {
              easing: 'ease-in',
              offset: 60
            }

            document.getElementById("header-appoint").style.display = "none";
            document.getElementById("finish-step").style.display = "block";
            this.$scrollTo('#finish-step', options)
            document.documentElement.style.overflow = 'hidden'
          })
          .catch(function (error) {

          });
      },

      fetchDataMobile(value){

        if(value.step.type !== 'Images'){
          Object.assign(this.appoint_data.content,  value.data);
        }else{
          this.appoint_data.images  = this.appoint_data.images.concat(value.data)
        }
        if(value.step.id === 7){
          this.sendDataMobile();
        }
      },
      sendDataMobile(){
        this.$axios.post('/api/appointments', this.appoint_data)
          .then(function (resp) {

            var options = {
              easing: 'ease-in',
            }
            document.getElementById("app-step-finish").style.display = "block";
            this.$scrollTo('#app-step-finish', options)
            document.documentElement.style.overflow = 'auto'
          })
          .catch(function (error) {

          });
      },
      continueAppointment(){
        var options = {
          easing: 'ease-in',
        }
        document.getElementById("app-step-start").style.display = "none";
        document.getElementById("app-step-1").style.display = "block";
        this.$scrollTo('#app-step-1', options)
        document.documentElement.style.overflow = 'auto'
      },
      scrollToCenter(){
        var options = {
          easing: 'ease-in',
          offset: 60
        }
        this.$scrollTo('#step-appoint1', options)
        }
      },
    mounted() {
      this.scrollToCenter()
    },
    async asyncData({store}) {
      const header = await store.dispatch('fetchApptHeader');
      const appt = await store.dispatch('fetchAppt');
      return { steps: appt.steps , header: header};
    },

  }
</script>


<style lang="scss">
  .mobile-app{
    width: 100%;
    min-height: 100vh;
    #app-step-start{
      .content{
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .emblem-app{
          margin-bottom: 30px;
        }
        .title{
          color: #24354f;
          font-family: lato-reg;
          font-size: 36px;
          font-weight: 400;
          letter-spacing: 1px;
          margin-bottom: 18px;
        }
        .description{
          text-align: center;
          opacity: 0.7;
          color: #24354f;
          font-family: lato-reg;
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          margin-bottom: 50px;
        }
        .attention{
          opacity: 0.7;
          color: #24354f;
          font-family: lato-reg;
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          margin-bottom: 40px;
          text-align: center;
        }
        .choose-buttons{
          .continue{
            width: 290px;
            height: 50px;
            background-color: #24354f;

            display: flex;
            justify-content: center;
            align-items: center;

            color: #ffffff;
            font-family: lato-bold;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 1.2px;
            line-height: 18px;
            text-transform: uppercase;
          }
          .way{
            text-align: center;
            margin-top: 25px;
            margin-bottom: 25px;
            opacity: 0.7;
            color: #24354f;
            font-family: lato-reg;
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
          }
          .message-fb{
            img{
              margin-right: 15px;
            }
            width: 290px;
            height: 50px;
            background-color: transparent;
            border: 1px solid #24354f;

            display: flex;
            justify-content: center;
            align-items: center;

            color: #24354f;
            font-family: lato-bold;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 1.2px;
            line-height: 24px;
            text-transform: uppercase;
          }
        }
      }
    }
    #app-step-2,
    #app-step-3,
    #app-step-4,
    #app-step-5,
    #app-step-1,
    #app-step-6,
    #app-step-7,
    #app-step-finish{
      display: none;
      margin-bottom: 60px;
    }
    #app-step-2,
    #app-step-3,
    #app-step-4,
    #app-step-5,
    #app-step-6,
    #app-step-7, {
      .head-app-step{
        text-align: center;
        .step-title{
          color: #59afe7;
          font-family: lato-reg;
          font-size: 16px;
          letter-spacing: 0.46px;
          margin-top: 50px;
          margin-bottom: 25px;
        }
        .step-subtitle{
          color: #24354f;
          font-family: lato-reg;
          font-size: 20px;
          letter-spacing: 0.57px;
          line-height: 28px;
          margin-bottom: 55px;
        }
        .step-description{
          color: #24354f;
          font-family: lato-reg;
          font-size: 14px;
          letter-spacing: 0.5px;
        }
      }
      .step-content{
        .label-date,
        .label-time{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 30px;

          .time{
            color: #24354f;
            font-family: lato-reg;
            font-size: 12px;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            margin-top: 15px;
            img{
              margin-right: 15px;
            }
            &.is-select{
              color: #ffb6b8;
            }
          }
          .data{
            color: #24354f;
            font-family: lato-reg;
            font-size: 12px;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            margin-top: 15px;
            img{
              margin-right: 15px;
            }
            &.is-select{
              color: #ffb6b8;
            }
          }
        }
        .upload-data{
          margin-top: 100px ;
          display: flex;
          justify-content: center;
          align-items: center;
          .el-upload-list{
            display: none;
          }
          .button-uploader{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            border: none;
            background: transparent;
            span{
              color: #24354f;
              font-family: lato-bold;
              font-size: 10px;
              letter-spacing: 1px;
              text-transform: uppercase;
            }
          }
          .upload-preview{

            display: flex;
            width: 138px;
            height: 165px;
            overflow-x: scroll;
            .custom-scroll{
              display: inline-flex;
              .preview{
                width: 138px;
                height: 100%;
                object-fit: contain;
              }
            }

          }
        }
        .select-data{
         display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          .el-radio{
            display: flex;
            justify-content: center;
            align-items: center;
            &:focus{
              .el-radio__inner{
                outline: none;
                box-shadow: none;
              }
            }
            .el-radio__label{
              text-align: center;
              color: #24354f;
              font-family: lato-reg;
              font-size: 12px;
              letter-spacing: 1.2px;
              text-transform: uppercase;
            }
            .el-radio__input{
              display: none;

              input{
                display: none;
              }
            }
            &.is-checked{

              .el-radio__label{
                color: #ffb6b8;
              }
              .el-radio__input{
                display: block;

                .el-radio__inner{

                  background-image: url("~assets/img/done-select.png");
                  background-color: transparent;
                  border: none;
                  background-position: center;
                  background-repeat: no-repeat;
                  background-size: 100%;
                  width: 10px;
                  height: 10px;
                  border-radius: 0;

                  &:after{
                    display: none;
                  }
                }
              }
            }


            margin-top: 20px;
            margin-bottom: 20px;
          }
        }
      }
    }

    #app-step-finish{
      min-height: 100vh;
      .confirmed-appt{
        padding-top: 150px;
        padding-bottom: 0px;
        min-height: 100vh;
        .register-social-from-app{
          color: #24354f;
          font-family: lato-reg;
          font-size: 10px;
          letter-spacing: 0.83px;
          text-transform: uppercase;
          text-decoration: none;
          span{
            color: #59afe7;
            font-family: lato-bold;
            font-weight: 700;
          }
        }
        .register-from-app{
          width: 234px;
          height: 48px;
          background-color: #24354f;

          display: flex;
          justify-content: center;
          align-items: center;

          color: #ffffff;
          font-family: lato-reg;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 1.17px;
          text-transform: uppercase;
          text-decoration: none;
        }
        .confirm-main-title{
          color: #24354f;
          font-family: lato-reg;
          font-size: 20px;
          letter-spacing: 0.57px;
          line-height: 26px;
          margin-bottom: 40px;
        }
        .confirm-main-description{
          opacity: 0.65;
          color: #24354f;
          font-family: lato-reg;
          font-size: 14px;
          letter-spacing: 0.4px;
          line-height: 20px;
          margin-bottom: 40px;
        }
        .confirm-info{
          margin-top: 30px;
          color: #24354f;
          font-family: lato-reg;
          font-size: 14px;
          letter-spacing: 0.39px;
          line-height: 20px;
          margin-bottom: 40px;

        }
      }

    }
    .progress-moblie-app{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 100px;
    }
    .mobile-app-control{
      position: fixed;
      bottom: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .cancel-step{
        width: 50%;
        height: 50px;
        box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.15);
        background-color: #ffffff;

        display: flex;
        justify-content: center;
        align-items: center;


        color: #24354f;
        font-family: lato-bold;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 1.2px;
        line-height: 18px;
        text-transform: uppercase;
      }
      .next-step{
        width: 50%;
        height: 50px;
        background-color: #24354f;

        display: flex;
        justify-content: center;
        align-items: center;

        color: #ffffff;
        font-family: lato-bold;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 1.2px;
        line-height: 18px;
        text-transform: uppercase;
      }
    }
  }
</style>
<style lang="scss">

  .acc-banner{
    padding: 35px;
    .banner{

    }
    .group-btn-faq{
      &.appt-btn{
        .info{
          margin: 0 auto;
        }
      }
    }
  }
  #finish-step{
    min-height: 100vh;
  }
  #step-appoint2,
  #step-appoint3,
  #step-appoint4,
  #step-appoint5,
  #step-appoint6,
  #step-appoint7,
  #finish-step{
    display: none;
  }
  .box-registration{
    box-shadow: 0 16px 24px rgba(36, 53, 79, 0.31);
    background-color: #ffffff;
    .group-btn-login{
      display: flex;
      justify-content: center;
        .facebook-login{
          display: flex;
          width: 90%;
          align-items: center;
          justify-content: center;
          box-shadow: 0 -1px 0 #cae3f6;
          background-color: transparent;
          border:1px solid #2f405a;
          color: #24354f;
          font-family: lato-reg;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.4px;
          line-height: 24px;
          text-transform: uppercase;
          text-decoration: none;
          padding: 14px 18px;
          img{
            margin-right: 10px;
          }
        }

    }
  }
  .box-registration-control{
    .no-login{
      text-decoration: none;
      width: 100%;
      height: 48px;
      border: none;
      background-color: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #24354f;
      font-family: lato-reg;
      font-size: 14px;
      letter-spacing: 1.17px;
      text-transform: uppercase;
    }
    .registr{
      width: 100%;
      height: 48px;
      border: 1px solid #24354f;
      background-color: #24354f;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      font-family: lato-reg;
      font-size: 14px;
      text-decoration: none;
      letter-spacing: 1.17px;
      text-transform: uppercase;
      a{
        color: #ffffff;
        font-family: lato-reg;
        font-size: 14px;
        text-decoration: none;
        letter-spacing: 1.17px;
        text-transform: uppercase;
      }
    }
  }
  #profileForm, #profileFormMobile{
    margin: 40px 0 ;
    .input-group {
      padding-bottom: 35px;

      input {
        border: none;

        border-bottom: 1px solid #cae3f6;
        border-radius: 0;
        color: #24354f;
        font-family: lato-reg;
        font-size: 18px;
        padding: 0;
        height: 60px;

        &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
          color: #24354f;
          font-family: lato-reg;
          font-size: 18px;
          text-align: center;
        }

        &::-moz-placeholder { /* Firefox 19+ */
          color: #24354f;
          font-family: lato-reg;
          font-size: 18px;
          text-align: center;
        }

        &:-ms-input-placeholder { /* IE 10+ */
          color: #24354f;
          font-family: lato-reg;
          font-size: 18px;
          text-align: center;
        }

        &:-moz-placeholder { /* Firefox 18- */
          color: #24354f;
          font-family: lato-reg;
          font-size: 18px;
          text-align: center;
        }
      }
    }

    .login{
      width: 100%;
      height: 48px;
      border: 1px solid #24354f;
      background-color: transparent;
      display: flex;
      justify-content: center;
     align-items: center;
      color: #24354f;
      font-family: lato-reg;
      font-size: 14px;
      letter-spacing: 1.17px;
      text-transform: uppercase;
    }

  }
</style>


