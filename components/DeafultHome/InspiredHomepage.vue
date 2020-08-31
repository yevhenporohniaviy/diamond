<template>
  <div class="container-fluid" id="inspired_section">
    <div class="row">
      <div class="container p-0">
        <div class="">
          <div class=" text-center inspired-description" >
            <div class="title-inspired mb-5" >
              {{widget.title.en}}
            </div>
            <a href="" target="_blank" class="link-inspired"  >
              FOLLOW US ON INSTAGRAM
            </a>
          </div>
          <div class="inspired-image-box" >

              <slick id="carouselInstagramHome" :options="slickOptions">
                <div class="slide inspired_box" v-for="(feed,index) in inst" :key="index">
                  <div v-if="feed.data">
                    <div v-if="feed.data.images">
                      <img class="img-fluid" :src="feed.data.images.standard_resolution.url"  @click="openFeed(feed)">
                    </div>
                  </div>
                </div>
              </slick>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title=""
      :visible.sync="modalSave"
      center
      custom-class="modalSave">
      <div class="container" v-if="feed_modal.data">
        <div class="row">
          <div class="col-12 col-md-12">
            <div class="row">
              <div class="col-12 col-md-6 d-block d-md-none">
                <div class="info " v-if="feed_modal.data.user">
                  <div class="head-info">
                    <div class="logo" >
                      <img class="img-fluid rounded-circle" :src="feed_modal.data.user.profile_picture">
                    </div>
                    <div class="description">
                      <div class="title">{{feed_modal.data.user.username}}</div>
                      <div class="tag">{{feed_modal.data.user.tags}}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-7 modal-image-save" v-if="feed_modal.data.images">
                <img class="img-fluid w-100 " :src="feed_modal.data.images.standard_resolution.url">
              </div>
              <div class="col-12 col-md-5 ">
                <div class="info" v-if="feed_modal.data.user">
                  <div class=" d-none d-md-block">
                    <div class="head-info">
                      <div class="logo" >
                        <img class="img-fluid rounded-circle" :src="feed_modal.data.user.profile_picture" >
                      </div>
                      <div class="description">
                        <div class="title">{{feed_modal.data.user.username}}</div>
                        <div v-if="feed_modal.data.tags">
                          <div class="tag" v-for="(item, index) in feed_modal.data.tags" :key="index">
                            {{item}}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div class="count-info">
                    <div class="likes" v-if="feed_modal.data.likes">
                      {{feed_modal.data.likes.count}} likes
                    </div>
                    <div class="datepick">
                      {{getDate(feed_modal.data.created_time)}} days ago
                    </div>
                  </div>
                  <div class="comment-info" v-if="feed_modal.data.caption">
                    <div class="text"  >
                      {{feed_modal.data.caption.text}}
                    </div>
                  </div>
                  <div class="link-info">
                    <a :href="feed_modal.data.link">view post</a>
                  </div>
                  <div class="group-info">
                    <div class="social-inpired">
                      <div class="col-12 col-md-12">
                        <div class="row justify-content-between">
                          <div class="col-6 col-md-6 save-inspired">
                            <button @click="confirmSave = true"><img src="~assets/img/like.png">save</button>
                          </div>
                          <div class="col-6 col-md-6 share-inspired">
                            <button @click="modalShare = true"><img src="~assets/img/share.png">share</button>
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
  </div>
</template>
<script>

  import {mapGetters} from 'vuex'
  import moment from 'moment'

  export default{
    props: {
      widget: Object,
      inst: Array
    },
    data() {
      return {

        limit: 4,
        feed_modal: {},
        modalSave: false,
        link_instagram:'',
        slickOptions: {
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            }
          ]
        },
      }
    },
    methods:{
      getDate (time){
        var d = new Date();
        var x = new Date(time*1000);
        var future = moment(d);
        var start = moment(x);
        return d = future.diff(start, 'days');

      },
      openFeed(feed) {
        this.feed_modal = Object.assign({}, feed)
        this.modalSave = true
      },
    },
  }
</script>
