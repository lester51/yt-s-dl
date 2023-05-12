const axios = require("axios")
const cheerio = require("cheerio");

module.exports.getVideoInfo = async (videoID) => {
    const baseUrl = "https://www.youtube.com"
	let a = await axios.get(`${baseUrl}/watch?v=${videoID}`)
	$a = cheerio.load(a.data)
    let scriptObj = $a('body').children('script').text()
    scriptObj = scriptObj.match(/var ytInitialPlayerResponse = {.*}/g)
    metadata = eval(`${scriptObj}; function getObj(obj){return obj} getObj(ytInitialPlayerResponse)`)
    let videoInfo = {videoId:metadata.videoDetails.videoId}
    Object.assign(videoInfo,metadata.microformat.playerMicroformatRenderer)
    return videoInfo
}