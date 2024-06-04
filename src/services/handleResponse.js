import authenticationService from './authenticationService';

export default function handleResponse(response) {
    console.log(response)
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.SignOut;
                location.reload(true);
            }
            var error = ''
            if(Array.isArray(data)) {
                error = data.join();
            }else{
                error = (data && data.message) || response.statusText;
            }
            return Promise.reject(error);
        }
        return data;
    });
}
