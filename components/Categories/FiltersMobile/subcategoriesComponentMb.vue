<template>

  <div  class="container">
    <div class="row">
      <div class="col-12 ">

        <div class="title-categories">gender</div>
      </div>
      <div class="col-12">
        <el-checkbox-group v-model="subcategories" class="d-flex" @change="selectValueApply('subcategories')">

          <div class="col-12 list-el-checkbox-group">

            <el-checkbox v-for="(item, index) in widget" :key="index"
                         :label="{id:item.id, title: item.title}" >
              <img :src="baseUrl+item.image.filter" class="img-fluid style-images">
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
      widget: Array,
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
      selectValueApply (alias) {
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
