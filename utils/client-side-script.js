const axios = require("axios")
const {extractFunctions} = require("./function-extractor.js");

module.exports.getClientSideScript = async (a) => {
    let baseJS = a.data.match(/<script\s+src="([^"]+)"(?:\s+type="text\/javascript")?\s+name="player_ias\/base"\s*>|"jsUrl":"([^"]+)"/)
    let html5player = "https://www.youtube.com"+baseJS[2]
    let b = await axios(html5player)
    let functions = extractFunctions(b.data);
    return functions
}