import math

def fi(p, q):
    return (p - 1) * (q - 1)

def modInverse(A, M):
    for X in range(1, M):
        if (((A % M) * (X % M)) % M == 1):
            return X
    return None

def solveKeys(f):
    e = None
    for i in range(2, f + 1):
        if math.gcd(i, f) == 1:
            e = i
            break
    return (e, modInverse(e, f))

def findPublicAndPrivateKeys(p, q):
    f = fi(p, q)
    return solveKeys(f)

def modularExponentiation(x, y, p):
    res = 1
    x = x % p
    if (x == 0):
        return 0
    while (y > 0):
        if ((y & 1) == 1):
            res = (res * x) % p
        y = y >> 1
        x = (x * x) % p

    return res

def encrypt(data, p, q):
    n = p * q
    e, d = findPublicAndPrivateKeys(p, q)
    print('Keys:', (e, d))  # (5, 531477101)
    return {
        'cipher': modularExponentiation(data,e,n),
        'e': e,
        'd': d
    }

def decrypt(data, d, n):
    return modularExponentiation(data,d,n),

def findValidPrimeNumber(max):
    a, b = 1, 1
    while a * b < max:
        a, b = b, a + b
    return (a, b)


number = 981531027
p, q = findValidPrimeNumber(number)
n = p * q

print('p,q:', (p, q))  # 28657,46368

encrypted = encrypt(number, p, q)

print('Encrypted:', encrypted['cipher'])  # 122262435

print('Decrypted:', decrypt(encrypted['cipher'], encrypted['d'], n)) #981531027

