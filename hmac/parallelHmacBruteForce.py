import multiprocessing
import base64
import hmac
import hashlib

def hmacSha256(body, secret, method, dateTime, convertToBase64=True):
    digest = hashlib.md5(bytearray(body.encode('utf-8'))).hexdigest()
    msg = '{0}\n{1}\n{2}'.format(method, digest, dateTime)
    hmacKey = hmac.new(bytearray(secret.encode('utf-8')), bytearray(msg.encode('utf-8')), hashlib.sha256).digest()
    return base64.b64encode(hmacKey).decode() if convertToBase64 else hmacKey

def testHmac(target,body, secret, method, dateTime):
    return target == hmacSha256(body,secret,method,dateTime,False)

def writePassword(password):
    f= open('hmacPassword.txt','w')
    f.write(password)
    f.close()

def eachEncryption(index,count,thread):
    print('Thread:',thread,'started')

    chars = list('1234567890abcdefghijklmnopqrstuvwxyz')
    charsToStart = list(chars[index:index+count])
    target = base64.b64decode('9KYjUEIKGg9lU/rTeMyjqeSP+z53Y/km7+7vaSwOnFE=')
    body = '90221122'
    dateTime = '2019-06-03 12:21:10'
    method = 'POST'

    for ch1 in charsToStart:
        for ch2 in chars:
            for ch3 in chars:
                for ch4 in chars:
                    for ch5 in chars:
                        for ch6 in chars:
                            secret = ch1 + ch2 + ch3 + ch4 + ch5 + ch6
                            if testHmac(target, body, secret, method, dateTime):
                                print('#FOUND:', secret)
                                writePassword(str(secret))
                                return secret # return 4g1hyu
    return False

if __name__ == "__main__":
    threads = []
    index = 0
    for i in range(0,26,2):
        threads.append(multiprocessing.Process(target=eachEncryption, args=(i ,2, i/2)))
    for i in range(26,36):
        threads.append(multiprocessing.Process(target=eachEncryption, args=(i ,1, i/2)))

    for thread in threads:
        thread.start()

    for thread in threads:
        thread.join()
    print('END')
