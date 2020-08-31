<template>

    <div  class="search-form-menu"  >
      <div class="input-group group">
        <div class="input-group-prepend" >
          <button class="btn "  @click="searchValue" >
            <img src="~assets/img/search_icon.png" class="img-fluid">
          </button>
        </div>
        <input type="text" class="form-control" id="search-value" name="search-value" v-model="search" aria-describedby="basic-addon1" >

        <div class="close-search" @click="isHidden = false">
          <img src="~assets/img/default/close-search.png" class="img-fluid">
        </div>

      </div>
    </div>

</template>

<script>
  import SearchIconHome from './Icons/SearchIcon'
  import PhoneIconHome from './Icons/PhoneIcon'
  import ProfileIconHome from './Icons/ProfileIcon'
  import SavedIconHome from './Icons/SavedIcon'
  import SavedIconHomeAdded from './Icons/SavedAddIcon.vue'
  import BagIconHome from './Icons/BagIcon'
  import BagIconHomeAdded from './Icons/BagAddedIcon'
  import BurgerIconHome from './Icons/BurgerIcon'
  import SubMenuElements from './SubMenuElements'
  import isOnline from './isOnline'
  import isOffline from './isOffline'
  import {mapGetters} from 'vuex'

  export default {

    data() {
      return {

        search: '' ,
      };
    },

    methods:{
      searchValue(){
        if(this.search !== "") {
          this.$store.dispatch('fetchSearch', {params: {query: this.search, page: 1}, alias: 'product'})
          this.$router.push({path: 'search'})
        }
      },
    },


  }
</script>
