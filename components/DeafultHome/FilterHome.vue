<template>
  <div class="container-fluid" id="filter">
    <div class="container mb-2" >
      <div class="row">
        <div class="col-12 col-md-10 offset-md-1 p-0">
          <div class="title text-center">{{widget.data.title.en}}</div>
          <div class="description text-center">
            <template v-if="!$slots['description-text']">
              {{widget.data.subtitle.en}}
            </template>
            <template v-else>
              <slot name="description-text"></slot>
            </template>
          </div>
          <div class="sub-description text-center">
            {{widget.data.description.en}} </div>
          <div class="col-12 col-md-10 offset-md-1 ">
            <div class="row">
              <div class="filter-search">
                  <div class="container-selected">

                    <div class="col-12 col-md-3 select " v-for="(filt, index) in widget.filters" :key="index">
                      <component
                        v-bind:is="`${filt.alias}Component`"
                        :filter_item="filt"
                        :newIndex='newRangeIndex[filt.alias]'
                        @change="selectValue"
                        @change-number="selectNumber">
                      </component>
                    </div>
                    <div class="col-12 col-md-3 p-0">
                      <div class="submit-btn">
                        <button @click="submitFilter">{{widget.data.search_button_text.en}}</button>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>


          <div class="diamond-links text-center" >

            <div class="link" v-if="widget.data.left_button_url.isExternal">
              <a :href="widget.data.left_button_url.en" >
                {{widget.data.left_button_text.en}}
              </a>
            </div>
            <div class="link" v-else >
              <nuxt-link :to="{name: 'dynamic-pages-id', params: { id: widget.data.left_button_url.en } }" >
                {{widget.data.left_button_text.en}}
              </nuxt-link>
            </div>

            <span class="mx-4 d-none d-md-block"> / </span>

            <div class="link" v-if="widget.data.right_button_url.isExternal">
              <a :href="widget.data.right_button_url.en" class=" text-center">
                {{widget.data.right_button_text.en}}
              </a>
            </div>
            <div class="link" v-else>
              <nuxt-link :to="{name: 'dynamic-pages-id', params: { id: widget.data.right_button_url.en } }" class=" text-center">
                {{widget.data.right_button_text.en}}
              </nuxt-link>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FiltersHomeComponents from '~/components/FiltersHomeComponents'

  export default {
    props: {
      widget: Object,
    },
    data() {
      return {
        form: {},
        filters: {
          page: 1,
          sort: null,
        }
      };
    },
    components: {
      ...FiltersHomeComponents
    },
    methods: {
      newRangeIndex() {
        let result = {};
        this.widget.filters
          .filter((element) => Array.isArray(element.values) && element.values.length)
          .forEach((value) => {
            result[value.alias] = [0,value.values.length-1 + 0.5];
          })
        return result;
      },
      selectValue(value) {
        let element = this.widget.filters
          .find((item) => item.alias === value.alias);
        let result = element.values
          .filter((val) => val.index >= value.value[0] && val.index <= value.value[1])
          .map((val) => val.value);
        this.filters[value.alias] = [...result];
        this.$store.dispatch('saveQuery', this.filters)
      },
      selectNumber(value) {
        this.filters[value.alias] = [...value.value];
        this.$store.dispatch('saveQuery', this.filters)
      },
      submitFilter(){
        this.$nuxt.$router.push({ name: 'diamonds', params: this.filters })
      }
    }
  }
</script>

