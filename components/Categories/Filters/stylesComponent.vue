<template>
  <el-popover
    popper-class="popoverCategory styles"
    placement="bottom-start"
    visible-arrow
    width="575"
    :open-delay="900"
    trigger="hover">

    <div class="container">
      <el-checkbox-group v-model="styles" class="d-flex" @change="selectValue('styles')">

        <div class="col-12 list-el-checkbox-group p-4">

          <div class="row" :class="alias === 'wedding_bands' ? 'justify-content-center ': '' ">

            <el-checkbox v-for="(item, index) in getAllStyles" :key="index"
                         :label="{id:item.id, title: item.title}" :class="alias === 'wedding_bands' ? 'wedding ': '' ">
              <img :src="baseUrl+item.image.filter" class="style-images img-fluid">
              {{item.title}}
            </el-checkbox>
          </div>
        </div>

      </el-checkbox-group>
    </div>


    <el-button slot="reference" class="btn-filter">
      <div class="title">

        <div >
          Style
        </div>

        <Caret/>
      </div>


      <div class="sub-title d-flex" v-if="styles.length > 0">
        <div v-for="(item, index) in styles" :key="index" class="shape-selected">
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

        styles:[]
      }
    },
    components:{
      Caret
    },
    computed:{
      getAllStyles(){
        let styles = Object.assign([], this.widget)
        return styles
      }
    },
    methods: {
      selectValue (alias) {
        let values = [];
        this.styles
          .forEach((value) => {
            values.push(value.id)
          })
        this.$emit('change', {alias, values})
      }
    },
  }
</script>

<style lang="scss">
  .popoverCategory.styles .el-checkbox-group .list-el-checkbox-group .el-checkbox {
    &.wedding{
      margin: 20px 40px!important;
    }
  }
</style>


