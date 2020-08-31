import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      storage: window.sessionStorage,
      key: 'compare',
      paths: [
        'compare.cart',
        'compare_products.jewellery',
        'shopping_bag.items_bag',
        'shopping_bag.checkout',

        'save.list_favorites',

      ]
    },)(store),
    createPersistedState({
      storage: window.sessionStorage,
      key: 'filters',
      paths: [

        'diamonds.diamonds_query'
      ]
    },)(store),
      createPersistedState({
        storage: window.sessionStorage,
        key: 'filters_jew',
        paths: [
          'categories.jewellery_engagement_query',
          'categories.jewellery_wedding_query',
        ]
      },)(store)

  })
}
