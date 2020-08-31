<template>
  <div  class="container">
    <div class="row">
      <div class="col-12 ">

        <div class="title-categories"> {{widget.title}}</div>
      </div>
      <div class="col-12">
        <el-checkbox-group v-model="shape" class="d-flex"
                           @change="selectValueApply(widget.alias,shape)">

          <div class="row list-el-checkbox-group">

            <el-checkbox class="" v-for="(item, index) in getAllShapes" :key="index"
                         :label="item.value"
                         :class="shape.length === 0 && index === 0 ? 'empty-array':''">

              <img :src="baseUrl+item.image" class="style-images ">


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

      widget: Object,
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
      selectValueApply (alias, values) {

        values.forEach(elem => {
          if(elem === 'All'){
            values = []
            this.shape = []
          }
        })
        this.$emit('change', {alias, values})
      }
    },
  }
</script>
<style lang="scss">
  .list-el-checkbox-group{
    .empty-array{
      .el-checkbox__label{
        color:#F0BDB8!important;
      }
    }
  }
</style>
