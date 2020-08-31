<template>
  <div class="row">
    <div class="grid-content bg-purple w-100">
      <el-popover placement="bottom-start"
                  width="950"
                  visible-arrow
                  trigger="click"
                  :open-delay="300"
                  popper-class="popoverShape">
        <div class="container">
            <div class="row">
              <div class="col-7">

                <el-checkbox-group v-model="shape" class="d-flex"
                                   @change="selectNumber(filter_item.alias, shape)">
                  <div class="col-12 list-el-checkbox-group">
                    <el-checkbox  v-for="(item, index) in getAllShapes"
                                  :key="index"
                                  :label="item.value"
                                  class="diamond-shape-image"
                                  :class="shape.length === 0 && index === 0 ? 'empty-array':''">
                      <img :src="`${baseUrl}${item.image.filter}`" class="img-fluid">
                      {{item.title}}
                    </el-checkbox>

                  </div>
                </el-checkbox-group>
              </div>
              <div class="col-5 my-3">
                <img class="img-fluid w-100" :src="`${baseUrl}${filter_item.image}`">
                <div class="shape-text my-3">
                  {{filter_item.description}}
                </div>
                <div class="shape-link" v-if="filter_item.url_link">
                  <nuxt-link :to="{name: 'dynamic-pages-id', params: { id: filter_item.url_link } }" class=" text-center">

                    LEARN MORE ABOUT DIAMOND SHAPES
                  </nuxt-link>
                </div>
              </div>
            </div>
        </div>
        <el-button slot="reference" class="numberRange">
          <div class="title">
            {{filter_item.title}}
            <Caret/>
          </div>
          <div class="item-shape d-flex" v-if="shape.length" >
            <div v-for="item in shape" :key="item.index" class="shape-selected">
              {{item}}
            </div>
          </div>
          <div class="item-shape"  v-else>
              All
          </div>
        </el-button>
      </el-popover>
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
    methods: {

      selectNumber(alias, value = []) {

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
      },
      setQueryValue(){
      if(this.$route.params.shape){

        this.shape = this.$route.params.shape;
        this.$forceUpdate();
      }else{

        if(typeof this.$store.state.diamonds.diamonds_query.shape !== 'undefined' && this.$store.state.diamonds.diamonds_query.shape.length > 0){
          this.shape = this.$store.state.diamonds.diamonds_query.shape
          this.$forceUpdate();
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

      }

    },
   computed:{

      getAllShapes(){
        let shapes = Object.assign([], this.filter_item.values)
        shapes.unshift(this.allShape)
        return shapes
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
  .diamond-shape-image{
    &.empty-array{
      .el-checkbox__label{
        color:#F0BDB8!important;
      }
    }
    .el-checkbox__label{
      width: 20% !important;
      img{
        height: 50px;
        object-fit: contain;
      }
    }
  }
</style>
