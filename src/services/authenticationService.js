import { PublicClientApplication } from '@azure/msal-browser';
import store from '../stores/authStore'
import Emitter from 'tiny-emitter';
import router from '../router';
import administrationsService from '../services/administrationsService'
import { useDashOptionStore } from "../stores/dashOption"
import pinia from "../stores/store";

const stores = useDashOptionStore(pinia);

export default {
    msalInstance: new PublicClientApplication(store.state.msalConfig),
    emitter: new Emitter(),
    account: [],

    async SignIn() {
        await this.msalInstance
            .loginPopup({})
            .then(async () => {
                const myAccounts = this.msalInstance.getAllAccounts();
                this.account = myAccounts[0];
                // const request = {
                //     scopes: ["user.read"],
                //     account: this.account,
                //   };||
                // const msalInstance = new PublicClientApplication(store.state.msalConfig);
                // try {
                //     let tokenResponse = await msalInstance.acquireTokenSilent(request);
                //     store.commit('setAccessToken', tokenResponse.accessToken);
                //     stores.accessToken = tokenResponse.accessToken
                //     console.log(stores.accessToken)
                // } catch (error) {
                //     console.error('Silent token acquisition failed. Using interactive mode');
                //     let tokenResponse = await msalInstance.acquireTokenPopup(request);
                //     console.log(`Access token acquired via interactive auth ${tokenResponse.accessToken}`)
                //     store.commit('setAccessToken', tokenResponse.accessToken);
                //     stores.accessToken = tokenResponse.accessToken
                // }
                // stores.signedInUserRole = (await administrationsService.getLoggedInUserRoles(myAccounts[0].username)).roleName
                stores.signedInUserRole = (await administrationsService.getLoggedInUser(myAccounts[0].username)).roleName
                stores.signedInUserLevel = (await administrationsService.getLoggedInUser(myAccounts[0].username)).levelDescription
                stores.signedInUserEmail = myAccounts[0].username
                if (this.account.name.split(" ")[2] == undefined) {
                   let userFullName = this.account.name.split(" ")[0] + " " + this.account.name.split(" ")[1];
                    stores.signedInUserName = userFullName;
                }
                else {
                   let userFullName = this.account.name.split(" ")[0] + " " + this.account.name.split(" ")[2];
                    stores.signedInUserName = userFullName;
                }

                const signOut = () => {
                    return authenticationService.SignOut();
                }

                this.emitter.emit('login', this.account);
                router.replace('/TRMS')
            })
            .catch(error => {
                console.error(`error during authentication: ${error}`);
            });
    },
    async SignOut() {
        await this.msalInstance
            .logoutPopup({})
            .then(() => {
                this.emitter.emit('logout', 'logging out');
                stores.signedInUserEmail = ''
                stores.signedInUserRole = ''
                stores.signedInUserLevel = ''
                this.account = undefined
                router.push('/login')
            })
            .catch(error => {
                console.error(error);
            });
    },
}