module.exports.checkSig = (arr) => {
    let hasSig = false;
    arr.forEach(obj => {
        if (obj.signatureCipher) hasSig = true;
    });
    return hasSig;
}