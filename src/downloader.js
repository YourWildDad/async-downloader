import { xhr, isFunction } from './utils'
import FileSaver from 'file-saver'

class Downloader {
    constructor(url, data, fileName, method, option) {
        this.xhr = xhr(url, method, option)
        this._onProcess = []
        this._onError = []
        this._onFinish = []
        this._data = data
        this._fileName = fileName
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
            const percent = event.loaded / event.total || 0
            const speed = event.loaded - prevLoaded
            prevLoaded = event.loaded
            this._onProcess.forEach(callback => {
                callback.apply(this.xhr, [percent, speed, event.loaded, event.total])
            })
        }

        this.xhr.onloadstart = () => {
            this.isDownloading = true
        }

        this.xhr.onreadystatechange = () => {
            if (this.xhr.readyState === XMLHttpRequest.DONE && this.xhr.status === 200) {
                FileSaver.saveAs(this.xhr.response, this._fileName)
            }
        }

        this.xhr.send(this._data)
    }

}

function download(...args) {
    return new Downloader(...args)
}

export default download
