# YOUTUBE SEARCH & DOWNLOAD

![ytvanced](https://vancedyoutube.org/wp-content/uploads/2023/03/youtube-vanced-icon.png)

A YouTube Video downloader.

# HOW TO INSTALL?
```
npm i youtube-s-dl
```

# Require to export function
```js
//CommonJS
const {download, search, getStreamFormats, getVideoInfo} = require("youtube-s-dl");
```

## SIMPLE USAGE
### search and download videos
```js
const {download, search, getVideoInfo} = require("youtube-s-dl");

//search param. is string
let result = await search(<Title>)
console.log(result)

//getVideoInfo param. is string
let info = getVideoInfo(<VideoID>)
console.log(info)

try{
    //download params. are videoId(required) and Format object is optional parameter.
    stream = await download(<VideoID>,<Format>)
    path = "./tmp/videoplayback.mp4"
    file = fs.createWriteStream(path)
    stream.pipe(file).on('finish',()=>{
	    console.log("Video Downloaded")
    }).on('close',()=>{
	    console.log("Request Finished")
    }).on('error',()=>{
	    console.log("Seems there's an error happened while writing the file.")
    })
}
catch(e){
    console.log(e)
}
```