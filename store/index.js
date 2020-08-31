import Vue from 'vue'
import Vuex from 'vuex'

import diamonds from './modules/diamonds'
import filter from './modules/filter'
import jewellery from './modules/jewellery'
import categories from './modules/categories'
import pair from './modules/pair_diamond_module'
import pair_diamonds from './modules/pair_product_module'
import compare from './modules/compare'
import compare_products from './modules/compare_products'
import modulePairRingWithDiamonds from './modules/modulePairRingWithDiamonds'
import news from './modules/news'
import guids from './modules/guids'
import faq from './modules/faq'
import appt from './modules/appt'
import homepage from './modules/homepage'
import menu from './modules/menu'
import contact_us from './modules/contact_us'
import shopping_bag from './modules/shopping_bag'
import facebook from './modules/facebook'
import save from './modules/save'
import instagram_feeds from './modules/instagram_feeds'
import search from './modules/search'
import validation from './modules/validation'
import auth from './modules/auth'

Vue.use(Vuex)

export default () => new Vuex.Store({
  modules: {
    auth,
    validation,
    facebook,
    compare_products,
    compare,
    pair,
    pair_diamonds,
    diamonds,
    filter,
    jewellery,
    categories,
    news,
    guids,
    faq,
    appt,
    homepage,
    menu,
    contact_us,
    shopping_bag,
    save,
    instagram_feeds,
    search,
    modulePairRingWithDiamonds
  }
});




