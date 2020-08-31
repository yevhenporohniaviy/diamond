<template>
  <div class="container p-0">
    <div class="guid-content-anatomy text-center">
      <div class="type">{{widget.title}}</div>
      <div class="title">{{widget.subtitle}}</div>
      <div class="col-12 content-anatomy">

        <div class="anatomy row" v-for="(item, index) in widget.other_images" :key="index" >

           <div class="col-12 col-md-4" v-if="index % 2 == 0" >
             <img :src="baseUrl+item.image" class="img-fluid">
             <div :class="'line' + index"></div>
           </div>
           <div class="col-12 col-md-4 " v-if="index % 2 == 0">
             <div class="description-anatomy al-r">
               <div class="anatomy-title">
                 {{item.title}}
               </div>
               <img class="img-fluid" src="~assets/img/guids/anatomy-line-text.svg">
               <div class="anatomy-text" v-html="item.description">
                .
               </div>
             </div>
           </div>
           <div class="col-12 col-md-4 d-flex align-content-center order-1 order-md-0 " v-if="Math.abs(index % 2) == 1">
             <div class="description-anatomy al-r">
               <div class="anatomy-title">
                 {{item.title}}
               </div>
               <img class="img-fluid" src="~assets/img/guids/anatomy-line-text.svg">
               <div class="anatomy-text" v-html="item.description">
               </div>
             </div>
           </div>
           <div class="col-12 col-md-4 d-flex align-content-center order-0 order-md-1 justify-content-center" v-if="Math.abs(index % 2) == 1">
             <img :src="baseUrl+item.image" class="img-fluid d-flex justify-content-center">
             <div :class="'line' + index"></div>

           </div>

        </div>

      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'diamond-anatomy-component',
    props: {
      widget: Object,
    },
    data() {
      return {

        flickityOptions: {
          prevNextButtons: false,
          pageDots: false,
          adaptiveHeight: true,
        }
      }
    }
  }
</script>
