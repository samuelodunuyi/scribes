import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      msalConfig: {
        auth: {
          clientId: 'cf82eeff-0e15-4593-8ad0-2c60276f97e8',
          authority: "https://login.microsoftonline.com/2373a921-a6fe-4ee1-a785-838b208582ee",

        },
        cache: {
          cacheLocation: 'localStorage',
        },
      },
      accessToken: '',
      signedInUseremail: '',
      signedInUserRole: undefined,
      
    };
  },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
    }
  }
});

export default store;
