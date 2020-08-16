<template>
  <layout>
    <div>
      <div class="tags-nav">
        <ul>
          <li>编辑标签</li>
          <li><a href="./Money.vue">完成</a></li>
        </ul>
      </div>
      <div class="tags">
        <router-link class="tag"
                     v-for="tag in tags"
                     :key="tag.id"
                     :to=" `/labels/edit/${tag.id}` ">
          <div class="icon-wrapper">
            <Icon :name='tag.name'/>
          </div>
          <span>{{tag.name}}</span>
        </router-link>
        <div class='add' @click="createTag">
          <svg class="icon">
            <use xlink:href="#add"/>
          </svg>
          <button @click="createTag">新增</button>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button}
  })
  export default class Label extends Vue {
    get tags() {
      return this.$store.state.tagList;
    }

    beforeCreate() {
      this.$store.commit('fetchTag');
    }

    createTag() {
      const name = window.prompt('请输入标签名');
      if (!name) {
        return window.alert('标签名不能为空')
      } else {
        this.$store.commit('createTag', name)
        if (this.$store.state.createTagError) {
          const map: { [key: string]: string } = {
            'tag name duplicated': '标签名重复了'
          };
          window.alert(map[this.$store.state.createTagError.message] || '未知错误');
        }
      }
      }}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .tags-nav {
    @extend %innerShadow;
    background-color: blue;

    > ul {
      min-height: 60px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      text-align: center;
      align-items: center;

      > li {
        font-size: 18px;
        padding: 0 15px;
      }
    }

  }

  .tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    > .add {
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      width: 80px;
      padding: 8px 0;
      margin-right: 13px;
      >svg{
        background-color: #e6e6e6;
        margin: 8px 0;
        padding:10px;
        width: 50px;
        height:50px;
        border-radius: 50%;

      }
      >button{
        border: none;

      }

    }

    > .tag {
      width: 80px;
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 8px 0;
      margin-right: 13px;

      > .icon-wrapper {
        margin: 8px 0;
        border-radius: 50%;
        height: 50px;
        padding: 10px;
        background-color: #e6e6e6;
      }




      svg {

        width: 30px;
        height: 30px;
        color: #666;

      }
    }

  }


</style>