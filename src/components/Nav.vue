<template>
  <nav >
  <router-link to="./money" class="item" active-class="selected"><Icon name="money"/>记账</router-link>
    <router-link to="./labels" class="item" active-class="selected"> <Icon name="label"/>标签</router-link>
  <router-link to="./statistics" class="item" active-class="selected"><Icon name="statistics"/>数据</router-link>
</nav>
</template >
<script lang="ts">




export default {
    name: 'Nav'
  };
</script>

<style lang="scss" scoped>
  nav{

    display: flex;
    box-shadow: 0,0,3px,rgba(0,0,0,0.25);
    flex-direction: row;
    >.item{
      padding: 2px 0px;
      display:flex;
      flex-direction: column;
      width: 33.33333%;
      justify-content: center;
      align-items: center;
      .icon{
        height:28px;
        width:28px;
      }
    }
   > .item.selected{
  color: blue;
     }
  }

</style>