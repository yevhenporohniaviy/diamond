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
          <button type="submit" class="save-changes" style="border:none;">
            login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

  import {mapGetters} from "vuex";

  export default{

    name: 'Login',
    layout: 'auth-favorites',
    head() {
      return {
        title: this.itemMeta.meta_title ? this.itemMeta.meta_title : '',
        meta: [
          {hid: 'og:title', property: 'og:title', content:  this.itemMeta.meta_title ? this.itemMeta.meta_title : '' },
          {hid: 'og:description', property: 'og:description', content:  this.itemMeta.meta_description ? this.itemMeta.meta_description : ''},
          {hid: 'og:image', property: 'og:image', content: this.itemMeta.meta_image ? this.itemMeta.meta_image : ''},
          {hid: 'og:image:url ', property: 'og:image:url', content:  this.itemMeta.meta_image ? this.itemMeta.meta_image : ''},
          {hid: 'og:image:height', property: 'og:image:height', content: '200'},
          {hid: 'og:image:width', property: 'og:image:width', content: '200'},
        ]
      }
    },
    data() {
      return {
       form:{
         password: '',
         email: '',
       },
        error: null
      }
    },
    computed: {
      ...mapGetters(['itemMeta']),
    },
    methods:{
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
            this.$notify({
              title: 'Warning',
              message: 'User cancelled login or did not fully authorize.',
              type: 'warning'
            });
          }
        });


      },
      forget_pass() {
        this.$router.push('/auth/forgot')
      },

      async login() {
        this.$validator.validateAll()
          .then(valid => {
            console.log(valid)
            if(valid){
              this.$auth.loginWith('local', {data: this.form})
                .then((resp) =>
                  this.$router.push('/favorites')
                ).catch((error) => {

                this.$notify.error({
                  title: 'Error',
                  message: error.response.data.message,
                });
              })

            }
          }).catch(e => {
          console.log(e)
        })

      },
    },
    created() {
      this.$store.dispatch('fetchMeta','favorites')

    }
  }
</script>

