<template>

      <el-popover placement="bottom-start"
                  width="500"
                  visible-arrow
                  trigger="hover"
                  :open-delay="900"
                  popper-class="popoverShape home">
        <div class="container d-none d-md-block" >
            <div class="row">

                <el-checkbox-group v-model="shape" class="d-flex"
                                   @change="selectNumber(filter_item.alias, shape)" >
                  <div class="col-12 list-el-checkbox-group p-0">


                    <el-checkbox  v-for="(item, index) in getAllShapes"
                                  :key="index"
                                  :label="item.value">
                      <img :src="`${baseUrl}${item.image.filter}`" class=" filter-shapes-home img-fluid">
                      {{item.title}}
                    </el-checkbox>

                  </div>
                </el-checkbox-group>

            </div>
        </div>
        <div class="container d-block d-md-none" >
          <div class="col-12">
            <div class="py-4">
              <div class="row justify-content-between">
                <div class="col-6 count-title">
                  <div class="d-flex justify-content-start">
                    {{filter_item.alias}}
                  </div>
                </div>
                <div class="col-6 count-range-link">
                  <div class="d-flex justify-content-end">
                    <nuxt-link :to="{name: 'dynamic-pages-id', params: { id: filter_item.url_link } }" >

                      LEARN MORE
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="row ">

            <el-checkbox-group v-model="shape" class="d-flex"
                               @change="selectNumber(filter_item.alias, shape)" >
              <div class="col-12 list-el-checkbox-group ">


                <el-checkbox  v-for="(item, index) in getAllShapes"
                              :key="index"
                              :label="item.value">
                  <img :src="`${baseUrl}${item.image.filter}`" class=" filter-shapes-home img-fluid">
                  {{item.title}}
                </el-checkbox>

              </div>
            </el-checkbox-group>

          </div>
        </div>

        <div slot="reference" class="filter-home-range d-flex justify-content-between">
          <div class="d-flex flex-column ">
            <div class="title-home-range">
              {{filter_item.title}}
            </div>
            <div class="item-another-filter d-flex" v-if="shape.length" >
              ie.
              <div v-for="item in shape" :key="item.index" class="d-flex shape-selected ">
                {{item}}
              </div>
            </div>
            <div class="item-another-filter"  v-else>
              All
            </div>
          </div>
          <div class="d-flex align-items-center">
            <Caret/>
          </div>
        </div>
      </el-popover>

</template>
<script>
  import Caret from '~/components/Elements/Icons/CaretFilterHome'

  export default {
    name: 'filter-diamond',
    props: {

      filter_item: Object,
    },
    data() {
      return {

        shape: [],
        allShape: {
          index: 99,
          value: 'All',
          title: 'All',
          image: {
            main: "/glide/Diamonds/shape/All.png",
            hover: "/glide/Diamonds/shape/All_hover.png",
            filter: "/glide/Diamonds/shape/All_filter.png"
          }
        }
      }
    },
    components: {
      Caret
    },
    computed:{
      getAllShapes(){
        let shapes = Object.assign([], this.filter_item.values)
        shapes.unshift(this.allShape)
        return shapes
      }
    },
    methods: {
      selectNumber (alias, value = []) {
        value.forEach(elem => {
          if(elem === 'All'){
            value = []
            this.shape = []
          }
        })
        this.$emit('change-number', {alias, value})
      }
    }
  }
</script>

<style lang="scss">
  .popoverShape{

    &.home{
      @media(max-width: 524px){
        width: 88%!important;
        margin: 0 auto!important;
        left: 0!important;
        right: 0!important;
        background-color: #fff;
        padding: 10px 0 ;
      }
      background-color: #fff;
      .count-title{
        color: #253650;
        font-family: lato-bold;
        font-size: 10px;
        letter-spacing: 1px;
        line-height: 18px;
        text-transform: uppercase;
      }
      .count-range-link {

        a {
          cursor: pointer;
          color: #80b8e6;
          font-family: lato-bold;
          font-size: 10px;
          letter-spacing: 0.49px;
          text-transform: uppercase;
        }
      }

      .el-checkbox{
        margin: 0!important;
        padding: 10px 40px;
        .el-checkbox__label{
          padding-left: 25px;
          @media(max-width: 525px){

            padding-left: 5px;

          }
          img{
            height: 30px;
            object-fit: contain;
          }
        }
       &:nth-child(odd){
         border-right: 1px solid #e3f1fb;
         @media(max-width: 525px){

             border-right: none;

         }
       }

      }
    }
  }
  .filter-home-range{
    .shape-selected{
      display: flex;

      &:nth-child(1n+3) {
        display: none;
      }
      &:nth-child(2) {
        &::after{
          content:',\00a0...';
          display: block;
        }
      }
      &:nth-child(1) {
        &::after{
          content:',\00a0';
          display: block;
        }
      }

    }
  }
  .filter-shapes-home{
    width: 25%;
    filter: grayscale(1);
  }
</style>
