<template>
      <div class="news">
        <div v-show="post.images">
          <img class="card-img-top" :src="baseUrl + post.images" alt="Card image cap">
        </div>
        <div class="card-body">
          <div class="card-title">{{ post.title }}</div>
          <div class="card-text" v-html="post.description">
          </div>
          <nuxt-link class="detail-link type-article" :to="{name: 'blog-id', params: { id: post.id} }">READ more
          </nuxt-link>
        </div>
      </div>
</template>

<script>

  export default {
    props: {
      post: Object
    },
    data() {
      return {

      }
    },
  }
</script>


<style lang="scss">
  .cards-news-search {
    .card {
      border: none;
      padding: 15px;

      .news {

        .card-img-top {
          height: 250px;
          object-fit: cover;
          border-radius: 0;
        }

        .card-body {
          padding: 0;
          .detail-link {
            color: #24354f;
            font-family: lato-bold;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 3.1px;
            text-transform: uppercase;

            text-decoration: none;
            border-bottom: 3px solid #24354f;
            padding-bottom: 10px;
            float: right;

          }

          .line-img {
            width: 26px;
            height: 2px;
            background-color: #80b8e6;
            margin-bottom: 24px;
          }

          .card-title {
            color: #000000;
            font-family: lato-reg;
            font-size: 40px;
            font-weight: 400;
            text-transform: uppercase;
          }

          .card-text {
            color: #000000;
            font-family: lato-reg;
            font-size: 12px;
            font-weight: 400;
            line-height: 16px;
          }
        }
      }
    }
  }
</style>
