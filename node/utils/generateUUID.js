const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 15);

let generateUUID = () => {
    return nanoid();
}

module.exports = { generateUUID };