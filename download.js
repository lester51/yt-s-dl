const request = require("request")
const {getStreamFormats} = require("./streamFormats.js")

module.exports.download = async (videoId,options) => {
    function selectFormat(formats,option) {
        const selected = formats.filter(format => {
            return Object.keys(option).every(key => {
                if (key === 'mimeType') return format[key].includes(option[key]);
                return format[key] === option[key];
            });
        });
        return selected;
    }
    async function getFormatByParams(videoId){
  	    format = await getStreamFormats(videoId)
  	    arr = []
  	    for (i=0;i<format.formats.length;i++) arr.push(format.formats[i]);
  	    for (i=0;i<format.adaptiveFormats.length;i++) arr.push(format.adaptiveFormats[i]);
  	    if (options === undefined) return arr;
  	    else {
  	        result = selectFormat(arr, options);
  	        if (result.length === 0) throw new Error('No available formats for the given parameter.');
  	        return result;
  	    }
  	}
    selectedFormatByParams = await getFormatByParams(videoId)
  	if (selectedFormatByParams.length === 0) throw new Error("Can't find a format with a given parameters!")
    else return request(selectedFormatByParams[0].url)
}