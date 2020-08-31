<template>
  <div class="container">
    <div class="d-flex flex-column justify-content-center align-items-center">
      <div class="col-12 col-md-6">
        <div class="social-registration-group my-5">
          <a href="#" class="facebook-registration" @click="loginFacebook">
            <img src="~assets/img/facebook.png" class="img-fluid">
            <span>SIGN UP WITH FACEBOOK</span>
          </a>
        </div>
      </div>
      <div class="col-12 col-md-4 block-form">
        <div class="text-center w-100">
          <img src="~assets/img/line.png" class="text-center w-100">
        </div>

        <form id="registrationUser" @submit.prevent="register()" >

          <div class="input-group mb-5">

            <el-input name="first_name" v-model="form.first_name" placeholder="First name"></el-input>
            <ul class="error-fields" v-if="error &&  Array.isArray(error.first_name) && error.first_name.length">
              <li v-for="(er, index) in error.first_name" :key="index">{{er}}</li>
            </ul>
          </div>
          <div class="input-group mb-5">
            <el-input name="last_name" v-model="form.last_name" placeholder="Last name"></el-input>
            <ul class="error-fields" v-if="error &&  Array.isArray(error.last_name) && error.last_name.length">
              <li v-for="(er, index) in error.last_name" :key="index">{{er}}</li>
            </ul>
          </div>
          <div class="input-group mb-5">
            <el-input name="email" v-model="form.email" placeholder="Email address"></el-input>
            <ul class="error-fields" v-if="error &&  Array.isArray(error.email) && error.email.length">
              <li v-for="(er, index) in error.email" :key="index">{{er}}</li>
            </ul>
          </div>
          <div class="input-group mb-5">
            <el-input name="password" type="password" v-model="form.password" placeholder="Password"></el-input>
            <ul class="error-fields" v-if="error &&  Array.isArray(error.password) && error.password.length">
              <li v-for="(er, index) in error.password" :key="index">{{er}}</li>
            </ul>
          </div>
          <div class="input-group mb-5">
            <el-input name="confirm_password" type="password" v-model="form.confirm_password" placeholder="Confirm password"></el-input>
            <ul class="error-fields" v-if="error &&  Array.isArray(error.confirm_password) && error.confirm_password.length">
              <li v-for="(er, index) in error.confirm_password" :key="index">{{er}}</li>
            </ul>
          </div>
          <div class="button-submit">
            <input type="submit" value="Register" class="save-changes" style="border:none;">
          </div>

          <div class="already my-5">
            <nuxt-link to="/auth/login">
              I ALREADY HAVE AN ACCOUNT
            </nuxt-link>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
  export default{
    name: 'Sing',
    layout: 'auth',
    data() {

      return {
        form : {
          first_name: '',
          last_name: '',
          password: '',
          confirm_password: '',
          email: '',
        },
        error: null
      }
    },

    methods: {
      async register() {
        try {
          await this.$axios.post('/auth/register', this.form);
          this.$router.push('/success');
        } catch (e) {
          this.error = e.response.data.errors
          this.$notify({
            title: 'Warning',
            message: e.response.data.message,
            type: 'warning'
          });
        }
      },
      apptRegister(){
        if(Object.entries(this.$route.params).length !== 0){
          this.form.first_name = this.$route.params.data.first_name;
          this.form.last_name = this.$route.params.data.last_name;
          this.form.email = this.$route.params.data.email;
        }
      },

      loginFacebook(){
        FB.login(response => {
          if (response.authResponse) {
            FB.api('/me?fields=id,name,email', response => {
              let user = {
                socialUser: {
                  id: response.id,
                  name: response.name,
                  email: response.email,
                  provider: "facebook"
                }
              };
              this.$axios.$post(`/auth/social_register`, user)
                .then((resp) => {
                  this.$auth.setUserToken(resp.token)
                  .then((resp)=>{
                    this.$router.push('/auth/password_social')
                  })
                  FB.logout();

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
        },{
          scope: 'email',
          return_scopes: true
        });


      }
    },
    created() {
      this.apptRegister()
    }
  }
</script>

