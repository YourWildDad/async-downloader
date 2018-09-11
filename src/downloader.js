import xhr from './async'

class Downloader {
    constructor(url, data, method, option) {
        this.xhr = xhr(url, method, option)
        this._onProcess = []
        this._onError = []
        this._onFinish = []
        this._data = data
        this.isDownloading = false
    }

    onFinish(callback) {
        isFunction(callback) && this._onFinish.push(callback)
    }

    onProcess(callback) {
        isFunction(callback) && this._onProcess.push(callback)

    }

    onError() {
        isFunction(callback) && this._onError.push(callback)
    }

    abort() {
        if (this.isDownloading) {
            this.xhr.abort()
        }
    }

    start() {
        let prevLoaded = 0
        this.xhr.onerror = () => {
            this._onError.forEach(callback => {
                callback.call(this.xhr, [])
            })
        }

        this.xhr.onprogress = (event) => {
            const percent = event.loaded / event.total
            const speed = event.loaded - prevLoaded
            prevLoaded = event.loaded
            this._onProcess.forEach(callback => {
                callback.call(this.xhr, [percent, speed, event.loaded, event.total])
            })
        }

        this.xhr.onloadstart = () => {
            this.isDownloading = true
        }

        this.xhr.onreadystatechange = () => {
        }

        this.xhr.send(_data)
    }

}
