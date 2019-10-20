const _sodium = require('libsodium-wrappers');

var rx = null;
var tx = null;
var privateKey = null;
var publicKey = null;
var clientKey = null;

module.exports.setClientPublicKey = function(key)
{
    //stop if key already set
    if (clientKey === key)
        return;

    //throw except if key alrady set
    if ((clientKey !== null) && (clientKey !== key))
        throw 'client public key already set';

    clientKey = key;

    //generate server key exchange
    const keypair = _sodium.crypto_kx_keypair();
    privateKey = keypair.privateKey;
    publicKey = keypair.publicKey;

    //maken shared keys
    sharedKeys = _sodium.crypto_kx_server_session_keys(publicKey,privateKey,key);

    //set rx and tx
    rx = sharedKeys.sharedRx;
    tx = sharedKeys.sharedTx;
}

module.exports.serverPublicKey = async function()
{
    //wait sodium to be ready
    await _sodium.ready;

    //return public key
    return publicKey;
}

module.exports.encrypt = async function(msg)
{
    //wait to be ready
    await _sodium.ready;

    //make nonce and encrypt
    nonce = _sodium.randombytes_buf(_sodium.crypto_secretbox_NONCEBYTES)
    ciphertext = _sodium.crypto_secretbox_easy(msg, nonce, tx)

    //return cipher and nonce
    return { ciphertext, nonce }
}

module.exports.decrypt = async function(ciphertext, nonce)
{
    //wait sodium to be ready
    await _sodium.ready;

    //decrypt messagen cipher and noce
    return await _sodium.crypto_secretbox_open_easy(ciphertext, nonce, rx)
}