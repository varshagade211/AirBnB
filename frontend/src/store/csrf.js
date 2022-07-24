import Cookies from 'js-cookie'


//export const csrfFetch = async(url,options = {})=>{
export async function csrfFetch(url, options = {}) {

    options.method = options.method || 'GET'
    options.headers = options.headers || {}

    if(options.method.toUpperCase() !== 'GET'){
        options.headers['Content-Type'] = 'application/json'
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN')
    }
    const response = await window.fetch(url,options)
    //if error throw response
    if (response.status >= 400) throw response;
    return response
}


export const restoreCSRF = () => {
   return csrfFetch('/api/csrf/restore')
}
