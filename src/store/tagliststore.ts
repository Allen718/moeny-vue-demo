
import createId from '@/lib/createId';
const localStorageKeyName='tagList'
const tagStore={
  tagList:[] as Tag[],
  fetch(){
    this.tagList= JSON.parse(localStorage.getItem( localStorageKeyName)||'[]')
    return this.tagList
  },

  createTag(name: string){
    const names=this.tagList.map(item=>item.name)
    if (names.indexOf(name) >= 0) {
      alert('标签名重复了')
      return 'duplicated'}
    else {
      const  id=createId().toString()
      this.tagList.push({id:id,name:name})
      tagStore.saveTag()
      return 'success'
    }

  },
  removeTag(id: string){
    let index =-1
    for(let i=0;i<this.tagList.length;i++){
      if(this.tagList[i].id===id){
        index=i
        break
      }
    }
    this.tagList.splice(index,1)
    tagStore.saveTag()
    return true
    },
  updateTag(id: string,name: string){
    const idList=this.tagList.map(item=>item.id)
    if(idList.indexOf(id)>=0){
      const names=this.tagList.map(item=>item.name)
      if(names.indexOf(name)>=0){
        return "duplicated"
      }else{
        const tag=this.tagList.filter(item=>item.id===id)[0]
        tag.name=name
        tagStore.saveTag()
        return 'success'
      }
    }else{
      return 'not find'
    }
  },
  getTag(id: string){
    return this.tagList.filter(t=>t.id===id)[0]
  },
  saveTag(){
    window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.tagList))
  }
}
tagStore.fetch()
export default tagStore