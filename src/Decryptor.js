/*
Software Security - Cryptography exercise
Charles D. White
October 2019
code used for decrypting a ciphertext, using symmetric cryptography -- tested with tests/decrypt.test.js
*/
// load sodium-wrappers module
const sodium = require('libsodium-wrappers');
let key = null;
// let - var
// generates a key
module.exports.setKey = async function setKey(keyi)
{
    key = keyi;
}
// decrypts the encrypted message using key and the unique nonce
module.exports.decrypt = async function decrypt(ciphertext, nonce)
{
    if(key == null){
        throw 'no key defined';
    }
    else{
        return sodium.crypto_secretbox_open_easy(ciphertext, nonce, key);
    }
}