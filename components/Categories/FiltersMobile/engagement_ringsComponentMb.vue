<template>
  <el-col  class="filter py-3 filter-main" >
    <div class="container">
      <div class="row">

        <div class="col-12 ">
          <div class="row justify-content-between align-items-center">
            <nuxt-link  class="p-3 col-6 link-main-categories"
                        :class="item.value === 'engagement_rings' ? 'active' : ''"
                        v-for="item in categories_list"
                        :key="item.id"
                        :to="{name: item.link ,
                         params: { id: item.id} }" > {{item.label}}</nuxt-link>
          </div>
        </div>
      </div>
    </div>

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
