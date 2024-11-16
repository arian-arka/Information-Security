import hashlib

hashsha = hashlib.sha256()

name = input('your name: ')
stu = input('your student number: ')

prefix = name + stu

for n in range(1000000):
    hashsha.update((prefix + str(n)).encode())
    h = hashsha.hexdigest()
    print(f'String: "{n}" Hash: {h}')
    if h.endswith("0000"):
        break

