<template>
  <div class="container-fluid" id="engagement_section">
    <div class="row">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="engagement-box">
              <img
                :src="`${baseUrl}${widget.data.image.en}`"
                class="img-fluid"
                data-aos="zoom-in"
              />

              <div class="engagement-description">
                <div class="title" data-aos="fade-up">
                  {{ widget.data.title.en }}
                </div>

                <a
                  :href="widget.data.first_button_url.en"
                  class="link-design"
                  data-aos="zoom-in"
                  v-if="widget.data.first_button_url.isExternal"
                  >{{ widget.data.first_button_text.en }}</a
                >

                <nuxt-link
                  :to="{
                    name: 'dynamic-pages-id',
                    params: { id: widget.data.first_button_url.en }
                  }"
                  class="link-design"
                  data-aos="zoom-in"
                  v-else
                >
                  {{ widget.data.first_button_text.en }}
                </nuxt-link>

                <a
                  :href="widget.data.second_button_url.en"
                  class="link-wedding"
                  data-aos="zoom-in"
                  v-if="widget.data.second_button_url.isExternal"
                  >{{ widget.data.second_button_text.en }}</a
                >

                <nuxt-link
                  :to="{
                    name: 'dynamic-pages-id',
                    params: { id: widget.data.second_button_url.en }
                  }"
                  class="link-wedding"
                  data-aos="zoom-in"
                  v-else
                >
                  {{ widget.data.second_button_text.en }}
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    widget: Object
  },
  data() {
    return {
    };
  },
  methods: {}
};
</script>
