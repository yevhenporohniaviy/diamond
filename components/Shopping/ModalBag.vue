<template>
  <div class="container">
    <div class="d-flex justify-content-center">
      <div class="col-12 col-md-10 offset-md-1">
        <div v-if="status_item">
          <div class="col-12">
            <div class="title-modal-shop">
              ITEM ALREADY ADDED TO BAG
            </div>
          </div>
        </div>
        <div v-else>
        <div class="col-12">
          <div class="title-modal-shop">
            ITEM ADDED TO BAG
          </div>
        </div>
          <div class="my-5" v-if="shopping_item">

            <div class="col-12">
              <div class="container-item">
                <div class="item-head">
                  <div class="item-image" v-if="shopping_item.item_details.images">
                    <img :src="baseUrl+shopping_item.item_details.images.main.image" class="img-fluid" v-if="shopping_item.item_type === 'j'">
                    <img :src="shopping_item.item_details.images.main" class="img-fluid" v-else>
                  </div>
                  <div class="item-info" v-if="shopping_item.item_type === 'd'">
                    <div class="item-ref-numb">
                      REF. {{shopping_item.item_id}}
                    </div>
                    <div class="item-ref-title">
                      <span >{{shopping_item.item_details.caratSize}} {{shopping_item.item_details.shape}} diamond</span>
                    </div>
                    <div class="item-ref-size">
                      L {{shopping_item.item_details.MeasLength}}mm x
                      W {{shopping_item.item_details.MeasWidth}}mm x
                      H {{shopping_item.item_details.MeasDepth}}mm
                    </div>
                  </div>
                  <div class="item-info" v-else>
                    <div class="item-ref-title">
                      {{shopping_item.item_details.title}}
                    </div>
                    <div class="item-ref-size" v-if="shopping_item.item_details.metals_select">
                      Metal: {{shopping_item.item_details.metals_select.value.title}}
                    </div>
                    <div class="item-ref-size" v-if="shopping_item.item_details.stone_shape_select">
                      <div v-if="shopping_item.item_details.stone_shape_select.value">
                        Ring size: {{shopping_item.item_details.stone_shape_select.value.title}}
                      </div>

                    </div>
                  </div>
                </div>
                <div class="item-footer">
                  <div class="item-qty">
                  <span>
                    qty
                  </span>
                    <el-input-number
                      v-model="count"
                      controls-position="right"
                      @change="handleChange(shopping_item, count)"
                      :min="1"
                      :max="10"
                      size="mini">
                    </el-input-number>
                  </div>
                  <div class="item-total-price">
                    <span> Total:</span> ${{formatPrice(shopping_item.price*count)}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="btn-continued" @click="continueBtnShopping" >CONTINUE SHOPPING</div>
          <nuxt-link to="/shopping-bag" class="btn-link-shop">
            <div class="btn-link-title" >SEE SHOPPING BAG</div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { mapGetters} from 'vuex'

  export default {
    data () {
      return {
        count: '1',
      }
    },
    components: {

    },
    computed: {
      ...mapGetters([
        'shopping_item',
        'status_item'
      ])
    },
    filters: {

    },
    methods: {
      formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      handleChange(item, value) {
        item.count = value
        this.$store.dispatch('addQuantity', {item_id: item.item_id, count: item.count});
      },
      continueBtnShopping(){
        this.$emit('cont_shop', false);
      }
    }
  }
</script>

