const vm = require('vm')
const {setDownloadURL} = require('./url-formater.js');

module.exports.decipher = (format,functions) => {
    const decipherScript = functions.length ? new vm.Script(functions[0]) : null;
    const nTransformScript = functions.length > 1 ? new vm.Script(functions[1]) : null;
    return setDownloadURL(format, decipherScript, nTransformScript)
}