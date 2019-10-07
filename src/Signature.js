/*
Software Security - Cryptography exercise
Charles D. White
October 2019
code used for signing a message, using public-key signatures -- tested with tests/sign.test.js
 */
// load sodium-wrappers module (object) contains ready property which is a promise to be resolved before using the sodium functions

const sodium = require('libsodium-wrappers');
let keypair = null;
let loadLibsodium = async() => await sodium.ready;

// generates a key pair, ie public and private key
(async () => {
    await loadLibsodium();
    
    keypair = sodium.crypto_sign_keypair();
})();

// verifies the key pair and returns the public key 
module.exports.verifyingKey = async function verifyingKey()
{
    await loadLibsodium();

    return keypair.publicKey;
}
// applies the private key of the keypair to the message
module.exports.sign = async function sign(msg){
    return sodium.crypto_sign(msg,keypair.privateKey)
}

//publickey in de verifyingKey()  sturen en de private moet je gebruiken om de message te encrypteren in de functie sign
//verifyingKey() moet de public key terug sturen
//crypto_sign_keypair() voor het genereren van de keypair
//crypto_sign voor het signen van de message met de private key

//2 methods to be implemented

// 1st method: sign(msg)

// 2nd method: publicKey = verifyingKey(privateKey)

// source: https://libsodium.gitbook.io/doc/public-key_cryptography/public-key_signatures

// Libsodium wrappers:
// --> JavaScript (libsodium.js wrapper): https://github.com/wilhelmmatilainen/natrium
// --> JavaScript (libsodium.js wrapper for browsers): https://github.com/wilhelmmatilainen/natrium-browser
