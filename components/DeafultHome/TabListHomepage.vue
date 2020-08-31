<template>
  <div class="container-fluid"  id="tabs-list-structure">

    <div class="row">
      <div class="container my-5">
        <div class="col-12 text-center">
          <div class="title-list mb-2">
            {{widget.data.title.en}}
          </div>
          <div class="subtitle-list">
            {{widget.data.description.en}}
          </div>
        </div>
      <div id="tabs-list" v-if="widget.styles">
        <el-select v-model="activeSelect"  popper-class="tabs-list-structure-select" placeholder="Select" id="tabs-list-mob" class="d-block d-md-none  " @change="changeCategory" >
          <el-option class="text-center "
                     v-if="categori.jewellery.length"
                     v-for="categori in widget.styles"
                     :key="categori.id"
                     default-first-option
                     :label="categori.title"
                     :value="categori.alias">
            {{categori.title}}
          </el-option>
        </el-select>
        <el-tabs v-model="currentName">
          <el-tab-pane :label="list.title"
                       :name="list.alias"
                       v-for="list in widget.styles"
                       :key="list.id"
                       v-if="list.jewellery.length"
                       lazy>
            <div class="block d-block d-md-none" v-if="list.jewellery">

              <slick :options="slickOptions"  ref="slick" >
                  <div class="carousel-cell" v-for="item in list.jewellery" :key="item.id">
                    <div class="card-diamond" v-if="item.images">
                      <img class="img-fluid" :src="baseUrl+item.images.main.image">
                      <div class="title">{{item.title}}</div>

                      <nuxt-link :to="{name: 'categories-id', params: { id: item.id} }" class="detaia mb-4">
                        view details
                      </nuxt-link>
                    </div>
                  </div>
              </slick>


            </div>
            <div class="col-10 offset-1 mt-5 d-none d-md-block">
              <div class="row justify-content-center " v-if="list.jewellery">

                <div class="col-12 col-md-3"  v-for="item in list.jewellery" :key="item.id">
                  <div class="card-diamond " v-if="item.images">
                    <img class="img-fluid" :src="baseUrl+item.images.main.image">
                    <div class="title">{{item.title}}
                    </div>
                    <nuxt-link :to="{name: 'categories-id', params: { id: item.id} }" class="detaia ">
                      view details
                    </nuxt-link>

                  </div>
                </div>

              </div>
            </div>

          </el-tab-pane>

        </el-tabs>
      </div>

        <div class="col-12">
          <div class="row justify-content-center">
            <div class="d-flex justify-content-center browse-more" v-if="widget.data.main_button_url">

            <div v-if="widget.data.main_button_url.isExternal">
              <a :href="widget.data.main_button_url.en" class=" text-center">
                {{widget.data.main_button_text.en}}
              </a>
            </div>
              <div v-else>
                <nuxt-link :to="{name: 'dynamic-pages-id', params: { id: widget.data.main_button_url.en } }" class=" text-center">
                  {{widget.data.main_button_text.en}}
                </nuxt-link>
              </div>
          </div>
        </div>
        </div>
        <div class="diamond-links-tabs text-center" data-aos="fade-up" v-if="widget.data.left_button_url.en && widget.data.right_button_url.en">

          <div class="link-tab" v-if="widget.data.left_button_url.isExternal">
            <a :href="widget.data.left_button_url.en" class=" text-center">
              {{widget.data.left_button_text.en}}
            </a>
          </div>
          <div class="link-tab" v-else>
            <nuxt-link :to="{name: 'dynamic-pages-id', params: { id: widget.data.left_button_url.en } }" class=" text-center">
              {{widget.data.left_button_text.en}}
            </nuxt-link>
          </div>

          <span class="mx-4 d-none d-md-block"> / </span>

          <div class="link-tab"  v-if="widget.data.right_button_url.isExternal">
            <a :href="widget.data.right_button_url.en" class=" text-center">
              {{widget.data.right_button_text.en}}
            </a>
          </div>
          <div class="link-tab" v-else>
            <nuxt-link :to="{name: 'dynamic-pages-id', params: { id: widget.data.right_button_url.en } }" class=" text-center">
              {{widget.data.right_button_text.en}}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>


<script>

  export default {
    props: {
      widget: Object,
    },
    data() {
      return {

        slickOptions: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          prevArrow:"<button type='button' class='slick-prev pull-left'></button>",
          nextArrow:"<button type='button' class='slick-next pull-right'></button>"
        },
        currentName: '',
        activeSelect: ''
      };
    },
    methods:{
      changeCategory(){
        this.currentName = this.activeSelect
      },
      setCategory(){
        this.activeSelect = this.widget.styles[0].alias
        this.currentName = this.widget.styles[0].alias
        this.$forceUpdate();
      },

    },
    created() {
     this.setCategory();
    },
  }
</script>
<style lang="scss">
  .slick-slide {
    margin: 0 9px;
  }
  /* the parent */
  .slick-list {
    margin: 0 -9px;
  }

  .slick-prev{
    z-index: 999;
    transform: rotate(180deg);
  &:focus{
     outline: none;
   }
  width: 40px;
  background: none;
  border: none;
  position: absolute;
  left: -40px;
  top: 33%;
  &:before {

     content: url('~assets/img/slider-arrow.png');
   }
  }
  .slick-next{
    z-index: 999;
  &:focus{
     outline: none;
   }
  width: 40px;
  background: none;
  border: none;
  position: absolute;
  right: -45px;
  top: 33%;
  &:before {
     content: url('~assets/img/slider-arrow.png');
   }
  }

</style>

