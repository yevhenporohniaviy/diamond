<template>

      <div class="sub-menu-component">
        <el-menu-item class="d-none d-xl-block"
          v-for="(menuItem) in menu"
                      :key="menuItem.id"
          v-if="menuItem.children.length < 1"
          :index="menuItem.id.toString()">
          <nuxt-link :to="{name: 'diamonds' }" v-if="menuItem.alias === 'diamonds'"> {{menuItem.title}} </nuxt-link>
          <nuxt-link :to="{name: 'jewellery' }" v-else-if="menuItem.alias === 'fine_jewellery'"> {{menuItem.title}} </nuxt-link>
          <nuxt-link :to="{name: 'dynamic-pages-id', params: { id: menuItem.content.alias } }" v-else-if="menuItem.content_type === 'pages' && menuItem.content"> {{menuItem.title}} </nuxt-link>
          <nuxt-link :to="{name: 'categories-category-id', params: { id: menuItem.alias }}" v-else> {{menuItem.title}} </nuxt-link>

        </el-menu-item>
        <el-submenu :popper-append-to-body="true" v-else :index="menuItem.id.toString()" class="d-none d-xl-block">

          <template slot="title">
            <nuxt-link :to="{name: 'jewellery' }" v-if="menuItem.alias === 'fine_jewellery'"> {{menuItem.title}} </nuxt-link>
            <a href="javascript:void(0);" v-else> {{menuItem.title}} </a>
          </template>

          <sub-menu-elements
            :menu.sync="menuItem.children">
          </sub-menu-elements>
        </el-submenu>
      </div>

</template>
<script>


  export default {
    name: 'SubMenuElements',
    props: {
      data: {
        type: Object
      },
      menu: {
        type: [Object, Array]
      },
      index: {
        type: Object
      }
    },
    components: {

    },
    data () {
      return {

      }
    }
  }
</script>
