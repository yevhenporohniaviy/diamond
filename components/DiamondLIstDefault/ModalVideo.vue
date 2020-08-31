<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 d-flex justify-content-center align-items-center">
        <div class="title-modal mb-2">{{data.caratSize }} {{data.shape}} diamond</div>
      </div>
      <div class="col-12 d-flex justify-content-center" >
        <iframe :src="data.video" width="70%" frameborder="0" class="iframe-video-diamonds-360"></iframe>
      </div>
      <div class="col-md-8 col-12 d-flex justify-content-center align-items-center">
        <div class="d-flex justify-content-between w-100 my-2">
          <div class="item-tech">
            <div class="title">CARAT</div>
            <div class="text">{{data.caratSize}}</div>
          </div>
          <div class="item-tech">
            <div class="title">COLOUR</div>
            <div class="text">{{data.color}}</div>
          </div>
          <div class="item-tech">
            <div class="title">CLARITY</div>
            <div class="text">{{data.clarity}}</div>
          </div>
          <div class="item-tech">
            <div class="title">CUT</div>
            <div class="text">{{data.cut}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


  export default {
    props: {
      data: String,
    }
  }
</script>
