let id: number=parseInt(window.localStorage.getItem('_MaxId')||'0')||0
function createId() {
  id++
  window.localStorage.setItem('_MaxId',id.toString())
  return id

}
export default createId;