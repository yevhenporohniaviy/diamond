<template>
  <div v-if="itemNew.news">
    <div class="container position-relative p-0">
      <div class="banner-blog">
        <div class="navigation">
          <!--<nuxt-link to="/blog/latest_news" class="back-btn"><span><img src="~assets/img/Combined_Shape.png"> </span>back</nuxt-link>-->

          <div class="row justify-content-center">
            <div class="col-12">
              <div class="title-article">{{itemNew.news.title}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-3">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10">
          <div class="article-image">
            <img :src="baseUrl+itemNew.news.images" class="img-fluid" />
          </div>
        </div>
        <div class="col-12 col-md-10 my-3">
          <div class="row justify-content-between align-items-center">
            <div class="col-12 col-md-6">
              <div
                class="article-data my-2"
              >Date: {{itemNew.news.publish_date | moment("dddd, Do MMMM YYYY")}}</div>
            </div>
            <div class="col-12 col-md-6">
              <div class="d-flex justify-content-end">
                <!-- Facebook Share -->
                <social-sharing
                  class="share-button"
                  :url="shareUrl"
                  inline-template>
                    <network network="facebook">
                      <img src="~assets/img/sharing/fb-db-circle.png" class="img-fluid" />
                    </network>
                </social-sharing>
                <!-- <button
                  class="share-button st-custom-button"
                  data-network="facebook"
                  :data-url="shareUrl">
                  <img src="~assets/img/sharing/fb-db-circle.png" class="img-fluid" />
                </button> -->
                <!-- Instagram Share -->
                <!-- <social-sharing
                  class="share-button"
                  :url="shareUrl"
                  inline-template>
                    <network network="instapaper">
                      <img src="~assets/img/sharing/ig-db-circle.png" class="img-fluid" />
                    </network>
                </social-sharing> -->
                <button
                  class="share-button st-custom-button"
                  data-network="instapaper"
                  :data-url="shareUrl">
                  <img src="~assets/img/sharing/ig-db-circle.png" class="img-fluid" />
                </button>
                <!-- Instagram Share -->
                <!-- Linkedin Share -->
                <social-sharing
                  class="share-button"
                  :url="shareUrl"
                  inline-template>
                    <network network="linkedin">
                      <img src="~assets/img/sharing/in-db-circle.png" class="img-fluid" />
                    </network>
                </social-sharing>
                <!-- Pinterest Share -->
                <social-sharing
                  class="share-button"
                  :url="shareUrl"
                  inline-template>
                    <network network="pinterest">
                      <img src="~assets/img/sharing/pinterest-db-circle.png" class="img-fluid" />
                    </network>
                </social-sharing>
                <!-- Twitter Share -->
                <social-sharing
                  class="share-button"
                  :url="shareUrl"
                  inline-template>
                    <network network="twitter">
                      <img src="~assets/img/sharing/twitter-db-circle.png" class="img-fluid" />
                    </network>
                </social-sharing>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-10">
          <div class="article-text">
            <p class="description" v-html="itemNew.news.content"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12 text-center mb-5">
          <Emblem />
        </div>
      </div>
    </div>
    <div class="container mb-5">
      <div class="col-12">
        <div class="text-center article-section-title mb-5">Related Articles</div>

        <div class="row">
          <div
            class="col-12 col-md-4 article-card"
            v-for="item in itemNew.latest.data"
            :key="item.id"
          >
            <div class="news">
              <div v-if="item.images">
                <img class="card-img-top" :src="baseUrl + item.images" alt="Card image cap" />
              </div>

              <div class="card-body">
                <h5 class="card-title">{{ item.title }}</h5>
                <div class="line-img"></div>

                <p class="card-text">{{item.summary}}</p>
                <nuxt-link
                  class="detail-link type-article"
                  :to="{name: 'blog-id', params: { id: item.id} }"
                >READ ARTICLE</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Share Scripts -->
    <!-- <script type="text/javascript" src="https://platform-api.sharethis.com/js/sharethis.js#property=5e6a0dec7dbd790012fb1c91&product=inline-share-buttons" async="async"></script>
    <script type="text/javascript" src="//platform-api.sharethis.com/js/sharethis.js#property=#{property?._id}&product=custom-share-buttons"></script> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Emblem from "~/components/Elements/Icons/EmblemBlog";

export default {
  data() {
    return {
      shareUrl: '/blog/5'
    };
  },
  head() {
    return {
      title: this.itemNew.news ? this.itemNew.news.title : "default",
      meta: [
        {
          hid: "og:title",
          property: "og:title",
          content: this.itemNew.news ? this.itemNew.news.title : "default"
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.itemNew.news
            ? this.baseUrl + this.itemNew.news.images
            : ""
        },
        { hid: "og:image:height", property: "og:image:height", content: "200" },
        { hid: "og:image:width", property: "og:image:width", content: "200" }
      ]
    };
  },
  components: {
    Emblem
  },
  methods: {
    checkShareUrl() {
      // Check Share Url
      this.shareUrl = window.location.origin;
    }
  },
  computed: {
    ...mapGetters(["itemNew"])
  },
  beforeCreate() {
    this.$store.dispatch("fetchNew", this.$route.params.id)
  },
  beforeUpdate() {
    this.checkShareUrl();
  }
};
</script>

<style lang="scss">
  .share-button {
    background-color: transparent;
    border: none;
    outline: none;
    padding: 0;
    margin: 0 5px;
    cursor: pointer;

    img {
      width: 40px;
      height: 40px;
    }
  }
</style>
