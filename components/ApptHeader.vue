<template>
  <div>
    <div class="container-fluid" id="header-component-appt" >
      <div class="row">
        <div class="container">

            <div class="col-12">
              <div class="row">
                <div class="col-6 col-md-3 d-flex align-items-center">
                  <div class="d-flex justify-content-center align-items-center">
                    <LogoDefault class="d-none d-xl-block"/>

                  </div>
                </div>
                <div class="col-6 col-md-7 d-none d-xl-block">
                  <div class="row justify-content-center">
                    <div class="address-label ">
                      <span>SYDNEY SHOWROOM</span>      Level 2, Suite 201, 185 Elizabeth St, Sydney NSW 2000
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-2 d-flex align-items-center justify-content-end">
                  <div class="row justify-content-end">
                    <div class="menu-component d-flex align-items-center px-2">

                      <div @click='showCloseAppoint = !showCloseAppoint' class="close-appt">
                        <img src="~assets/img/close-pair-mob.png" class="img-fluid">
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

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
  </div>
</template>
<script>
  import { mapActions, mapGetters} from 'vuex'

  import LogoDefault from './MenuComponent/Icons/LogoDefault'


  export default {
    components: {
      //header
      LogoDefault

    },
    data() {
      return {
        showCloseAppoint: false,

      }
    },
    methods: {
      ...mapActions(['fetchMainMenu','fetchExtendMenu', 'fetchFootMenu']),
      stay(){
        this.showCloseAppoint = false
      },
      leave(){
        this.$router.push({path: '/'})
      },
      handleScroll() {
        if(window.scrollY > 0){
          $('#header-component').css({'position' : 'fixed' , 'background-color' : 'white'})
        }else{
          $('#header-component').css({'position' : 'absolute' , 'background-color' : 'rgba(255, 255, 255, 0.6)'})
        }
      }
    },

    destroyed () {
      if (process.browser) {
        window.removeEventListener('scroll', this.handleScroll);
      }
    }
  }
</script>

<style lang="scss">
  #header-component-appt{
    position: fixed;
    top: 0;
    z-index: 9;
    background-color: #fff;
    border-top:2px solid #c8def0;
  }
  .address-label{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;

    color: #24354f;
    font-family: lato-reg;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 1.8px;
    line-height: 28px;
    span{
      font-family: lato-bold;
      margin-right: 30px;
    }
  }
  .close-appt{
    cursor: pointer;
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
