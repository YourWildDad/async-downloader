const defaultOption = {}

export const xhr = (url, method = 'post', option = defaultOption) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true, option.user, option.password)
    xhr.responseType = 'blob'
    return xhr
}

export function isFunction(func) {
    return Object.prototype.toString.call(func) === '[object Function]'
}
