import axios from 'axios';
import router from "../../router";

axios.interceptors.request.use(
    config => {
        const storageData = JSON.parse(localStorage.getItem('user'));
        if (storageData) {
            config.headers['Authorization'] = storageData.token_type +' '+ storageData.access_token; 
        }
        return config;
    },
    error => {
        Promise.reject(error)
        //return error;
    });


// Add a response interceptor
axios.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    await console.log("test error", error.response.status);
    await console.log("test error", error.response.data.message);
    if (error.response.status === 401) {
      router.push("/");
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);


// initial state
const state = () => ({
  users: [],
  usersPaginatedData: null,
  user: null,
  isLoading: false,
  isCreating: false,
  createdData: null,
  isUpdating: false,
  updatedData: null,
  isDeleting: false,
  deletedData: null,
  formAction:'insert',
  message:null,
  responseStatus:false,
  successStatus:false,
});

// getters
const getters = {
  users: state => state.users,
  usersPaginatedData: state => state.usersPaginatedData,
  user: state        => state.user,
  isLoading: state   => state.isLoading,
  isCreating: state  => state.isCreating,
  isUpdating: state  => state.isUpdating,
  createdData: state => state.createdData,
  updatedData: state => state.updatedData,

  isDeleting: state  => state.isDeleting,
  deletedData: state => state.deletedData,
  formAction: state  => state.formAction,
  message: state     => state.message,
};

// actions
const actions = {
  async fetchAllUsers({ commit }, query = null) {
    let page = 1;
    let search = '';
    if(query !== null){
      page = query?.page || 1;
      search = query?.search || '';
    }

    commit('setUserIsLoading', true);
    let url = `${process.env.VUE_APP_API_URL}users?page=${page}`;
    if (search === null) {
      url = `${url}?page=${page}`;
    } else {
      url = `${process.env.VUE_APP_API_URL}users/search?search=${search}&page=${page}`
    }

    await axios.get(url)
      .then(res => {
        const users = res.data.data.data;
        commit('setUsers', users);
        const pagination = {
          total: res.data.data.total,  // total number of elements or items
          per_page: res.data.data.per_page, // items per page
          current_page: res.data.data.current_page, // current page (it will be automatically updated when users clicks on some page number).
          total_pages: res.data.data.last_page // total pages in record
        }
        res.data.data.pagination = pagination;

        commit('setUsersPaginated', res.data.data);
        commit('setUserIsLoading', false);
      }).catch(err => {
        commit('setUserIsLoading', false);
        commit('setMessage', err.response.data.message);
        
      });
  },

  async fetchDetailUser({ commit }, id) {
    commit('setUserIsLoading', true);
    await axios.get(`${process.env.VUE_APP_API_URL}users/${id}`)
      .then(res => {
        commit('setUserDetail', res.data.data);
        commit('setUserIsLoading', false);
      }).catch(err => {
        commit('setUserIsLoading', false);
        commit('setMessage', err.response.data.message);
      });
  },

  async storeUser({ commit }, user) {
    commit('setUserIsCreating', true);
    commit('setMessage', null);
    await axios.post(`${process.env.VUE_APP_API_URL}addUser`, user)
      .then(res => {
        commit('saveNewUsers', res.data.data);
        commit('setUserIsCreating', false);
      }).catch((err) => {
        commit('setUserIsCreating', false);
        commit('setMessage', err.response.data.message);
      });
  },

  async updateUser({ commit }, user) {
    commit('setUserIsUpdating', true);
    await axios.post(`${process.env.VUE_APP_API_URL}users/${user.id}?_method=PUT`, user)
      .then(res => {
        commit('setUserIsUpdating', false);
        commit('saveUpdatedUser', res.data.data);
      }).catch(err => {
        commit('setUserIsUpdating', false);
        commit('setMessage', err.response.data.message);
      });
  },

  async deleteUser({ commit }, id) {
    commit('setUserIsDeleting', true);
    await axios.delete(`${process.env.VUE_APP_API_URL}users/${id}`)
      .then(res => {
        commit('setDeleteUser', res.data.data.id);
        commit('setUserIsDeleting', false);
      }).catch(err => {
        commit('setUserIsDeleting', false);
        commit('setMessage', err.response.data.message);
      });
  },

  updateUserInput({ commit }, e) {
    commit('setUserDetailInput', e);
  }


}

// mutations
const mutations = {
  setUsers: (state, users) => {
    state.users = users
  },

  setUsersPaginated: (state, usersPaginatedData) => {
    state.usersPaginatedData = usersPaginatedData;
  },

  setUserDetail: (state, user) => {
    state.user = user
  },

  setDeleteUser: (state, id) => {
    let pData = state.usersPaginatedData.data;
    let index = pData.findIndex(pData => pData.id == id);
    state.usersPaginatedData.data.splice(index, 1);
    //state.usersPaginatedData.data.filter(x => x.id !== id);
  },

  setUserDetailInput: (state, e) => {
    let user = state.user;
    user[e.target.name] = e.target.value;
    state.user = user
  },

  saveNewUsers: (state, user) => {
    state.users.unshift(user)
    state.createdData = user;
  },

  saveUpdatedUser: (state, user) => {
    let pData = state.users;
    let index = pData.findIndex(pData => pData.id == user.id);
    state.users.splice(index, 1);
    state.users.splice( index, 0, user );
    state.updatedData = user;
  },

  setUserIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },

  setUserIsCreating(state, isCreating) {
    state.isCreating = isCreating
  },

  setUserIsUpdating(state, isUpdating) {
    state.isUpdating = isUpdating
  },

  setUserIsDeleting(state, isDeleting) {
    state.isDeleting = isDeleting
  },

  fromActionStatus(state, status) {
    state.formAction = status
  },

  setMessage(state, message){
    state.message = message
  },
  
}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}