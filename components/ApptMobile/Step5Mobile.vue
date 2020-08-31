
<template>


  <section>
    <div class="row justify-content-center align-items-center flex-column">
      <div class="col-12">
        <div class="progress-moblie-app">
          <img src="~assets/img/mobile-app-pro-steps5.png" class="img-fluid">
        </div>
      </div>
      <div class="col-10">
        <div class="head-app-step">
          <div class="step-title">{{step.title}}</div>
          <div class="step-subtitle"> {{step.subtitle}}</div>
          <div class="step-description" v-html="step.description"></div>
        </div>
      </div>
      <div class="col-10">
        <div class="step-content">
          <div
            v-for="(item, index) in step.content"
            :key="index">
            <div v-if="item.content.element_type === 'loader'"  class="upload-data">

              <div class="row wrapper">
                <div class="col-7" style="margin-bottom: 20px; display:flex;justify-content:center">
                  <div class="upload-preview" >
                    <img src="~assets/img/empty-upload.png" class="img-fluid" v-if="!showImage.length">
                      <div class="custom-scroll" v-else>
                          <img :src="showImage" class="img-fluid preview mx-2">
                          <div class="custom-scroll__delete" @click="handleRemove">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 368.022 368.022" style="enable-background:new 0 0 368.022 368.022;" xml:space="preserve" width="20px" height="20px">
                              <path style="fill:#24354F" d="M314.101,54.133c71.79,71.847,71.744,188.287-0.103,260.077s-188.287,71.744-260.077-0.103   c-71.75-71.806-71.75-188.167,0-259.974c71.381-71.847,187.49-72.224,259.337-0.843C313.54,53.57,313.821,53.851,314.101,54.133z" data-original="#D7443E" class="active-path"/>
                              <polygon style="fill:#fff" points="275.439,124.663 215.88,184.223 275.439,243.782 243.57,275.651 184.011,216.092    124.452,275.651 92.582,243.782 152.142,184.223 92.582,124.663 124.452,92.794 184.011,152.353 243.57,92.794  " data-original="#D4E1F4" class="" data-old_color="#D4E1F4"/>
                            </svg>
                          </div>
                      </div>
                  </div>
                </div>
                <div class="col-5 d-flex justify-content-center align-items-center">
                  <el-upload
                    action=""
                    :on-success="checkImage"
                    multiple
                    :limit="10"
                    >
                    <button class="button-uploader" v-show="!listImages.length">
                      <img src="~assets/img/upload-pc.png" class="img-fluid">
                      <span>{{item.content.placeholder}}</span>
                    </button>
                    <button class="button-uploader " @click="removeImage" v-show="listImages.length">
                      <img src="~assets/img/upload-pc.png" class="img-fluid">
                      <span class="mt-3">{{item.content.placeholder}}</span>
                    </button>

                  </el-upload>
                </div>

                <!-- Arrows -->
                  <div class="arrow arrow--left js-arrow-left" v-on:click="changeShowUploadImage('left')">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 512.002 512.002" style="enable-background:new 0 0 512.002 512.002;" xml:space="preserve" width="20px" height="20px">
                      <g>
                        <path d="M388.425,241.951L151.609,5.79c-7.759-7.733-20.321-7.72-28.067,0.04c-7.74,7.759-7.72,20.328,0.04,28.067l222.72,222.105    L123.574,478.106c-7.759,7.74-7.779,20.301-0.04,28.061c3.883,3.89,8.97,5.835,14.057,5.835c5.074,0,10.141-1.932,14.017-5.795    l236.817-236.155c3.737-3.718,5.834-8.778,5.834-14.05S392.156,245.676,388.425,241.951z" fill="#24354F"/>
                      </g>
                    </svg>
                  </div>
                  <div class="arrow arrow--right js-arrow-right" v-on:click="changeShowUploadImage('right')">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 512.002 512.002" style="enable-background:new 0 0 512.002 512.002;" xml:space="preserve" width="20px" height="20px">
                      <g>
                        <path d="M388.425,241.951L151.609,5.79c-7.759-7.733-20.321-7.72-28.067,0.04c-7.74,7.759-7.72,20.328,0.04,28.067l222.72,222.105    L123.574,478.106c-7.759,7.74-7.779,20.301-0.04,28.061c3.883,3.89,8.97,5.835,14.057,5.835c5.074,0,10.141-1.932,14.017-5.795    l236.817-236.155c3.737-3.718,5.834-8.778,5.834-14.05S392.156,245.676,388.425,241.951z" fill="#24354F"/>
                      </g>
                    </svg>
                  </div>

              </div>

            </div>
            <div v-if="item.content.element_type === 'label'" >

            </div>
          </div>
        </div>
      </div>
      <div class="mobile-app-control">
        <button class="cancel-step" @click="skipStep">skip</button>
        <button type="submit" @click="sendData" class="next-step">next</button>
      </div>
    </div>
  </section>
