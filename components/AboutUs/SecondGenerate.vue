<template>
 <div>
   <section id="section-operated">
     <div class="container">
       <div class="row justify-content-center">
         <div class="col-12">
           <div class="operated-image">
             <img :src="baseUrl + widget.main_image" class="img-fluid" data-aos="fade-up">
           </div>
           <div class="operated-image-figure1" data-aos="fade-up"></div>
           <div class="operated-image-figure2" data-aos="fade-up"></div>
         </div>
       </div>
     </div>
   </section>
   <section id="section-helping">
     <div class="container">
       <div class="row">
         <div class="col-12 col-md-10 offset-md-1">
           <div class="row">
             <div class="col-12 col-md-6 title">
               <div class="title-box" data-aos="fade-up">
                 {{widget.title}}
               </div>
             </div>
             <div class="col-12 col-md-6 description">
               <div class="" data-aos="fade-up" v-html="widget.description">

               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </section>
 </div>
</template>

<script>

  export default {

    props: {
      widget: Object,
    },
    components: {

    },
    data() {
      return {

      }
    }
  }
</script>
