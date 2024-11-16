from base64 import b64decode
from base64 import b64encode


#
from Crypto.Cipher import AES
# from Crypto.Random import get_random_bytes
# from Crypto.Util.Padding import pad, unpad
#
# class AESCipher:
#     def __init__(self, key):
#         self.key = key
#
#     def encrypt(self, data):
#         iv = get_random_bytes(AES.block_size)
#         self.cipher = AES.new(self.key, AES.MODE_CBC, iv)
#         return b64encode(iv + self.cipher.encrypt(pad(data.encode('utf-8'),
#                                                       AES.block_size)))
#
#     def decrypt(self, data):
#         raw = b64decode(data)
#         self.cipher = AES.new(self.key, AES.MODE_CBC, raw[:AES.block_size])
#         return unpad(self.cipher.decrypt(raw[AES.block_size:]), AES.block_size)

def bitFlip(pos, bit, data):
    raw = b64decode(data)

    list1 = list(raw)

    list1[pos] = list1[pos] ^ bit

    return b64encode(bytes(list1))


if __name__ == '__main__':
    originalMessage = "?date=2019/03/05&comment=request&admin=0"
    #print(AES.block_size) # 128
    #print(len(originalMessage)) # 40 => 320 bytes => 256 + 64 + 64(padding) => 32byte + 8 byte + 8 byte = 48 => 1 is the last byte of message so there is 0,1,2,3,45,46,47 => 47 - 8 = 39
    originalEncryptedMessage = "yPQ2zpXT/rtd/nI13tOGDkER9VUf6Lye40tfQzVhoud8+RPxJIlctu/y0ataF1LQ"

    # x ^ 0 = 1 => x = ?
    # actually because its ascii
    # x ^ 48 = 49 => x = 49 ^ 48  = 1
    #
    # print('Original Message:', msg)
    #
    # ctx = AESCipher(key).encrypt(msg).decode('utf-8')
    # print('Ciphertext      :', ctx)

    bitFlippedEncrypted = bitFlip(39, 1, originalEncryptedMessage)
    print(bitFlippedEncrypted)
