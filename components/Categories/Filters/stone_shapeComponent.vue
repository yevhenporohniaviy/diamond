<template>

  <el-popover
    :popper-class="'popoverCategory' +' '+ widget.alias"
    placement="bottom-start"
    visible-arrow
    width="950"
    :open-delay="900"
    trigger="hover">

    <div  class="container" >
      <div class="row">
        <div class="col-7">
          <el-checkbox-group v-model="shape" class="d-flex"  @change="selectValue(widget.alias, shape)">

            <div class="col-12 list-el-checkbox-group">

              <el-checkbox class="shape-checkbox" v-for="(item, index) in getAllShapes" :key="index"
                           :label="item.value"
                           :class="shape.length === 0 && index === 0 ? 'empty-array':''">

                <img :src="baseUrl+item.image" class="img-fluid">


                {{item.title}}
              </el-checkbox>
            </div>

          </el-checkbox-group>
        </div>
        <div class="col-5 my-3">
          <img class="img-fluid w-100" :src="baseUrl + widget.image">
          <div class="shape-text my-3">
            {{widget.description}}
          </div>
          <div class="shape-link" v-if="widget.url_link">
            <a :href="widget.url_link">
              LEARN MORE ABOUT DIAMOND SHAPES
            </a>
          </div>
        </div>
      </div>
    </div>


    <el-button slot="reference" class="btn-filter">
      <div class="title">

        <div >
          {{widget.title}}
        </div>

        <Caret/>
      </div>



      <div class="sub-title d-flex" v-if="shape.length > 0">
        <div v-for="(item, index) in shape" :key="index" class="shape-selected">
          {{item}}
        </div>

      </div>
      <div class="sub-title"  v-else>
        All</div>

    </el-button>

  </el-popover>

</template>
<script>
  import Caret from '~/components/Elements/Icons/Caret-black'

  export default {
    name: 'filter-diamond',
    props: {

      widget: Object,
      alias: String
    },
    data() {
      return {

        shape: [],
        allShape: {
          index: 99,
          value: 'All',
          title: 'All',
          image:  "/glide/Diamonds/shape/All_filter.png"
        }
      }
    },
    components: {
      Caret
    },
    computed:{
      getAllShapes(){
        let shapes = Object.assign([], this.widget.values)
        shapes.unshift(this.allShape)
        return shapes
      }
    },
    methods: {
      selectValue (alias, values) {
        values.forEach(elem => {
          if(elem === 'All'){
            values = []
            this.shape = []
          }
        })
        this.$emit('change', {alias, values})
      },
      setQueryValue(){
        if(this.alias === 'engagement_rings'){
          if(typeof this.$store.state.categories.jewellery_engagement_query.stone_shape !== 'undefined' && this.$store.state.categories.jewellery_engagement_query.stone_shape.length > 0){
            this.shape = this.$store.state.categories.jewellery_engagement_query.stone_shape
          }else{
            this.shape = []
          }
        }else{
          if(typeof this.$store.state.categories.jewellery_wedding_query.stone_shape !== 'undefined' && this.$store.state.categories.jewellery_wedding_query.stone_shape.length > 0){
            this.shape = this.$store.state.categories.jewellery_wedding_query.stone_shape
          }else{
            this.shape = []
          }
        }

      }
    },
    mounted(){
      this.setQueryValue();
    },
  }
</script>

<style lang="scss">
  .btn-filter{
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
  .shape-checkbox{
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
