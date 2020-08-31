<template>

  <div  class="container">
    <div class="row">
      <div class="col-12 ">

        <div class="title-categories"> Style</div>
      </div>
      <div class="col-12">
        <el-checkbox-group v-model="styles" class="d-flex" @change="selectValueApply('styles')">

          <div class="col-12 list-el-checkbox-group">

            <div class="row">
              <el-checkbox v-for="(item, index) in widget" :key="index"
                           :label="{id:item.id, title: item.title}">
                <img :src="baseUrl+item.image.filter" class="style-images img-fluid">
                {{item.title}}
              </el-checkbox>
            </div>
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
      widget: Array,
    },
    data() {
      return {

        styles:[]
      }
    },
    components:{
      Caret
    },
    methods: {
      selectValueApply (alias) {
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
