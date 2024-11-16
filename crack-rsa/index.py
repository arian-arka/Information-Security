from sympy import factorint

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

n = 9567648541342714273618397561214215397959
e = 149
cipher = 5101563157217603607783475714833407778485


p,q = factorint(n)
print('p,q:',(p,q))
n = p*q
print('n:',n)
f = (p-1) * (q-1)

d = pow(e, -1, f)
print('d:',d)

message = modularExponentiation(cipher,d,n)
print('message:',message)

# for i in range(2,f+1):
#     if (i*f + 1) % e == 0:
#         print((i*f + 1) / e )
#         #break
# # print(f)
# # print(p,q)