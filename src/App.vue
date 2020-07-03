<template>
    <router-view/>
</template>
<script lang="js">
    import store from '@/store/index2'

    export default {
        data(){
            return store
        }
    }
</script>
<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";
  body{
    font-family: $font-hei;
    line-height: 1.5;
      background:#f5f5f5 ;
  }


#app {

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
}



</style>
