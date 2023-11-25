import { createStore, createLogger  } from 'vuex'

import user from './modules/User';
import auth from './modules/Auth';


const debug = process.env.NODE_ENV !== 'production'
// Create a new store instance.
const store = createStore({
  modules: {
    auth,
    user,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default store
