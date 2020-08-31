<template>
  <el-col class="filter_item filter-main">

    <el-popover
      popper-class="popoverCategoryMain"
      placement="bottom-start"
      visible-arrow
      width="288"
      trigger="click">

      <div>
        <ul>
          <li v-for="item in categories_list" :key="item.id" >
            <nuxt-link :to="{name: item.link , params: { id: item.id} }" > {{item.label}}</nuxt-link>
          </li>
        </ul>
      </div>
      <el-button slot="reference" class="btn-filter-main">
        <div class="title">
          BRIDAL STYLE
          <CaretWhite/>
        </div>
        <div class="sub-title">
          {{type_category.title}}
        </div>
      </el-button>

    </el-popover>
  </el-col>
</template>
<script>
  import CaretWhite from '~/components/Elements/Icons/Caret-white'

  export default {
    name: 'filter-diamond',
    props: {
      type_category: Object,
    },
    data() {
      return {
        categories_list: [{
          value: 'engagement_rings',
          label: 'ENGAGEMENT RINGS',
          link: 'categories-category-id',
          id: 'engagement_rings'
        }, {
          value: 'wedding_bands',
          label: 'WEDDING BANDS',
          link: 'categories-category-id',
          id: 'wedding_bands'
        }],
      }
    },
    components:{
      CaretWhite
    }
  }
</script>
