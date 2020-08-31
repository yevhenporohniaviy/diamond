<template>
  <div class="contact-form">
    <div class="title">Contact us</div>
    <form class="ContactForm" @submit.prevent="validateBeforeSubmit" id="contact-scroll">
      <el-col
        v-for="(field, index) in widget.content"
        :key="index"
        :span="$device.isDesktop === true ? spanSize(field.element_type) : 24"
        :class="index === widget.content.length - 1 && formFields.numbers && formFields.numbers.length > 0 ? 'enquiry' : ''"
      >
        <el-input
          v-validate="field.element_require === 1 ? 'required' : ''"
          v-if="field.element_type === 'input'"
          :type="field.element_type"
          :placeholder="field.placeholder"
          :name="field.name"
          v-model="formFields[field.alias]"
        ></el-input>
        <el-input
          v-validate="field.element_require === 1 ? 'required' : ''"
          v-if="field.element_type === 'textarea'"
          :type="field.element_type"
          :rows="3"
          :placeholder="field.placeholder"
          clearable
          :name="field.name"
          maxlength="2000"
          v-model="formFields[field.alias]"
        ></el-input>
        <label v-if="field.element_type === 'select'" class="select-placeholder">{{field.name}}</label>
        <v-select v-model="formFields[field.alias]"
                  class="w-100 contact-select"
                  v-if="field.element_type === 'select'"
                  :searchable="false"
                  :clearable="false"

                  :placeholder="field.alias"
                  :name="field.name"
                  :id="field.name"
                  :options="field.contentItems"
                  v-validate="field.element_require === 1 ? 'required' : ''">
        </v-select>
        <span
          v-show="errors.has(field.name)"
          class="form-control-feedback"
        >{{ errors.first(field.name) }}</span>
        <div
          class="number"
          v-show="index === widget.content.length - 1  && formFields.numbers && formFields.numbers.length > 0 "
        >
          <div class="mr-1">You are contacting us regarding the item(s) REF</div>
          <span v-for="(numb, index) in formFields.numbers" :key="index">{{numb}}</span>
        </div>
      </el-col>

      <el-col :span="24">
        <button class="submit-btn button-submit" type="submit">Submit</button>
      </el-col>
    </form>
    <el-dialog
      title=""
      :visible.sync="thankModal"
      center
      :show-close="false"
      custom-class="modalThx">
      <div class="container" >
        <div class="thxClose" @click="closeModal">
          <img src="~assets/img/default/close-save.png" class="img-fluid">
        </div>
        <div class="d-flex justify-content-center align-items-center flex-column">
          <div class="title-thank">Thank you</div>
          <div class="description-thank my-5"> Your message has been sent.</div>
        </div>


      </div>

    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  props: {
    widget: Object
  },
  data() {
    return {
      formFields: {
        numbers: null
      },
      thankModal: false,
      modal: false
    };
  },
  components: {},
  computed: {
    ...mapGetters(["enquiry_number"])
  },
  methods: {

    scrollToContactForm(){

    if(this.$route.params.scroll === 'scroll'){
      let options = {
        offset: -125,
        force: true,
        easing: 'ease-in',
      }
      setTimeout(() => {
        this.$scrollTo('#contact-scroll', options)
      },1000);

    }

    },
    closeModal(){
      this.thankModal = false

    },
    spanSize(type) {
      if (type === "input" || type === "select") {
        return 10;
      }
      return 24;
    },
    validateBeforeSubmit(e) {
      this.$validator
        .validateAll()
        .then(valid => {
          if (valid) {
            this.postFrom();
          }
        })
        .catch(e => {
          return e;
        });
    },
    postFrom() {
      this.$axios
        .post("/api/settings/contact_us", {
          ...this.formFields
        })
        .then(response => {
          this.thankModal = true
          this.$store.dispatch('cleareEnquiry');
          this.formFields = {};
          return response;
        })
        .catch(function(error) {
          return error;
        });
    }
  },
  mounted() {
    this.scrollToContactForm();
  },
  created() {
    this.formFields.numbers = this.enquiry_number;

  }
};
</script>
<style lang="scss" >
.ContactForm {
  .select-placeholder{
    color: #24354f;
    font-family: lato-reg;
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
  }
  .contact-select{
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #cae3f6;
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;

    line-height: 40px;
    outline: 0;

    width: 100%;
    ul{
      width: 100%;
      li{
        width: 100%;
        color: #24354f;
        font-family: lato-reg;
        font-size: 14px;
        text-align: center;
      }
    }
    .vs__dropdown-toggle{
      width: 100%;
      border: none;
      background-color: #ffffff;
      border-radius: 0;
      padding-bottom: 10px;
      .vs__selected-options{
        width: 100%;
        color: #24354f;
        font-family: lato-reg;
        font-size: 14px;
        justify-content: start;
        display: flex;
        .vs__selected{
          padding: 0;
          margin: 0;
          color: #24354f;
          font-family: lato-reg;
          font-size: 12px;
          font-weight: 400;
        }
        .vs__search{
          display: none;
        }
      }
    }
    .vs__dropdown-menu{
      width: 100%;
      @media(max-width: 525px) {
        min-width: 300px!important;
      }
      .vs__dropdown-option{
        width: 100%;
        &.vs__dropdown-option--highlight{
          background: transparent;
        }
      }
    }
  }
  .enquiry {
    position: relative;
    .number {
      position: absolute;
      top: 30px;
      padding-bottom: 15px;
      left: 15px;
      color: #939393;
      font-family: lato-reg;
      font-size: 12px;
      border-bottom: 1px dashed #939393;
      display: flex;
      span {
        font-family: lato-bold;
        display: flex;
        &:last-child {
          &:after {
            display: none;
          }
        }
        &:after {
          content: ",";
          margin-right: 2px;
          display: block;
        }
      }
    }

    .el-textarea {
      textarea {
        padding-top: 65px !important;
      }
    }
  }
}

.el-textarea__inner {
  max-height: 300px !important;
}

.button-submit {
  border: none;
}
</style>
