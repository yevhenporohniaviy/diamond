<template>
  <div>
  </div>
</template>

<script>

  export default{

    name: 'Forgot',
    methods:{

      async validToken(token) {
        try {
          await this.$axios.post('/auth/checkResetToken', token)
            .then((resp) => {
             this.$auth.setUserToken(resp.data.token)
               .then(() => this.$router.push('/auth/password'))
            })
            .catch(error => {
              this.$notify({
                title: 'Warning',
                message: error.response.data.message,
                type: 'warning'
              });
            });
        } catch (e) {
          this.$notify({
            title: 'Warning',
            message: e.response.data.message,
            type: 'warning'
          });
        }
      },
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.validToken(to.query)
      })
    },
  }
</script>
<style lang="scss">
  .block-form{
    width: 400px;
    margin: 0 auto;
    @media(max-width: 767px){
      width: 100%;
    }
  }

</style>