</template>


<script>



  export default {
    props: {
      step: Object,
      data: Object,
    },
    data() {
      return {

        fieldStepSecond: {
        },
        dialogImageUrl: '',
        listImages: [],
        dialogVisible: false,
        showImage: '',
        showImageNumber: 0
      }
    },

    methods: {

      skipStep(){
        var options = {
          easing: 'ease-in',
        }
        document.getElementById("app-step-5").style.display = "none";
        document.getElementById("app-step-6").style.display = "block";
        this.$scrollTo('#app-step-6', options)
      },
      removeImage(){
        this.listImages = []
      },


      changeShowUploadImage(arrow) {
        if(arrow == 'left') {
          console.log('Left');
          this.showImageNumber -= 1;
          document.getElementsByClassName('js-arrow-right')[0].style.display = 'flex';

          if(this.showImageNumber == 0) {
            document.getElementsByClassName('js-arrow-left')[0].style.display = 'none';
          }
        } else if(arrow == 'right') {
          console.log('Right')
          this.showImageNumber += 1;
          document.getElementsByClassName('js-arrow-left')[0].style.display = 'flex';
          if(this.listImages.length - 1  == this.showImageNumber) {
            document.getElementsByClassName('js-arrow-right')[0].style.display = 'none';
          }
        }

        if(this.listImages.length - 1 == this.showImageNumber) {
          document.getElementsByClassName('js-arrow-right')[0].style.display = 'none';
        }

        this.showImage = this.listImages[this.showImageNumber].preview;

        if(this.showImageNumber == -1) {
          this.showImageNumber = 0;
        }
      },
      handleRemove(){
        this.listImages.splice(this.showImageNumber, 1);

        if(this.listImages.length) {
          if(this.showImageNumber == 0) {
            this.changeShowUploadImage('righ');
          } else {
            this.changeShowUploadImage('left');
          }
        } else {
          this.showImage = '';
        }
      },

      checkImage(response, image){
        this.listImages.push(image.response);
        this.showImage = this.listImages[0].preview;

        if(this.listImages.length > 1){
          document.getElementsByClassName('js-arrow-right')[0].style.display = 'flex';
        }
      },
      sendData(){
        if(Object.entries(this.listImages).length === 0 && this.listImages.constructor === Object){
          this.$notify({
            title: 'Warning',
            message: 'Please, choose something',
            type: 'warning'
          });

        }else {

          this.$emit('next', {step: this.step, data: this.listImages})
          var options = {
            easing: 'ease-in',
          }
          document.getElementById("app-step-5").style.display = "none";
          document.getElementById("app-step-6").style.display = "block";
          this.$scrollTo('#app-step-6', options)
        }
      },
    }
  }
</script>
<style scoped lang="scss">
// Arrows style
  .arrow {
    position: absolute;
    top: 50px;
    border-radius: 50%;
    background-color: rgba(#24354F, 0.1);
    width: 50px;
    height: 50px;
    cursor: pointer;
    display: none;
    justify-content: center;
    align-items: center;

    &--left {
      left: 0;
      transform: rotate(180deg);
      padding-left: 5px;
    }

    &--right {
      right: 0;
      padding-left: 5px;
    }
  }

  .upload-data{
    position: relative;
    margin-top: 0 !important;

    .el-upload--picture-card{
      width: 100%;

    }
  }
  .custom-scroll {
    position: relative;
    overflow-x: hidden;
    display: flex;
    justify-content: center;

    &__delete {
      position: absolute;
      top: 0;
      right: 0;
    }

    img {
      width: 100%;
    }
  }

  .el-progress-circle .el-progress-circle__path {
    stroke: rgb(36, 53, 79);
  }
  .el-upload-list--picture-card .el-upload-list__item-thumbnail{
    object-fit: contain;
  }
  .el-upload-list--picture-card .el-upload-list__item-status-label{
    background: rgb(36, 53, 79);
  }

  // Wrapper stile (for show image & Upload)
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .upload-preview {
    width: 100%;
  }
</style>
