<template>
 <div class="container" id="search-section">
   <div class="row justify-content-between align-items-center header">
     <div class="col-md-6 col-12">
       <div class="header-search">
         <div class="breadcrumb-search">
           <span>Home</span>
            >
           <span>Search</span>
         </div>
       </div>
     </div>
     <div class="col-md-6 col-12">
       <form @submit.prevent="searchValue()" class="search-form">
         <div class="input-group group">
           <div class="input-group-prepend">
             <button class="btn btn-outline-secondary" type="submit"><img src="~assets/img/search_icon.png" class="img-fluid"></button>
           </div>
           <input type="text" class="form-control" v-model="search" aria-describedby="basic-addon1">
         </div>
       </form>
     </div>
   </div>
   <div class="row justify-content-between align-items-center mb-4">
     <div class="col-md-6 col-12">
       <div class="header-result">
         <div class="breadcrumb-result">
           <span>Search results:</span>
           <span> {{search_result}}</span>
         </div>
       </div>
     </div>
     <div class="col-md-6 col-12">
       <div class="count-result">Results: <span>{{total_results}}</span></div>
     </div>
   </div>
   <hr>
   <no-ssr>
     <div class="col-md-12">
       <div class="row">
         <el-tabs type="card" class="categories-search" v-model="tabs">

             <el-tab-pane :label="elem.label" v-for="(elem,index) in alias" :key="index" :name="elem.alias">
                <div v-if="loadding">
                  <div class="my-5 d-flex justify-content-center align-items-center">
                      <img src="~assets/img/4V0b.gif" class="img-fluid">
                  </div>
                </div>
                <div class="col-12" v-else>

                  <div class="row"  v-if="result_search.length" >

                      <div class="col-lg-4 col-xl-3 col-md-6 col-sm-4 col-12 default-diamond-item category-item-default"
                           data-aos="zoom-in"
                           v-for="(post,index ) in result_search"
                           :key="index"
                           v-if="tabs === 'product'">
                        <ring-item v-if="post.type === 'jewellery'" :post="rebuildJewellery(post)"/>
                        <diamond-item v-if="post.type === 'diamond'" :key="post.referenceNum" :post="rebuildDiamond(post)"/>

                      </div>
                      <div class="card-columns cards-news-guids my-5" data-aos="fade-up" v-if="tabs === 'guides'" >

                        <div v-for="post in result_search" :key="post.id" class="card " v-if="post.guides.length">

                          <guid-item  :key="post.id" :post="post" />

                        </div>
                      </div>
                      <div class="card-columns cards-news-search my-5" data-aos="fade-up" v-if="tabs === 'blog'">
                        <div v-for="post in result_search" :key="post.id" class="card ">

                          <blog-item :key="post.id" :post="post" />

                        </div>
                      </div>
                    <div class="col-12">
                      <div class="row justify-content-center align-items-center">
                        <div @click="getList(++page)"  v-if="setMore" class="load_more-search text-center">load more</div>
                      </div>
                    </div>

                  </div>

                  <div v-else>
                    <div class="loading_search_result my-5 d-flex justify-content-center align-items-center">not found</div>
                  </div>

                </div>

             </el-tab-pane>
         </el-tabs>


       </div>
     </div>

   </no-ssr>
 </div>
</template>


<script>
  import diamondItem from '~/components/Search/diamondItem'
  import ringItem from '~/components/Search/ringItem'
  import blogItem from '~/components/Search/blogItem'
  import guidItem from '~/components/Search/guidItem'

  import {mapGetters} from 'vuex'

  export default {
    props: {
      widget: Object,
    },
    head() {
      return {
        title: this.itemMeta.meta_title ? this.itemMeta.meta_title : '',
        meta: [
          {hid: 'og:title', property: 'og:title', content:  this.itemMeta.meta_title ? this.itemMeta.meta_title : '' },
          {hid: 'og:description', property: 'og:description', content:  this.itemMeta.meta_description ? this.itemMeta.meta_description : ''},
          {hid: 'og:image', property: 'og:image', content: this.itemMeta.meta_image ? this.itemMeta.meta_image : ''},
          {hid: 'og:image:url ', property: 'og:image:url', content:  this.itemMeta.meta_image ? this.itemMeta.meta_image : ''},
          {hid: 'og:image:height', property: 'og:image:height', content: '200'},
          {hid: 'og:image:width', property: 'og:image:width', content: '200'},
        ]
      }
    },
    data() {
      return {
        search:'' ,
        list_response: [],
        loadding: false,
        tabs: 'product',
        page: 1,
        alias: [
          {
            label: 'products',
            alias: 'product'
          },
          {
            label: 'guides',
            alias: 'guides'
          },
          {
            label: 'blog',
            alias: 'blog'
          }
        ]
      };
    },
    components: {
      diamondItem,
      ringItem,
      blogItem,
      guidItem
    },
    computed: {
      ...mapGetters(['result_search','total_results','gstCount', 'markupValue','value_search','itemMeta','data_pagin']),
      search_result(){
        return this.value_search || ''
      },
      setMore(){
        return this.page < (this.total_results/this.data_pagin.per_page )
      }
    },
    watch: {
      tabs(){
        this.searchValue();
      }
    },
    methods: {
      async getList(page){
        this.$store.dispatch('fetchSearchPagin', { params: {query: this.search || this.value_search  , page: page} , alias: this.tabs});
      },
      async searchValue(){
        this.loadding = true;
        this.$store.dispatch('fetchSearch', { params: {query: this.search || this.value_search  , page: 1} , alias: this.tabs})
          .then(() => {
            this.loadding = false;
          })
      },
      rebuildJewellery(item){

        let price = item.price;

        let jewellery  = {
          item_id: item.item_number,
          count: 1,
          price: price,
          price_gst: price*this.gstCount,
          item_type: 'j',
          item_details: item
        }
        return jewellery
      },
      rebuildDiamond(item){
        let price = item.price;
        let custom_price = item.custom_price || 0;
        let aud_price = item.price_aud || 0;
        let markUp = this.currentMarkup(price, custom_price, aud_price);
        let diamond  = {
          item_id: item.referenceNum,
          count: 1,
          price: markUp,
          price_gst: markUp*this.gstCount,
          item_type: 'd',
          item_details: item
        }
        return diamond
      },
      currentMarkup(price, custom, aud){

        let value = custom || aud;
        if (custom !== null && custom > 0) {

          //Convert custom price from aud into usd to get right margin and shipping price
          price = custom * (price / aud)
        }
        let current_price = custom || aud;
        this.markupValue.find(item => {
          if(item.from_price <= price && item.to_price >= price){

            value = (current_price /((100 - item.percent.max)/100)) + item.shipping_price || 0
          }
        })
        return value

      },
    },
    created() {
      this.$store.dispatch('fetchMeta', 'search' );
    },
    beforeRouteLeave(to, from, next){
      this.$store.dispatch('clearStoreSearch' );

      next();
    }
  }
