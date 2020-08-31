<template>
  <div>
    <div class="container-fluid" id="footer">
      <footer class="container">
        <section id="first-path">
          <div class="row">
            <div class="col-lg-6 col-sm-12 col-12">
              <div class="logo_icon-footer" style="width: 31px;overflow:hidden">
                <!-- <img src="~assets/img/Logo_foot.png" /> -->
                <LogoDefault/>
              </div>
              <div
                class="contact-info"
                v-html="footerWidget.content_text"
              ></div>
              <div class="row px-4">
                <div class="logo_icon-footer_mobile order-1"  style="width: 31px;overflow:hidden">
                  <!-- <img src="~assets/img/Logo_foot.png" /> -->
                  <LogoDefault/>
                </div>
                <div
                  class="contact-info_mobile "
                  v-html="footerWidget.content_text"
                ></div>
              </div>
            </div>
            <div class="col-lg-6 col-sm-12 col-12 ">
              <div class="connection">
                <div class="title">{{ footerWidget.title }}</div>
                <div class="group-messagenger">
                  <a href="https://www.facebook.com/">
                    <div class="say">
                      <!-- <img src="~assets/img/say_hi.png" /> -->
                      <svg version="1.1" width="18px" height="18px" fill="#24354f" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                        <g>
                          <path d="M256,0C114.624,0,0,106.112,0,237.024c0,74.592,37.216,141.12,95.392,184.576V512l87.168-47.84 c23.264,6.432,47.904,9.92,73.44,9.92c141.376,0,256-106.112,256-237.024S397.376,0,256,0z M281.44,319.2l-65.184-69.536 L89.056,319.2l139.936-148.544l66.784,69.536l125.6-69.536L281.44,319.2z"/>
                        </g>
                      </svg>
                      <span style="margin-left:12px">Say Hi</span>
                    </div>
                  </a>
                  <nuxt-link to="/appt" class="book-wrapper">
                    <div class="book">BOOK AN APPOINTMENT</div>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="second-path"
          class=" d-flex justify-content-between align-items-center"
        >
          <div class="socials ">
            <ul class="d-flex justify-content-center align-items-center">
              <li
                v-for="(social, index) in footerWidget.social_networks"
                :key="index"
              >
                <a class="text" target="_blank" :href="social.url">{{
                  social.title
                }}</a>
                <a
                  class="icon"
                  target="_blank"
                  :class="social.title"
                  :href="social.url"
                ></a>
              </li>
            </ul>
          </div>
          <div class="site-map">
            <ul
              class="d-flex justify-content-center align-items-center "
              v-if="footerWidget.menu"
            >
              <li
                v-for="(item, index) in footerWidget.menu.menu_items"
                :key="index"
              >
                <nuxt-link
                  :to="{ name: 'dynamic-pages-id', params: { id: item.alias } }"
                >
                  {{ item.title }}
                </nuxt-link>
              </li>
            </ul>
          </div>
        </section>
        <div class="footer-border"></div>
        <section
          id="three-path"
          class=" d-flex justify-content-between align-items-center"
        >
          <div class="police " v-if="footerWidget.copirates">
            <div class="d-flex">
              <span class="title"> {{ footerWidget.copirates.text }}</span>
              <!-- <span class="line">|</span> -->
              <div v-for="item in footerWidget.copirates.pages" :key="item.id">
                <nuxt-link
                  :to="{ name: 'dynamic-pages-id', params: { id: item.alias } }"
                  class="police-item">
                    {{item.title}}
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="police_mobile" v-if="footerWidget.copirates">
            <div class="title">{{ footerWidget.copirates.text }}</div>

            <div
              v-for="item in footerWidget.copirates.pages"
              :key="item.id"
              class="text"
            >
              <nuxt-link :to="{ name: 'dynamic-pages-id', params: { id: item.alias } }">
                {{ item.title }}
              </nuxt-link>
            </div>
          </div>
          <div class="list-company">
            <ul class="d-flex justify-content-center align-items-center">
              <li>
                <a href=""><img src="~assets/img/GIA_Logo.png" /> </a>
              </li>
              <li>
                <a href=""><img src="~assets/img/jaa.png" /> </a>
              </li>
              <li>
                <a href=""><img src="~assets/img/GGA_Logo.png" /> </a>
              </li>
              <li>
                <a href=""><img src="~assets/img/DDC_Logo.png" /> </a>
              </li>
            </ul>
          </div>
        </section>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import LogoDefault from './MenuComponent/Icons/LogoDefault'

export default {
  components: {
    LogoDefault
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["footerWidget"])
  },
  created() {
    this.$store.dispatch("fetchFooter");
  }
};
</script>