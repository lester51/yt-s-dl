const axios = require("axios")
const cheerio = require("cheerio")
const {getClientSideScript} = require("./utils/client-side-script.js")
const {checkSig} = require("./utils/sig-check.js")
const {decipher} = require("./utils/decipher.js");

module.exports.getStreamFormats = async (videoID) => {
    const baseUrl = "https://www.youtube.com"
	let a = await axios.get(`${baseUrl}/watch?v=${videoID}`)
	playerjsScripts = await getClientSideScript(a)
	$a = cheerio.load(a.data)
    let scriptObj = $a('body').children('script').text()
    scriptObj = scriptObj.match(/var ytInitialPlayerResponse = {.*}/g)
    metadata = eval(`${scriptObj}; function getObj(obj){return obj} getObj(ytInitialPlayerResponse)`)
    streamInfo = metadata.streamingData
    delete streamInfo.expiresInSeconds
    delete streamInfo.probeUrl
    if (checkSig(streamInfo.formats)){
  	    arr1 = [],arr2 = []
        streamInfo.formats.forEach((format,idx)=>{
  	        arr2.push(decipher(format,playerjsScripts))
    	})
        streamInfo.adaptiveFormats.forEach((format,idx)=>{
  	        arr1.push(decipher(format,playerjsScripts))
    	})
  	    streamInfo.formats.length = 0
        streamInfo.formats = arr2
        streamInfo.adaptiveFormats.length = 0
        streamInfo.adaptiveFormats = arr1
  	    return streamInfo
  	}else{
  	    return streamInfo
  	}
}