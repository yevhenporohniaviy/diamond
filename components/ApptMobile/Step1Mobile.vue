<template>
<section>
  <div class="col-12">
      <div class="progress-moblie-app">
        <img src="~assets/img/mobile-app-pro-steps1.png" class="img-fluid">
      </div>
      <form class="row" id="apptForm"   >
        <div class="col-12">
          <div v-for="(item, index) in step.content"
               :key="index"
               class="d-flex justify-content-center">
            <div class="input-form" v-if="item.content.element_type === 'input'">
              <div v-if="item.content.alias === 'email'">
                <el-input
                  :id="item.content.alias"
                  v-model="fieldStepFirst[item.content.alias]"
                  :placeholder="item.content.placeholder"
                  :name="item.content.name"
                  type="email"
                  ref="email"
                  v-validate="'required|email'"/>
              </div>
              <div v-else-if="item.content.alias === 'confirm_email'">
                <el-input
                  type="email"
                  :id="item.content.alias"
                  v-model="fieldStepFirst[item.content.alias]"
                  :placeholder="item.content.placeholder"
                  :name="item.content.name"
                  v-validate="'required|email|confirmed:email'"
                  :ref="item.content.alias"/>
              </div>
              <div v-else>
                <el-input
                  :id="item.content.alias"
                  :name="item.content.name"
                  v-model="fieldStepFirst[item.content.alias]"
                  :placeholder="item.content.placeholder"
                  v-validate="item.content.element_require === 1 ? 'required' : ''"/>
              </div>
              <span v-show="errors.has(item.content.name)" class="form-control-feedback">{{ errors.first(item.content.name) }}</span>
            </div>
            <div class="input-form-label " v-if="item.content.element_type === 'label'">
              <div class="required" v-if="item.content.alias === 'required'">
                {{item.content.placeholder}}
              </div>
              <div  class="extra" v-else-if="item.content.alias === 'extra_comments'">
                <img src="~assets/img/default/extra-comments.png" class="img-fluid mr-1"> {{item.content.placeholder}}
              </div>
            </div>
            <div class="input-form-select" v-if="item.content.element_type === 'select'">
              <label class="d-flex justify-content-center align-items-center">
               {{item.content.name}}
              </label>
              <v-select v-model="fieldStepFirst[item.content.alias]"
                          class="appt-select"

                          :searchable="false"
                          :clearable="false"
                          :name="item.content.name"
                          :id="item.content.name"
                          :options="item.content.listItems.items"
                          v-validate="item.content.element_require === 1 ? 'required' : ''">
              </v-select>
              <span v-show="errors.has(item.content.name)" class="form-control-feedback">{{ errors.first(item.content.name) }}</span>

            </div>
            <div class="input-form-textarea" v-if="item.content.element_type === 'textarea'">
              <el-input

                type="textarea"
                :rows="6"
                :placeholder="item.content.placeholder"
                clearable
                v-validate="item.content.element_require === 1 ? 'required' : ''"
                :name="item.content.alias"
                v-model="fieldStepFirst[item.content.alias]">
              </el-input>
              <span v-show="errors.has(item.content.alias)" class="form-control-feedback">{{ errors.first(item.content.alias) }}</span>

            </div>


          </div>
        </div>
      </form>

  </div>
  <div class="mobile-app-control">
    <button class="cancel-step">cancel</button>
    <button type="submit" @click.prevent="validateBeforeSubmit" class="next-step">next</button>
  </div>
</section>
</template>


<script>


  export default {
    props: {
      step: Object,
    },
    data() {
      return {
        fieldStepFirst: {}
      }
    },

    methods:{
      setName(){
        const nameUser = this.fieldStepFirst.first_name;
        this.$store.dispatch('setNameUser', nameUser)
      },
      sendData(){
        this.$emit('next', {step: this.step , data: this.fieldStepFirst })
        var options = {
          easing: 'ease-in',
        }
        document.getElementById("app-step-1").style.display = "none";
        document.getElementById("app-step-2").style.display = "block";
        this.$scrollTo('#app-step-2', options)

      },
      validateBeforeSubmit(e) {
        let vm = this

        this.$validator.validateAll()
          .then(valid => {
            if(valid){
              this.sendData();
              this.setName();
            }
          }).catch(e => {
          return e;
        })
      },
    }
  }
</script>

<style lang="scss" >
  .dots-step{
    @media(max-width: 525px){
      display: none!important;
    }
  }
  .el-select-dropdown{
    .el-select-dropdown__item{
      color: #24354f;
      font-family: lato-reg;
      font-size: 14px;
      text-align: center;
    }
  }
  .appt-select{

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
      border: 1px solid #cae3f6;
      background-color: #ffffff;
      border-radius: 0;
      height: 50px;
      padding: 10px;
      text-align: center;
      .vs__selected-options{
        width: 100%;
        color: #24354f;
        font-family: lato-reg;
        font-size: 14px;
        text-align: center;
        justify-content: center;
        display: flex;
        align-items: center;
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
</style>
