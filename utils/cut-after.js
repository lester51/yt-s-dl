module.exports.cutAfterJS = (mixedJson) => {
    let ESCAPING_SEQUENZES = [
        { start: '"', end: '"' },
        { start: "'", end: "'" },
        { start: '`', end: '`' },
        { start: '/', end: '/', startPrefix: /(^|[[{:;,/])\s?$/ },
    ];
    let open, close;
    if (mixedJson[0] === '[') {
        open = '[';
        close = ']';
    } else if (mixedJson[0] === '{') {
        open = '{';
        close = '}';
    }
    if (!open) throw new Error(`Can't cut unsupported JSON (need to begin with [ or { ) but got: ${mixedJson[0]}`);
    let isEscapedObject = null;
    let isEscaped = false;
    let counter = 0;
    let i;
    for (i = 0; i < mixedJson.length; i++) {
        if (!isEscaped && isEscapedObject !== null && mixedJson[i] === isEscapedObject.end) {
            isEscapedObject = null;
            continue;
        } else if (!isEscaped && isEscapedObject === null) {
            for (const escaped of ESCAPING_SEQUENZES) {
                if (mixedJson[i] !== escaped.start) continue;
                if (!escaped.startPrefix || mixedJson.substring(i - 10, i).match(escaped.startPrefix)) {
                    isEscapedObject = escaped;
                    break;
                }
            }
            if (isEscapedObject !== null) continue;
        }
        isEscaped = mixedJson[i] === '\\' && !isEscaped;
        if (isEscapedObject !== null) continue;
        if (mixedJson[i] === open) counter++;
        else if (mixedJson[i] === close) counter--;
        if (counter === 0) return mixedJson.substring(0, i + 1);
    }
    throw Error("Can't cut unsupported JSON (no matching closing bracket found)");
};