</script>

<style lang="scss">
  .load_more-search{
    margin-top: 50px;
    cursor: pointer;
    color: #ffffff;
    font-family: lato-bold;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 3.1px;
    text-transform: uppercase;
    text-decoration: none;
    padding: 12px 45px;
    width: 300px;
    background-color: #24354f;
  }
  .loading_search_result{
    color: #24354f;
    font-family: lato-reg;
    font-size: 24px;
    letter-spacing: 1.93px;
    line-height: 24px;
    text-align: center;
    text-transform: uppercase;
  }
  #search-section{
    .header{
      margin-top: 50px;
      margin-bottom: 50px;
      @media(max-width:525px){
        margin-top: 20px;
        margin-bottom: 40px;
      }
      .header-search{
        @media(max-width:525px){
          margin-bottom: 20px;
        }
        .breadcrumb-search{
          display: flex;
          align-items: center;
          font-size: 13px;
          color: #24354f;
          span{
            &:first-child{
              margin-right: 10px;
            }
            &:last-child{
              font-family: lato-bold;
              margin: 0 10px;
            }
            color: #24354f;
            font-family: lato-reg;
            font-size: 15px;
            letter-spacing: 3.88px;
            line-height: 24px;
            text-transform: uppercase;
            text-decoration: none;
          }
        }
      }
      .search-form{
        .group{
          display: flex;
          align-items: center;
          justify-content: flex-end;
          button{
            border: none;
            border-bottom: 1px solid #e8f2fa;
            border-radius: 0;
            &:hover,
            &:active,
            &:focus{
              box-shadow: none;
              outline: none;
              color: black;
              background-color: transparent;
            }
          }
          input{
            border-radius: 0;
            width: 540px;
            @media(max-width:525px){
              width: 80%;
            }
            border: none;
            border-bottom: 1px solid #e8f2fa;
            color: #24354f;
            font-family: lato-reg;
            font-size: 15px;
            line-height: 24px;
            padding: 0;
          }
        }
      }
    }
    .header-result{
      .breadcrumb-result{
        span {
          &:first-child {
            opacity: 0.4;
            color: #24354f;
            font-family: lato-reg;
            font-size: 23px;
            line-height: 24px;

          }

          &:last-child {
            margin: 0 25px;
            color: #24354f;
            font-family: lato-bold;
            font-size: 23px;
            line-height: 24px;

          }
        }
      }
    }
    .count-result{
      color: #27344E;
      font-family: lato-light;
      font-size: 12px;
      font-weight: 300;
      letter-spacing: 0.76px;
      line-height: 14px;
      text-align: right;
      @media(max-width:525px){
        text-align: inherit;
        margin-top: 20px;
      }
      span{
        margin-left: 10px;
        font-size: 14px;
        font-family: lato-bold;
      }
    }

  }
  .categories-search{
    width: 100%;
    margin-top: 30px;
    margin-bottom: 50px;
    .el-tabs__header{
      border: none;
      margin: 0;
      margin-bottom: 50px;
      .el-tabs__nav{
        display: flex;
        @media(max-width:525px){
          display: block;
          width: 100%;
        }
        border: none;
        .el-tabs__item{
          @media(max-width:1024px){
            width: 180px;
          }
          @media(max-width:766px){
            width: 120px;
          }
          @media(max-width:525px){
            margin-right: 0;
            margin-bottom: 20px;
            width: 100%;
          }
          margin-right: 20px;
          width: 240px;
          height: 48px;
          background-color: #24354f;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #ffffff;
          font-family: lato-reg;
          font-size: 14px;
          letter-spacing: 1.17px;
          text-transform: uppercase;
          &.is-active{
            border: 1px solid #24354f;
            background-color: transparent;
            color: #24354f;

          }
        }
      }
    }

  }

</style>
