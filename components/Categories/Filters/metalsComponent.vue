<template>
  <el-popover
    :popper-class="'popoverCategory' +' '+ widget.alias"
    placement="bottom-start"
    visible-arrow
    :open-delay="900"
    width="575"
    trigger="hover">
    <div>
      <el-checkbox-group v-model="metals" class="d-flex" @change="selectValue(widget.alias)">
        <div class="col-12 list-el-checkbox-group">
          <el-checkbox v-for="(item) in widget.show_in_menu" :key="item.index"
                       :label="{value:item.value, title: item.title}">
            <img :src="baseUrl+item.image" class="metals-images img-fluid">
            <div class="title-lable">
              {{item.title}}
            </div>
          </el-checkbox>
        </div>

      </el-checkbox-group>
      <div class="description">{{widget.description}}</div>

    </div>


    <el-button slot="reference" class="btn-filter">
      <div class="title">

        <div v-if="widget.title">
          {{widget.title}}
        </div>
        <Caret/>
      </div>


      <div class="sub-title d-flex" v-if="metals.length > 0">
        <div v-for="(item, index) in metals" :key="index" class="shape-selected">
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
      selectValue (alias) {
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
