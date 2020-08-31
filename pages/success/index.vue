<template>
  <div>
    <div class="container" >
      <div class="row acc-banner">
        <div class="banner">
          <div class="title">You successfully registered.<br> For confirmation, please, check your email.
          </div>
          <div class="group-btn-faq appt-btn d-flex justify-content-center" >
            <div class="info w-50 mb-5 text-center">

              Why not take the time to refine your ring brief by adding further information to your account.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row my-5">
        <div class="col-md-4 col-12">
          <div class="card card-success" >
            <img class="card-img-top" src="~assets/img/succes1.png" alt="Card image cap">
            <div class="card-body">

              <div class="card-text">Start designing your own ring to help our consultants get a better idea of what you are looking for.</div>
              <nuxt-link to="/diamonds" class="succes-link"> <img src="~assets/img/success-arrow.png" class="img-fluid">BROWSE DIAMONDS</nuxt-link>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-12">
          <div class="card card-success" >
            <img class="card-img-top" src="~assets/img/succes2.png" alt="Card image cap">
            <div class="card-body">

              <div class="card-text">Browse our collections and add your favourite rings to you inspiration board.</div>
              <nuxt-link to="/categories/category/engagement_rings" class="succes-link"> <img src="~assets/img/success-arrow.png" class="img-fluid">BROWSE RINGS</nuxt-link>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-12">
          <div class="card card-success" >
            <img class="card-img-top" src="~assets/img/succes3.png" alt="Card image cap">
            <div class="card-body">
              <div class="card-text">Get inspired by what’s trending or our recent designs by adding your favourite images to your inspiration board.</div>
              <nuxt-link to="/get_inspired" class="succes-link"> <img src="~assets/img/success-arrow.png" class="img-fluid"> GET INSPIRED</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss">
  .card-success{
    border: 1px solid #cae3f6;
    border-radius: 0px;
    height: 450px;
    .card-img-top{
      border-radius: 0px;
    }
    .card-body{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 200px;
      .card-text{
        min-height: 80px;
        text-align: center;
        padding-left: 40px;
        padding-right: 40px;
        margin-top: 40px;
        margin-bottom: 40px;
        @media(max-width: 525px){
          padding-left: 15px;
          padding-right: 15px;
        }
        color: #24354f;
        font-family: lato-reg;
        font-size: 16px;
        line-height: 24px;
      }
      .succes-link{
        margin-bottom: 50px;
        width: 240px;
        padding: 15px;
        border: 1px solid #24354f;

        display: flex ;
        justify-content: center;
        align-items: center;

        color: #24354f;
        font-family: lato-reg;
        font-size: 17px;
        letter-spacing: 0.94px;
        text-transform: uppercase;
        text-decoration: none;
        img{
          margin-right: 10px;
        }
      }
    }
  }
</style>
