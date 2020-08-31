const webpack = require('webpack');

module.exports = {

  mode : "universal",
  /*
    * Headers of the page
  */

  axios: {
    baseURL: ''
  },
  head: {
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=now' },
    ],
    script: [
      { src: 'https://js.hs-scripts.com/5085383.js' , id: 'hs-script-loader'},
      { src: 'https://connect.podium.com/widget.js#API_TOKEN=9936d97d-7485-4189-a751-59313fa03fd2' , id: 'podium-widget' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: true,
  /*
  ** Build configuration
  */
  css: [
    '~/assets/fonts/fonts.css',
    '~/assets/scss/main.scss',
    'element-ui/lib/theme-chalk/index.css',
    'animate.css/animate.css'
  ],
  modules: [
    'nuxt-vue-select',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'cookie-universal-nuxt',
    'bootstrap-vue/nuxt',
    'nuxt-fontawesome',
    'nuxt-validate',
    'vue-currency-input/nuxt',
    [
      'nuxt-device-detect',
      {defaultUserAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Mobile Safari/537.36'}
    ]
  ],
  router: {
    middleware: [

    ]
  },
  auth: {
    cookie: false,
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          check: { url: '/auth/checkResetToken', method: 'post', propertyName: 'token' },
          social: { url: '/auth/social_register', method: 'post', propertyName: 'token' },
          update: { url: '/api/users/update', method: 'post', propertyName: 'token' },
          logout: { url: '/api/users/logout', method: 'post' },
          user: { url: '/api/users/me', method: 'get', propertyName: false },
        },
        tokenRequired: true,
        tokenType: 'Bearer',
      }
    },
    watchLoggedIn : true,
    localStorage: {
      prefix: 'auth.'
    },
    token: {
      prefix: 'token.'
    },
  },
  plugins: [

    {src: '~/plugins/filters.js'},
    {src: '~/plugins/vee-validate.js', ssr: false},
    {src: '~/plugins/element-ui', ssr: true},
    {src: '~/plugins/vue-datepicker.js', ssr: false },
    {src: '~/plugins/fontawesome.js', ssr: true},
    {src: '~/plugins/owl.js', ssr: false},
    {src: '~/plugins/datepicker', ssr: false},
    {src: '~/plugins/timepicker', ssr: false},
    {src: '~/plugins/v-calendar.js', ssr: false},
    {src: "~/plugins/aos", ssr: false},
    {src: '~/plugins/VueFlickity.js', ssr: false},
    {src: '~/plugins/vue-carousel', ssr: false},
    {src: '~/plugins/slick', ssr: false},
    {src: '~/plugins/vue-js-modal', ssr: false},
    {src: '~/plugins/vue-masonry', ssr: false},
    {src: '~/plugins/vue-slider-component', ssr: false},
    {src: '~/plugins/numeral.js', ssr: false},
    {src: '~/plugins/localStorage.js', ssr: false },
    {src: '~/plugins/vue-scrollto.js', ssr: false },
    {src: '~/plugins/vue-meta.js' ,ssr: false },
    {src: '~/plugins/vue-moment.js' ,ssr: false },
    {src: '~/plugins/vue-social-sharing.js' ,ssr: false },
    {src: '~/plugins/bus-inject.js' ,ssr: false },
    {src: '~/plugins/fb-sdk.js' ,ssr: false },
    {src: '~/plugins/vue-infinite-scroll.js', ssr: false},
    {src: '~/plugins/vue-currency-input.js', ssr: false},
    {src: '~/plugins/vue-money.js', ssr: false},
    {src: '~/plugins/bootstrap.js'}
  ],

  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  optimization: {
    runtimeChunk: true
  },

  build: {
    /*
    ** Run ESLint on save
    */
    transpile: ['vue-slick'],
    vendor: [
      'vue-social-sharing',
      'nuxt-vue-select',
      'vee-validate',
      'element-ui',
      'jquery',
      'vuex',
      'bootstrap'

    ],
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery',
        jQuery: 'jquery'
      })
    ],
    extractCSS: {
      splitChunks: true,
    },
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
}
