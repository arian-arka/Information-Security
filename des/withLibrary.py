from Crypto.Cipher import DES
import base64,os
import multiprocessing

def _encrypt(data, key):
    return DES.new(bytes(key), DES.MODE_ECB).encrypt(data)

def writePassword(password):
    f= open('password.txt','w')
    f.write(password)
    f.close()

def eachEncryption(start,end,thread):
    #print('thread', thread)
    data = b'Break me'
    cipher = base64.b64decode('OsQFp1sqAEo=')
    for i in range(start,end):
        #os.system('cls')
        numStr = str(i)
        password = ('0' * (8 - len(numStr))) + numStr
        encrypted =  _encrypt(bytes(password.encode('utf-8')), data)
        #print(password,cipher,encrypted)
        if  encrypted == cipher:
            print(password)
            writePassword(password)
            return True
    return False

if __name__ == "__main__":
    threads = []
    coresCount = 20
    totalCount = 99999999 + 1
    #            12023456
    eachCount = totalCount // coresCount

    for i in range(coresCount):
        #threads.append(threading.Thread(target=eachEncryption, args=(i*eachCount,i*eachCount+eachCount,i,)))
        threads.append(multiprocessing.Process(target=eachEncryption, args=(i*eachCount,i*eachCount+eachCount,i)))

    for thread in threads:
        thread.start()

    for thread in threads:
        thread.join()
    #print('END')
