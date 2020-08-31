<template>
  <div class="position-relative">
    <section id="header-inspired">
      <div class="container">
        <div class="row">
          <div class="banner-inspired position-relative">
            <img class="img-fluid img-bg" src="~assets/img/img-inspired.png" />
            <div class="img-bg-layer"></div>
            <div class="title">GET INSPIRED</div>
            <div class="description position-absolute">
              <div class="tag">#diamondemporium</div>
              <div class="sub-title">
                Get inspired by exploring whats trending.
                <br />Collect images to your board so that your consultant can be inspired too.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="list-inspired">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-10 offset-md-1">
            <div class="row" v-if="allFeeds.data">
              <div class="col-6 col-md-4" v-for="(feed,index) in allFeeds.data" :key="index">
                <div class="card-inpired" v-if="feed.data">
                  <div class="col-12 col-md-12 p-0" @click="openFeed(feed)" v-if="feed.data.images">
                    <img
                      class="img-fluid inspired-image"
                      :src="feed.data.images.standard_resolution.url"
                    />
                  </div>
                  <div class="social-inpired">
                    <div class="col-12 col-md-12">
                      <div class="row justify-content-between">
                        <div class="col-6 col-md-6 save-inspired">
                          <button @click="addToFavorites(feed)">
                            <img src="~assets/img/like.png" />save
                          </button>
                        </div>
                        <div class="col-6 col-md-6 share-inspired">
                          <button @click="openSharing(feed)">
                            <img src="~assets/img/share.png" />Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <el-dialog title :visible.sync="modalSave" center custom-class="modalSave">
      <div class="container" v-if="feed_modal.data">
        <div class="row">
          <div class="col-12 col-md-12">
            <div class="row">
              <div class="col-12 col-md-6 d-block d-md-none">
                <div class="info" v-if="feed_modal.data.user">
                  <div class="head-info">
                    <div class="logo">
                      <img
                        class="img-fluid rounded-circle"
                        :src="feed_modal.data.user.profile_picture"
                      />
                    </div>
                    <div class="description">
                      <div class="title">{{feed_modal.data.user.username}}</div>
                      <div class="tag">{{feed_modal.data.user.tags}}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-7 modal-image-save" v-if="feed_modal.data.images">
                <img class="img-fluid w-100" :src="feed_modal.data.images.standard_resolution.url" />
              </div>
              <div class="col-12 col-md-5">
                <div class="info" v-if="feed_modal.data.user">
                  <div class="d-none d-md-block">
                    <div class="head-info">
                      <div class="logo">
                        <img
                          class="img-fluid rounded-circle"
                          :src="feed_modal.data.user.profile_picture"
                        />
                      </div>
                      <div class="description">
                        <div class="title">{{feed_modal.data.user.username}}</div>
                        <div v-if="feed_modal.data.tags">
                          <div
                            class="tag"
                            v-for="(item, index) in feed_modal.data.tags"
                            :key="index"
                          >{{item}}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="count-info">
                    <div
                      class="likes"
                      v-if="feed_modal.data.likes"
                    >{{feed_modal.data.likes.count}} likes</div>
                    <div class="datepick">{{getDate(feed_modal.data.created_time)}} days ago</div>
                  </div>
                  <div class="comment-info" v-if="feed_modal.data.caption">
                    <div class="text">{{feed_modal.data.caption.text}}</div>
                  </div>
                  <div class="link-info">
                    <a :href="feed_modal.data.link">view post</a>
                  </div>
                  <div class="group-info">
                    <div class="social-inpired">
                      <div class="col-12 col-md-12">
                        <div class="row justify-content-between">
                          <div class="col-6 col-md-6 save-inspired">
                            <button @click="confirmSave = true">
                              <img src="~assets/img/like.png" />save
                            </button>
                          </div>
                          <div class="col-6 col-md-6 share-inspired">
                            <button @click="openSharing(feed_modal)">
                              <img src="~assets/img/share.png" />Share
                            </button>
                            <!-- <div @click="openShareModal()">Share</div> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>


    <el-dialog :visible.sync="confirmSave" center :show-close="false" custom-class="confirmSave">
      <div class="container">
        <div class="col-12 col-md-10 offset-md-1">
          <div class="title mt-3 col-12 col-md-8 offset-md-2">save</div>
          <div class="description text-center">
            Please login or sign up for a
            <br />Diamond Emporium account to save items.
          </div>
          <div class="social-action">
            <a href="#" class="log-btn">login</a>
            <a href="#" class="sing-btn">Sing up</a>
          </div>
          <div class="d-flex justify-content-center">
            <el-button @click="confirmSave = false" class="close-btn">Cancel</el-button>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- Share Modal -->
    <el-dialog :visible.sync="showSharing"
               center
               :show-close="false"
               custom-class="modalSharing">
      <ModalSharing :data="this.dataSharing.id" :type="this.dataSharing.type" @close-sharing="closeSharing"/>
    </el-dialog>  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

