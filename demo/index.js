import download from '../src/downloader'

const downloader = download('mp3?id=579954.mp3', {}, 'test.mp3')

const process = document.getElementById('process')

const span = document.getElementById('speed')

downloader.onProcess((percent, speed) => {
    process.style.width = `${percent * 100}%`
    span.innerText = `${speed}kb/s`
})

downloader.start()
