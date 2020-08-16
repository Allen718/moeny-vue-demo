<template>
  <layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click.native="goBack" />
      <span>编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="notes-wrapper">
    <Notes type="text"
      field-name="标签名"
           placeholder="在这里编辑标签"
           :value="this.tag.name"
            @update:value="updateTag"
      />
    </div>
    <div class="button-wrapper">
      <Button @click="removeTag">删除标签</Button>
    </div>
  </layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Watch} from 'vue-property-decorator';
  import Notes from '@/components/Notes.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button, Notes}})


  export default class LabelEdit extends Vue {


    get tag() {
      return this.$store.state.CurrentTag as Tag
    }

    created() {
      const id = this.$route.params.id;
      this.$store.commit('fetchTag')
      this.$store.commit('setCurrentTag', id)
      if (!this.tag) {
        this.$router.replace('/404')
      }
    }
    updateTag(name: string) {
      if (this.tag) {
        this.$store.commit('updateTag', {name,id:this.tag.id} )
      }
    }


    removeTag() {
      if (this.tag) {
      this.$store.commit('removeTag',this.tag.id)
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