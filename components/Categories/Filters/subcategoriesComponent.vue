<template>

  <el-popover

    popper-class="popoverCategory subcategories"
    placement="bottom-start"
    visible-arrow
    width="575"
    :open-delay="900"
    trigger="hover">

    <div class="container" >

      <el-checkbox-group v-model="subcategories" class="d-flex" @change="selectValue('subcategories')">

        <div class="col-12 list-el-checkbox-group">

          <el-checkbox v-for="(item, index) in widget" :key="index"
                       :label="{id:item.id, title: item.title}" >
            <img :src="baseUrl+item.image.filter" class="img-fluid style-images">
            {{item.title}}
          </el-checkbox>
        </div>

      </el-checkbox-group>
    </div>






    <el-button slot="reference" class="btn-filter">
      <div class="title">
        <div >
          gender
        </div>

        <Caret/>

      </div>

      <div class="sub-title d-flex" v-if="subcategories.length > 0">
        <div v-for="(item, index) in subcategories" :key="index" class="gender-selected">
          {{item.title}}
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
      widget: Array,
      alias: String
    },
    data() {
      return {

        subcategories:[]
      }
    },
    components:{
      Caret
    },
    methods: {
      selectValue (alias) {

        let values = [];
        this.subcategories
          .forEach((value) => {
            values.push(value.id)
          })
        this.$emit('change', {alias, values})
      }
    },

  }
</script>

<style lang="scss">
  .btn-filter{
    .gender-selected{
      display: flex;

      &:nth-child(1n+3) {
        display: none;
      }
      &:nth-child(1) {
        &::after{
          content:',\00a0';
          display: block;
        }
      }

    }
  }
</style>
