<template>
  <div class="container">
    <div class="row">
      <div class="col-12 ">
        <div class="py-4">
          <div class="row justify-content-between">
            <div class="col-6 count-title">
              <div class="row justify-content-start">
                {{filter_item.alias}}
              </div>
            </div>
            <div class="col-6 count-range-link">
              <div class="row justify-content-end">
                <nuxt-link :to="{name: 'dynamic-pages-id', params: { id: filter_item.url_link } }" >

                  LEARN MORE
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="col-12">
        <el-checkbox-group v-model="shape" class="d-flex diamond-shape-mobile"
                           @change="selectNumberMobile(filter_item.alias, shape)">
          <div class="row list-el-checkbox-group">


            <el-checkbox  v-for="(item, index) in getAllShapes"
                          :key="index"
                          :label="item.value"
                          :class="shape.length === 0 && index === 0 ? 'empty-array':''">
              <img :src="`${baseUrl}${item.image.filter}`" class="img-fluid">
              {{item.title}}
            </el-checkbox>

          </div>
        </el-checkbox-group>
      </div>
    </div>

  </div>
</template>
<script>
  import Caret from '~/components/Elements/Icons/Caret-black'

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
      setQueryValue(){
        console.log()
        if(this.$route.params.shape){
          this.shape = this.$route.params.shape;
          this.$forceUpdate();
        }else{

          if(typeof this.$store.state.diamonds.diamonds_query.shape !== 'undefined' && this.$store.state.diamonds.diamonds_query.shape.length > 0){
            this.shape = this.$store.state.diamonds.diamonds_query.shape

          }else{

            if(this.$route.query.shape ){
              this.shape = this.$route.query.shape
              this.$forceUpdate();

            }else{
              this.shape = []
              this.$forceUpdate();
            }
          }
        }

      },
      selectNumberMobile(alias, value = []) {
        value.forEach(elem => {
          if(elem === 'All'){
            value = []
            this.getValue();
          }
        })
        this.$emit('change-number', {alias, value})
      },
      getValue(){
        this.shape = []
      }

    },
    mounted(){
      this.$bus.$on('messageSent', this.getValue);
    },
    created() {
      this.setQueryValue();

    }
  }
</script>

<style lang="scss">
  .diamond-shape-mobile{
    .empty-array{
      .el-checkbox__label{
        color:#F0BDB8!important;
      }
    }
    .el-checkbox__label{
      width: 30% !important;
      img{
        filter: grayscale(1);
      }

    }
  }
</style>
