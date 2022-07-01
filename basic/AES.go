package main

import (
	"crypto/aes"
	"crypto/cipher"
	"encoding/base64"
)

func main() {

}

func AesEncrypt(orig string, key string) {
	origData := []byte(orig)
	K := []byte(key)

	block, _ := aes.NewCipher(k)
	blocksize := block.BlockSize()
	origData = PKCS7Padding(origData, blocksize)
	blockmode := cipher.NewCBCEncrypter(block, k[:blocksize])
	cryted := make([]byte, len(origData))
	blockmode.CryptBlocks(cryted, origData)
	return base64.StdEncoding.EncodeToString(cryted)
}
