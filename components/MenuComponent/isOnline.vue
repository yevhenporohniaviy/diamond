<template>
  <div class="online-board">
    <div class="border-line"></div>
    <ul class="nav-board">
      <li>
        <nuxt-link to="/account/profile"><span><img src="~assets/img/userboard/profile.png" class="img-fluid " width="15"></span> Account detail</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/account/order-history"><span><img src="~assets/img/userboard/bag.png" class="img-fluid" width="15"></span> Order history</nuxt-link>
      </li>
      <li>
        <button @click="logOut">
          <span><img src="~assets/img/userboard/login.png" class="img-fluid" width="15"></span>  Log out
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {

    methods: {
       logOut(){
         this.$auth.logout();
      }
    }
  }
</script>


<style lang="scss">
  .online-board{
    &:focus{
      outline: none;

    }
    width: 248px;
    height: 183px;
    border-bottom: 1px solid #cae3f6;
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    .border-line{
      width: 40px;
      height: 2px;
      background-color: #cae3f6;
      margin: 0 auto;
    }
    .nav-board{
      list-style: none;
      padding: 10px;
      li{
        margin: 0 15px;
        a, button{
          padding: 0;
          border: none;
          background-color: transparent;
          span{
            margin-right: 10px;
          }
          text-decoration:none;
          color: #24354f;
          font-family: lato-bold;
          font-size: 12px;
          letter-spacing: 3.1px;
          line-height: 47px;
          text-transform: uppercase;
        }
      }
    }
  }
</style>
