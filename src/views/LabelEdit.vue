<template>
  <layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click.native="goBack" />
      <span>编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="notes-wrapper">
    <Notes field-name="标签名"
           placeholder="在这里编辑标签"
           :value="tag.name"
              @update:value="updateTag" />
    </div>
    <div class="button-wrapper">
      <Button @click="removeTag">删除标签</Button>
    </div>
  </layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator';
  import Notes from '@/components/Notes.vue';
  import Button from '@/components/Button.vue';
  import store from '@/store/index2';
  @Component({
    components: {Button, Notes}
  })
  export default class LabelEdit extends Vue {
    tag?: {id: string;name: string}=undefined
  created(){
    const id=this.$route.params.id;
    // const tags=window.tagList
    const tag=store.getTag(id)
    if(tag){
       this.tag=tag
    }else{
      this.$router.replace('/404')
    }
  }
  updateTag(name: string){
  if(this.tag){
    store.updateTag(this.tag.id,name)
  }
  }
  removeTag(){
  if(this.tag){
if(store.removeTag(this.tag.id)){
  this.$router.back()
}else{
  alert('删除失败')
}
    }

  }

  goBack(){
    this.$router.back()
    }

  }
</script>

<style lang="scss" scoped>
  .navBar {
    text-align: center;
    font-size: 16px;
    padding: 12px 16px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > .title {
    }
    > .leftIcon {
      width: 24px;
      height: 24px;
    }
    > .rightIcon {
      width: 24px;
      height: 24px;
    }
  }
  .notes-wrapper{
    background: white;
    margin-top: 5px;
  }
  .button-wrapper{
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
</style>