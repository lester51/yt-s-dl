const {cutAfterJS} = require('./cut-after.js')
const {between} = require('./between.js');

module.exports.extractFunctions = (body) => {
    let functions = [];
    function extractManipulations (caller){
        let functionName = between(caller, `a=a.split("");`, `.`);
        if (!functionName) return '';
        let functionStart = `var ${functionName}={`;
        let ndx = body.indexOf(functionStart);
        if (ndx < 0) return '';
        const subBody = body.slice(ndx + functionStart.length - 1);
        return `var ${functionName}=${cutAfterJS(subBody)}`;
    };
    function extractDecipher (){
        let functionName = between(body, `a.set("alr","yes");c&&(c=`, `(decodeURIC`);
        if (functionName && functionName.length) {
            let functionStart = `${functionName}=function(a)`;
            let ndx = body.indexOf(functionStart);
            if (ndx >= 0) {
                let subBody = body.slice(ndx + functionStart.length);
                let functionBody = `var ${functionStart}${cutAfterJS(subBody)}`;
                functionBody = `${extractManipulations(functionBody)};${functionBody};${functionName}(sig);`
                functions.push(functionBody)
            }
        }
    };
    function extractNCode (){
        let functionName = between(body, `&&(b=a.get("n"))&&(b=`, `(b)`);
        if (functionName.includes('[')) functionName = between(body, `${functionName.split('[')[0]}=[`, `]`);
        if (functionName && functionName.length) {
            let functionStart = `${functionName}=function(a)`;
            let ndx = body.indexOf(functionStart);
            if (ndx >= 0) {
                let subBody = body.slice(ndx + functionStart.length);
                let functionBody = `var ${functionStart}${cutAfterJS(subBody)};${functionName}(ncode);`;
                functions.push(functionBody);
            }
        }
    };
    extractDecipher();
    extractNCode();
    return functions;
};