// Share Modal Component
import ModalSharing from '~/components/ModalSharing';

export default {
  head() {
    return {
      title: this.itemMeta.meta_title ? this.itemMeta.meta_title : "",
      meta: [
        {
          hid: "og:title",
          property: "og:title",
          content: this.itemMeta.meta_title ? this.itemMeta.meta_title : ""
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.itemMeta.meta_description
            ? this.itemMeta.meta_description
            : ""
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.itemMeta.meta_image ? this.itemMeta.meta_image : ""
        },
        {
          hid: "og:image:url ",
          property: "og:image:url",
          content: this.itemMeta.meta_image ? this.itemMeta.meta_image : ""
        },
        { hid: "og:image:height", property: "og:image:height", content: "200" },
        { hid: "og:image:width", property: "og:image:width", content: "200" }
      ]
    };
  },
  data() {
    return {
      dataSharing:{},
      modalSave: false,
      modalShare: false,
      confirmSave: false,
      feed_modal: {},
      filters: {
        page: 1
      },
      showSharing: false
    };
  },
  components: {
    ModalSharing
  },
  computed: {
    ...mapGetters(["allFeeds", "itemMeta"])
  },
  methods: {
    openSharing(feed){
      this.dataSharing = {
        id: feed.data.link,
        type: 'inst'
      }

      this.showSharing = true
    },
    closeSharing(){
      this.showSharing = false
    },
    scroll() {
      window.onscroll = () => {
        if (
          this.filters.page === 1 &&
          document.documentElement.scrollTop + window.innerHeight >=
            document.documentElement.offsetHeight - 600
        ) {
          this.getList();
        }
        if (
          document.documentElement.scrollTop + window.innerHeight >=
            document.documentElement.offsetHeight - 1 &&
          this.allFeeds.next_page_url !== null
        ) {
          this.getList();
        }
      };
    },
    getList() {
      this.filters.page++;
      this.$store.dispatch("fetchInstagramFeeds", this.filters);
    },
    getDate(time) {
      var d = new Date();
      var x = new Date(time * 1000);
      var future = moment(d);
      var start = moment(x);
      return (d = future.diff(start, "days"));
    },
    openFeed(feed) {
      this.feed_modal = Object.assign({}, feed);
      this.modalSave = true;
    },
    addToFavorites(item) {
      let post = {
        item_id: null,
        item_type: "p",
        item_details: {
          images: {
            main: item.data.images.standard_resolution.url
          }
        }
      };
      this.$store.dispatch("addToFavorites", post)
        .then((resp) => {
          this.$notify({
            title: 'Success',
            message: 'This item has been added to favorites ',
            type: 'success'
          });
        })
        .catch(error => {
          this.$notify({
            title: 'Attention',
            message: 'This item has been already saved',
            type: 'warning'
          });
        });
    }
  },
  mounted() {
    this.scroll();
  },
  created() {
    this.$store.dispatch("fetchInstagramFeeds");
    this.$store.dispatch("fetchMeta", "instagram");
  }
};
</script>

