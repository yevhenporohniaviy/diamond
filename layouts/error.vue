<template>
  <div class="error">
    <div class="error__logo">
      <logo />
    </div>
    <h1 v-if="error.statusCode === 404" class="error__title">- Page not found -</h1>
    <h1 v-else class="error__title">An error occurred</h1>
    <div class="error__wrapper">
      <nuxt-link to="/" class="error__link">Home page</nuxt-link>
    </div>
  </div>
</template>

<script>
import Logo from '../components/Elements/Logos/Logo';

export default {
  props: ['error'],
  components: {
    Logo
  }
}
</script>

<style lang="scss">
  .error {
    padding: 50px;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-self: center;
    flex-direction: column;

    &__title {
      padding: 50px 0 20px 0 ;
      text-align: center;
      text-transform: uppercase;
      font-family: 'lato-black';
      cursor: default;

      @media (max-width: 768px) {
        font-size: 1.3em;
      }
    }

    &__wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    &__link {
      font-family: 'lato-reg';
      font-weight: bold;
      text-decoration: underline;
      color: black;
      text-transform: uppercase;
        color: #cae3f6;
      transition: .35s cubic-bezier(.4,0,.2,1);;

      &:hover {
        transform: scale(1.03);
        color: #24354f;
      }
    }

    &__logo {
      width: 31px;
      margin: 50px auto;
      overflow: hidden;
      transform: scale(1.5);
      opacity: .8;
    }
  }
</style>