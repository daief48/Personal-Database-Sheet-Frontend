import axios from 'axios';
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
    });

//Add a response interceptor
axios.interceptors.response.use((response) => {
    return response
}, function(error) {
    return Promise.reject(error);
});


// initial state
const state = () => ({
    otpUserId :'',
    otp:''
});

// getters
const getters = {
    otpUserId: state => state.otpUserId,
    otp: state => state.otp,
};

// actions
const actions = {
    async setOtpUserId({ commit }, id){
        commit('setOtpUserId', id);
    },
    async setOtp({ commit }, id){
        commit('setOtp', id);
    }
}

// mutations
const mutations = {
    setOtpUserId: (state, id) => {
        state.otpUserId = id
    },
    setOtp: (state, otp) => {
        state.otp = otp
    },

}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}