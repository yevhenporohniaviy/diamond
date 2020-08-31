<template>
  <div class="container">
    <div class="d-flex flex-column justify-content-center align-items-center">
      <div class="col-12 col-md-6 ">

        <div class="social-registration-group my-5">
          <a href="#" class="facebook-registration" @click="loginFacebook">
            <img src="~assets/img/facebook.png" class="img-fluid"><span>LOGIN WITH FACEBOOK</span>
          </a>
        </div>

      </div>

      <div class="col-12 col-md-4  block-form">
        <div class="text-center w-100">
          <img src="~assets/img/line.png" class="text-center w-100">
        </div>
        <div>
          <ul class="error-fields" v-if="error">
           {{error}}
          </ul>
        </div>
        <form id="loginUser" @submit.prevent="login">


          <div class="input-group mb-5">
            <el-input name="email" type="email" v-model="form.email" placeholder="Email" v-validate="'required|email'"></el-input>

            <ul class="error-fields" v-if="errors.has('email')">
              <li>{{errors.first('email')}}</li>
            </ul>

          </div>
          <div class="input-group mb-2">
            <el-input name="password" type="password" v-model="form.password" placeholder="Password" v-validate="'required'"></el-input>
            <ul class="error-fields" v-if="errors.has('password')">
              <li>{{errors.first('password')}}</li>
            </ul>

          </div>
          <div class="forgot" @click="forget_pass">Forgot my password</div>
          <button type="submit" class="save-changes">
            login
          </button>
        </form>
      </div>
    </div>

  </div>
</template>

<script>

  export default {

    name: 'Login',
    layout: 'auth',
    data() {
      return {
        form: {
          password: '',
          email: '',
        },
        error: null
      }
    },

    methods: {

      async login() {
        this.$validator.validateAll()
          .then(valid => {
            if(valid){

                this.$auth.loginWith('local', {data: this.form})
                  .then((resp) => this.$router.push('/')
                  ).catch((error) => {

                    this.$notify.error({
                      title: 'Error',
                      message: error.response.data.message,
                      type: 'warning'
                    });
                  })
            }
          }).catch(e => {

        })

      },
      forget_pass() {
        this.$router.push('/auth/forgot')
      },
      loginFacebook() {
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
                  this.$notify({
                    title: 'Warning',
                    message: error.response.data.message,
                    type: 'warning'
                  });
                });

            });
          } else {
            console.log('User cancelled login or did not fully authorize.');
          }
        });


      }
    }
  }
</script>

