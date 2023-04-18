<template>
  <div class="hello">
    <input type="text" v-model="uname"> <button @click="addUser">Add</button>
<table class="table table-bordered" width="100%">
<thead><th>Name</th><th>Action</th></thead>
<tbody>
<tr v-for="(name,index) in $store.getters.getAllusers" :key="index">
<td>{{ name }} </td>
<td><button @click="deleteUser(index)">Delete</button></td>
</tr>
</tbody>
</table>

  </div>
</template>

<script>
import {ref } from "vue"
import {useStore } from "vuex"
export default {
  setup(){
    const store = useStore();
    const uname = ref('');
    const addUser = () => {
      const data = {
        name:uname.value
      }
      store.dispatch('addUser',data);
      uname.value='';
    };

    const deleteUser = (index) => {
      store.dispatch('deleteUser',index)
    };

    return {uname, addUser, deleteUser}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
