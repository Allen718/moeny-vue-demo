<template>
    <ul class="tabs">
    <li v-for="item in dataSource" :key="item.value" class="tabs-item"
         :class="{
       selected: item.value===value,
       [classPrefix+'-item']:classPrefix
          }"
        @click="selectType(item)"                                          >
    {{item.text}}</li>
    </ul>
</template>

<script lang="ts">
    import Vue from "vue"
    import {Component, Prop, } from 'vue-property-decorator';
    type dataSourceItem={
        text: string;
        value: string;
    }
    @Component
    export default class Tabs extends Vue {
        @Prop()readonly value!: string
        @Prop()classPrefix?: string
        @Prop({required:true,type:Array})
        dataSource!: dataSourceItem[]
        selectType(item: dataSourceItem) {
            this.$emit('update:value',item.value)
        }
  }
</script>

<style lang="scss" scoped>
    .tabs {
        background:blue;
        display: flex;
        text-align: center;
        font-size: 24px;
        &-item  {
            width: 50%;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            &.selected::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: #333;
            }
        }
    }
    @import "~@/assets/style/helper.scss";
    @import "~@/assets/style/reset.scss";
</style>