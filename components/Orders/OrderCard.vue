<template>
  <div class="row product-item-bag ">
    <div v-show="card.available === false && card.item_type === 'd'" >
      <div class="sold-block ">
        <div class="text">
          SOLD OUT
        </div>
        <div class="product-item-remove-sold" @click="removeFromBag(card)">
          <img src="~assets/img/default/close-pair.png" class="img-fluid">
        </div>
        <img src="~assets/img/Triangle.png" class="img-fluid">
      </div>
    </div>
    <div class="col-md-5">
      <div class="row justify-content-center align-items-center">
        <div class="col-md-5 col-4">
          <div class="product-item-image" v-if="card.item_details.images">
            <img :src="baseUrl + card.item_details.images.main.image" class="img-fluid" v-if="card.item_type === 'j'">
            <img :src="card.item_details.images.main" class="img-fluid" v-else>
          </div>
        </div>
        <div class="col-md-7 col-8">
          <div class="product-item-info" v-if="card.item_type === 'd'">
            <div class="info-ref-numb">
              {{card.item_id}}
            </div>
            <div class="info-title">
              {{card.item_details.caratSize | toDecimalNumber}} {{card.item_details.shape}} diamond
            </div>
            <div class="info-size">
              L {{card.item_details.MeasLength}}mm x
              W {{card.item_details.MeasWidth}}mm x
              H {{card.item_details.MeasDepth}}mm
            </div>
          </div>
          <div class="product-item-info" v-else>

            <div class="info-title">
              {{card.item_details.title}}
            </div>

            <div class="info-size" v-if="card.item_details.metals_select">
              Metal: {{card.item_details.metals_select.value.title}}
            </div>
            <div class="info-size" v-else>
              Metal: {{card.item_details.metal.title}}
            </div>

            <div class="info-size" v-if="card.item_details.stone_shape_select">
              <div v-if="card.item_details.stone_shape_select.value">
                Ring size : {{card.item_details.stone_shape_select.value.title}}

              </div>
              <div v-else>
                Ring size : {{card.item_details.stone_shape_select.title}}

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="col-12 d-block d-md-none">
      <div class="row">
        <div class="col-4 product-item-price-head" >UNIT PRICE</div>
        <div class="col-5 product-item-price-head">QUANTITY</div>
        <div class="col-3 product-item-price-head">SUBTOTAL</div>
      </div>
    </div>
    <div class="col-md-2 col-4">
      <div class="product-item-price">
        ${{formatPrice(card.price)}}
      </div>
    </div>
    <div class="col-md-2 col-5 ">
      <div class="d-flex justify-content-center">
        <div class="product-items">
          {{card.count}}
        </div>
      </div>
    </div>
    <div class="col-md-2 col-3">
      <div class="product-item-price-total">
        <div class="price">${{formatPrice(card.price*card.count)}}</div>
      </div>
    </div>


  </div>
</template>

<script>


  export default {
    props:{
      card: Object
    },
    components: {},
    data() {
      return {

        count: this.card.count,
        ring_size:{},
        metals:{},
      }
    },
    methods:{

      formatPrice(value) {
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
    }
  }


</script>

<style lang="scss">
  .product-item-bag{
    .product-items{

      border: 1px solid #cae3f6;
      background-color: #ffffff;
      color: #24354f;
      font-family: lato-bold;
      font-size: 10px;
      letter-spacing: 1px;
      height: 30px;
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .sold-block{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 9;
    background-color: #f0f8ffad;

    .product-item-remove-sold{
      cursor: pointer;
      width: 20px;
      height: 20px;
      background-color: #253650;
      border-radius: 50%;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 10px;
        top: 5px;
        right: 5px;
      }
      position: absolute;
      right: 100px;
      top: 55px;
      z-index: 1;
    }
    .text{
      position: absolute;
      top: 38px;
      right: 12px;
      color: #fff;
      z-index: 1;
      transform: rotate(42deg);
      font-family: lato-bold;
    }
    img{
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  .select-shopp{
    .el-select-dropdown__item{
      color: #24354F;
      font-family: lato-reg;
      font-size: 12px;
      letter-spacing: 1px;

      text-transform: uppercase;
      text-decoration: none;
    }
  }
</style>
