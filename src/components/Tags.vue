<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id" @click="toggle(tag)"
          :class="{selected:value.indexOf(tag)>=0}">{{tag.name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from "vue"
  import {Component, Prop} from 'vue-property-decorator';
  @Component
  export default class Tags extends Vue {
    @Prop() value!: Tag[]
   get tagList(){
      return this.$store.state.tagList as Tag[]
    }

    toggle(tag: Tag) {
      const selectedTags=this.value
      const index = this.value.indexOf(tag);
      if (index >= 0) {
        selectedTags.splice(index,1)
      } else {
        selectedTags.push(tag)
      }
      this.$emit('update:value', selectedTags);
    }
    create() {
      const name = window.prompt('请输入标签名')
      if (!name) {
        return window.alert('标签名不能为空')
      } else  {
       this.$store.commit('createTag',name)
        if (this.$store.state.createTagError) {
          const map: { [key: string]: string } = {
            'tag name duplicated': '标签名重复了'
          };
          window.alert(map[this.$store.state.createTagError.message] || '未知错误');
        }

      }
        }
    created(){
    this.$store.commit('fetchTag')
        }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  @import "~@/assets/style/reset.scss";
  .tags {
    background: white;
    font-size: 14px;
    padding: 16px;
    flex-grow: 1;
    display: flex;
    flex-direction: column-reverse;
    >.current {

      display: flex;
      flex-wrap: wrap;
      > li {
   $bg:#d9d9d9;
        background: $bg;
        $h: 24px;
        height: $h;
        line-height: $h;
        border-radius: $h/2;
        padding: 0 16px;
        margin-right: 12px;
        margin-top: 4px;
      &.selected{
        background: darken($bg,25%);
      }
      }
    }
    > .new {
      padding-top: 16px;
      button {
        background: transparent;
        border: none;
        color: #999;
        border-bottom: 1px solid;
        padding: 0 4px;
      }
    }
  }
</style>