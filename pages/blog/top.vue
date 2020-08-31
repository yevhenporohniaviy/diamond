<template>
 <div>

   <div class="container" id="list_latest_news">
     <div class="col-12 col-md-10 offset-md-1">
       <no-ssr>
       <div class="card-columns cards-news my-5" data-aos="fade-up" v-if="news.data">
         <div class="card " v-for="item in news.data" :key="item.id">
           <div class="news">
             <div v-if="item.images">
               <img class="card-img-top" :src="baseUrl + item.images" alt="Card image cap" >
             </div>
             <div class="card-body">
               <div class="card-title">{{ item.title }}</div>
               <div class="line-img"></div>
               <div class="card-text" > {{item.summary}}</div>
               <nuxt-link class="detail-link type-article" :to="{name: 'blog-id', params: { id: item.id} }">READ ARTICLE</nuxt-link>
             </div>
           </div>
         </div>
       </div>
         </no-ssr>
     </div>

     <div class="col-12 text-center my-5">
       <Emblem/>
     </div>
   </div>
 </div>
</template>

<script>
  import Emblem from '~/components/Elements/Icons/EmblemBlog'

  export default {
    name: 'top',
    layout: 'blog',
    components: {
      Emblem
    },
    head() {
      return {
        titleTemplate: '%s - Top stories',
      }
    },
    data() {
      return {


      }
    },
    async asyncData({store, params}) {
      let payload = {
        type: params.type || 'top'
      }
      const news = await store.dispatch('fetchNews', payload);
      return { news: news, };

    },
  }
</script>

