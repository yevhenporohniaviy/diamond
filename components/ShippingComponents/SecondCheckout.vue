<template>
  <div class="d-flex justify-content-center">
    <div class=" col-12">
      <div class="container-form-checkout">
        <div class="checkout-title mb-5">PICK UP IN STORE</div>
        <div class="shippin-pick-location mb-1">
          <div class="row align-items-center">
            <div class="col-2">
              <img src="~assets/img/location-ship.png" class="img-fluid">
            </div>
            <div class="col-10 ">
              <span class="text">
                Level 2, Suite 201
185 Elizabeth Street, Sydney
NSW,  Australia 2000
              </span>
            </div>
          </div>
        </div>
        <div class="comment-box">
          <div class="description">
            We will be in touch with you as soon as your product arrives in the Sydney store.
          </div>
          <div class="input-form">
            <el-input
              type="textarea"
              :rows="4"
              class="commetn-delive"
              id="comment"
              v-model="fields_form.comment"
              name="comment"
              placeholder="Add special delivery notes (optional)"
            ></el-input>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters} from 'vuex'

  export default {

    props: {
      fieldsAttributes: Object,
      isValidated: Boolean
    },
    data() {
      return {
        fields_form: {

          address: 'Level 2, Suite 201 \n' +
            '185 Elizabeth Street, Sydney\n' +
            'NSW,  Australia 2000 ',
          comment: '',
          type: 'pick'
        }
      }
    },
    computed: {
      ...mapGetters(['shopping_list','gstCount', 'loggedInUser']),

    },
    created () {
      this.$emit('changeAttributesPick', { fields_form: this.fields_form})
    }
  }
</script>
<style lang="scss">
  .shippin-pick-location{
    width: 276px;
    height: 62px;
    color: #24354f;
    font-family: Lato;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    .text{
      width: 276px;
      height: 62px;
      color: #24354f;
      font-family: lato-reg;
      font-size: 14px;
      line-height: 22px;
    }
  }
  .comment-box{
    .description{
      margin: 40px 0;
      width: 297px;
      height: 78px;
      color: #24354f;
      font-family: lato-reg;
      font-size: 18px;
      line-height: 28px;
    }
    .commetn-delive{
      border-radius: 0;
      border: 1px solid #cae3f6;
      #comment{
        border: none;
        color: #24354f;
        font-family: lato-reg;
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0.86px;
        line-height: 24px;
        &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
          color: #24354f;
          font-family: lato-reg;
        }
        &::-moz-placeholder { /* Firefox 19+ */
          color: #24354f;
          font-family: lato-reg;
        }
        &:-ms-input-placeholder { /* IE 10+ */
          color: #24354f;
          font-family: lato-reg;
        }
        &:-moz-placeholder { /* Firefox 18- */
          color: #24354f;
          font-family: lato-reg;
        }
      }
    }
  }

</style>
