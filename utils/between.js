module.exports.between = (haystack, left, right) => {
    let pos;
    if (left instanceof RegExp) {
        let match = haystack.match(left);
        if (!match) return '';
        pos = match.index + match[0].length;
    } else {
        pos = haystack.indexOf(left);
        if (pos === -1) return '';
        pos += left.length;
    }
    haystack = haystack.slice(pos);
    pos = haystack.indexOf(right);
    if (pos === -1) return '';
    haystack = haystack.slice(0, pos);
    return haystack;
};