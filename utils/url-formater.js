const vm = require('vm');
const querystring = require('querystring');

module.exports.setDownloadURL = (format, decipherScript, nTransformScript) => {
    const decipher = url => {
        const args = querystring.parse(url);
        if (!args.s || !decipherScript) return args.url;
        const components = new URL(decodeURIComponent(args.url));
        components.searchParams.set(args.sp ? args.sp : 'signature', decipherScript.runInNewContext({
            sig: decodeURIComponent(args.s)
        }));
        return components.toString();
    };
    const ncode = url => {
        const components = new URL(decodeURIComponent(url));
        const n = components.searchParams.get('n');
        if (!n || !nTransformScript) return url;
        components.searchParams.set('n', nTransformScript.runInNewContext({
            ncode: n
        }));
        return components.toString();
    };
    const cipher = !format.url;
    const url = format.url || format.signatureCipher || format.cipher;
    format.url = cipher ? ncode(decipher(url)) : ncode(url);
    delete format.signatureCipher;
    delete format.cipher;
    return format
};