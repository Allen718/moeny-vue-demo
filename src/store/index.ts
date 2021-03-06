import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex)
const store=new Vuex.Store({
  state:{
   recordList:[] ,
    tagList:[],
    CurrentTag:undefined,
    createTagError: null,
  }as RootState,
  mutations: {
    setCurrentTag(state,id: string){
    state.CurrentTag= state.tagList.filter(t=>t.id===id)[0]
      },
    fetchRecord(state) {
      state.recordList = JSON.parse(localStorage.getItem('recordList') || '[]')
    },
    createRecord( state,record: RecordItem){
      const record2=clone(record)
      record2.createdAt=record2.createdAt||new Date().toISOString()
      state.recordList.push(record2)
      store.commit('saveRecord')
    },
    saveRecord(state){
      window.localStorage.setItem('recordList',JSON.stringify(state.recordList))
      window.alert('添加成功')
    },
    fetchTag(state){
        state.tagList= JSON.parse(localStorage.getItem('tagList')||'[]')
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', '水果');
        store.commit('createTag', '外卖');
        store.commit('createTag', '交通');
        store.commit('createTag', '房租');
      }
    },
    createTag( state,name: string){
      const names=state.tagList.map(item=>item.name)
      if (names.indexOf(name) >= 0) {
        state.createTagError = new Error('tag name duplicated');
        return;
        // alert('标签名重复了')
       }
      else {
        const  id=createId().toString()
        state.tagList.push({id:id,name:name})
        store.commit('saveTag')

      }

    },
    saveTag(state){
      window.localStorage.setItem('tagList',JSON.stringify(state.tagList))
    },
    updateTag(state,payload: {id: string;name: string}){
      const{id,name}=payload
      console.log(name)
      const idList=state.tagList.map(item=>item.id)
      if(idList.indexOf(id)>=0){
        const tag=state.tagList.filter(item=>item.id===id)[0]
        const names=state.tagList.map(item=>item.name)
        if(names.indexOf(name)>=0){
        // window.alert('标签名重复了')
        }else{
          tag.name=name
          store.commit('saveTag')
        }
      }
    },
    removeTag(state,id: string){
      let index =-1
      for(let i=0;i<state.tagList.length;i++){
        if(state.tagList[i].id===id){
          index=i
          break
        }
      }
      if(index>=0){
        state.tagList.splice(index,1)
        store.commit('saveTag')
        router.back()
      }else{
        window.alert('删除失败')
      }




    },
  },
  actions: {
  },
  modules: {
  }
})


export default store