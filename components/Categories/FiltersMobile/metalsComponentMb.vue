<template>


  <div  class="container">
    <div class="row">
      <div class="col-12 ">

        <div class="title-categories"> {{widget.title}}</div>
      </div>
      <div class="col-12">
        <el-checkbox-group v-model="metals" class="d-flex" @change="selectValueApply(widget.alias)">

          <div class="col-12 list-el-checkbox-group">
            <div class="col-12">

              <el-checkbox v-for="(item) in widget.show_in_menu" :key="item.index"
                           :label="{value:item.value, title: item.title}">
                <img :src="baseUrl+item.image" class="style-images img-fluid">
                <div class="title-lable">
                  {{item.title}}
                </div>
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
      widget: Object,
    },
    data() {
      return {

        metals: []
      }
    },
    components: {
      Caret
    },
    methods: {
      selectValueApply (alias) {
        let values = [];
        this.metals
          .forEach((value) => {
            values.push(value.value)
          })
        this.$emit('change', {alias, values})
      }
    },
  }
</script>
