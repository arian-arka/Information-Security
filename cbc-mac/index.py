from base64 import b64decode

def xor(l1,l2):
    return [el1 ^ el2 for el1,el2 in zip(l1,l2)]


msg = 'to=9714163002&from=9711412111&amount=10000000'
iv = list(b64decode('qes/2BpH9BvVN7f6jFy43g=='))
mac = list(b64decode('NEhKNEtaR3lDdzRtWHJJTg=='))
msgBytes = list(bytes(msg, 'utf-8'))
firstBlock = msgBytes[:16]
anotherBlock = list(bytes('to=181555555&&fr', 'utf-8'))



anotherIv = xor(xor(iv,firstBlock),anotherBlock)

print(anotherIv)
