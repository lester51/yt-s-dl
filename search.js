const axios = require("axios")
const cheerio = require("cheerio");

module.exports.search = async (query) => {
    const baseUrl = "https://www.youtube.com"
    q = query.replace(/ /g,'+')
    let {data} = await axios.get(`${baseUrl}/results?search_query=${q}`)
    $a = cheerio.load(data)
    let scriptObj = $a('body').children('script').text()
    scriptObj = scriptObj.match(/var ytInitialData = {.*};/g)[0].match(/var ytInitialData = {.*?};/g)
    let search = eval(scriptObj[0]+"let a = b =>{return b};a(ytInitialData)")
    searchData = search.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents
    searchData = searchData.filter(item => Object.keys(item).includes('videoRenderer'));
    searchResult = []
    searchData.forEach((vid,idx)=>{
	    obj = {}
	    obj.videoId = vid.videoRenderer.videoId;
	    obj.title = vid.videoRenderer.title.runs[0].text
	    obj.uploaderName = vid.videoRenderer.ownerText.runs[0].text
	    obj.thumbnail = vid.videoRenderer.thumbnail
	    obj.label = vid.videoRenderer.title.accessibility.accessibilityData.label
	    obj.publishedTime = vid.videoRenderer.publishedTimeText
	    obj.videoLength = vid.videoRenderer.lengthText
   	    obj.viewCount = vid.videoRenderer.viewCountText.simpleText
	    obj.shortViewCount = vid.videoRenderer.shortViewCountText
   	    obj.videoLength = vid.videoRenderer.lengthText
	    searchResult.push(obj)
    })
    return searchResult
}