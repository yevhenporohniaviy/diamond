<template>

    <div class="container">

      <div class="d-flex flex-column justify-content-center align-items-center">
        <div class="col-12 col-md-4">
          <form id="profileForm" @submit.prevent="updateUser">
            <div class="input-group">
              <span class="demo-input-label" for="first_name">First name</span>
              <el-input name="first_name" v-model="user.first_name"></el-input>
            </div>
            <div class="input-group">
              <span class="demo-input-label" for="last_name">Last name</span>
              <el-input name="last_name" v-model="user.last_name"></el-input>
            </div>
            <div class="input-group">
              <span class="demo-input-label" for="phone">Phone number</span>
              <el-input name="phone" v-model="user.phone_number"></el-input>
            </div>
            <div class="input-group">
              <span class="demo-input-label" for="email">Email address</span>
              <el-input name="email" type="email" v-model="user.email" v-validate="'required|email'"></el-input>
              <ul class="error-fields" v-if="errors.has('email')">
                <li>{{errors.first('email')}}</li>
              </ul>
            </div>
            <div class="button-submit">
              <button type="submit" class="save-changes" >
                save changes
              </button>
            </div>

          </form>

        </div>
      </div>

    </div>
</template>

<script>
  import {mapGetters} from'vuex'

  export default{
    middleware: 'guest',
    name: 'Profile',
    layout: 'account',
    data() {
      return {
        user: {},
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated', 'loggedInUser']),

    },
    watch:{
      loggedInUser: {
        handler () {
          this.user = this.loggedInUser
        },
        deep: true

      }
    },

    methods:{
      updateUser(){
        this.$validator.validateAll()
          .then(valid => {
            if(valid){
              this.$axios.$post('/api/users/update', this.user)
                .then((response) => {
                  this.user = response
                  this.$notify({
                    title: 'Success',
                    message:'Your profile details have been changed',
                    type: 'success'
                  });
                })
                .catch((error) => {

                  return error

                });
            }
          });
      },
      setFields() {
        if(this.$auth.loggedIn){
          this.user = this.$auth.user
        }
      }
    },

    mounted() {
      this.setFields();
    }
  }
</script>
<style lang="scss">
  #profileForm{
    margin: 40px 0 ;
    .input-group{
      width: 300px;
      margin: 0 auto;
      margin-bottom: 60px;
      span{
        opacity: 0.61;
        color: #24354f;
        font-family: lato-reg;
        font-size: 12px;
        font-weight: 400;
        text-transform: uppercase;
      }
      input{
        border: none;
        border-bottom: 2px solid #e8f2fa;
        border-radius: 0;
        padding: 0;
        color: #24354f;
        font-family: lato-reg;
        font-size: 18px;
        font-weight: 400;
      }
      .error-fields{
        list-style: none;
        margin-top: 10px;
        padding: 0;
        li{
          color: #24354f;
          font-family: lato-bold;
          font-size: 12px;
        }
      }
    }
    .button-submit{
      width: 300px;
      margin: 0 auto;
      .save-changes{

        background-color: #24354f;
        border-radius: 0;
        padding: 14px;
        width: 100%;

        color: #ffffff;
        font-family: lato-reg;
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 1.17px;
        text-transform: uppercase;
      }
    }
  }

</style>
