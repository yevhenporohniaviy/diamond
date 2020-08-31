<template>
  <div class="offline-board">
    <div class="border-line"></div>
    <ul class="nav-board">
      <li>
        <nuxt-link to="/auth/register"><span><img src="~assets/img/userboard/signup.png" class="img-fluid" width="15"></span>Sign up</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/auth/login"><span><img src="~assets/img/userboard/login_board.png" class="img-fluid" width="15"></span>Login</nuxt-link>
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
  .offline-board{
    &:focus{
      outline: none;

    }
    width: 216px;
    height: 122px;
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
