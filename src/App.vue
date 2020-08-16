<template>
    <div id="app">
        <router-view/>
    </div>

</template>
<script lang="js">
export default {

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
  color: #333333;
    max-width:375px;
    margin: 0 auto;
}



</style>
