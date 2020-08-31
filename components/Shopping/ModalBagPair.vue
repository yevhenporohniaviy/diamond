<template>
  <div class="container">


    <div class="d-flex justify-content-center">
      <div class="col-12 col-md-10">


        <div class="col-12">
          <div class="title-modal-shop">
            ITEMS ADDED TO BAG
          </div>
        </div>
        <div class="my-5" v-if="shopping_pair">

          <div class="col-12" v-for="item in shopping_pair" :key="item.item_id">

            <div class="container-item already_added" v-if="item.item_details.status_item">
              <div class="already">
               <span> already added</span>
              </div>
              <div class="item-head">
                <div class="item-image">
                  <img :src="baseUrl+item.item_details.images.main.image" class="img-fluid" v-if="item.item_type === 'j'">
                  <img :src="item.item_details.images.main" class="img-fluid" v-else>
                </div>
                <div class="item-info" v-if="item.item_type === 'd'">
                  <div class="item-ref-numb">
                    REF. {{item.item_id}}
                  </div>
                  <div class="item-ref-title">
                    <span>{{item.item_details.caratSize | toDecimalNumber}} {{item.item_details.shape}} diamond</span>
                  </div>
                  <div class="item-ref-size">
                    L {{item.item_details.MeasLength}}mm x
                    W {{item.item_details.MeasWidth}}mm x
                    H {{item.item_details.MeasDepth}}mm
                  </div>
                </div>
                <div class="item-info" v-else>
                  <div class="item-ref-title">
                    {{item.item_details.title}}
                  </div>
                  <div class="item-ref-size a" v-if="item.item_details.metal">
                    Metal: {{item.item_details.metal.title}}
                  </div>
                  <div class="item-ref-size " v-if="item.item_details.stone_shape_select">

                    <div v-if="item.item_details.stone_shape_select.value">

                      Ring size: {{item.item_details.stone_shape_select.value.title}}
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div class="container-item" v-else>
              <div class="item-head">
                <div class="item-image">
                  <img :src="baseUrl+item.item_details.images.main.image" class="img-fluid" v-if="item.item_type === 'j'">
                  <img :src="item.item_details.images.main" class="img-fluid" v-else>
                </div>
                <div class="item-info" v-if="item.item_type === 'd'">
                  <div class="item-ref-numb">
                    REF. {{item.item_id}}
                  </div>
                  <div class="item-ref-title">
                    <span>{{item.item_details.caratSize | toDecimalNumber}} {{item.item_details.shape}} diamond</span>
                  </div>
                  <div class="item-ref-size">
                    L {{item.item_details.MeasLength}}mm x
                    W {{item.item_details.MeasWidth}}mm x
                    H {{item.item_details.MeasDepth}}mm
                  </div>
                </div>
                <div class="item-info" v-else>
                  <div class="item-ref-title">
                    {{item.item_details.title}}
                  </div>
                  <div class="item-ref-size " v-if="item.item_details.metal">
                    Metal: {{item.item_details.metal.title}}
                  </div>
                  <div class="item-ref-size " v-if="item.item_details.stone_shape_select">
                    <div v-if="item.item_details.stone_shape_select.value">
                      Ring size: {{item.item_details.stone_shape_select.value.title}}
                    </div>
                    <div class="item-ref-size " v-else>
                      Ring size: {{item.item_details.stone_shape_select.title}}
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
                    v-model="item.count"
                    controls-position="right"
                    @change="handleChange(item, item.count)"
                    :min="1"
                    :max="10"
                    size="mini">
                  </el-input-number>
                </div>
                <div class="item-total-price">
                  <span> Total:</span> ${{formatPrice(item.price*item.count)}}
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="col-12">
          <div class="btn-continued" @click="continueBtnShopping">CONTINUE SHOPPING</div>
          <div class="btn-link-shop" @click="redirectShopping">
            <div class="btn-link-title">SEE SHOPPING BAG</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        count: '1',
      }
    },
    components: {},
    computed: {
      ...mapGetters([
        'shopping_pair'
      ])
    },
    filters: {},

    methods: {
      formatPrice(value) {
        let val = (value / 1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      handleChange(item, value) {
        item.count = value
        this.$store.dispatch('addQuantity', {item_id: item.item_id, count: item.count});
      },
      redirectShopping(){
        this.$emit('redir_shop', false);
      },
      continueBtnShopping() {
        this.$emit('cont_shop', false);
      }
    }
  }
</script>

