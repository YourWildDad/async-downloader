const defaultOption = {}
const xhr = (url, method = 'post', option = defaultOption) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true, option.user, option.password)
    return xhr
}

export default xhr
