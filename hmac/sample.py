import base64
import hmac
import hashlib

messages = [
    {
        'id': '44CF9590006BF252F707',
        'secret': 'qaz123',
        'method': 'POST',
        'datetime': '2019-06-03 12:21:10',
        'body': '11223344'
    },
    {
        'id': '44CF9590006BF252F707',
        'secret': '4g1hyu',
        'method': 'POST',
        'datetime': '2019-06-03 12:21:10',
        'body': '90221122' # change it to 981531027
    },
    {
        'id': '44CF9590006BF252F707',
        'secret': '4g1hyu',
        'method': 'POST',
        'datetime': '2019-06-03 12:21:10',
        'body': '981531027'
    },
]

def hmacSha256(body, secret, method, dateTime, convertToBase64=True):
    digest = hashlib.md5(bytearray(body.encode('utf-8'))).hexdigest()
    print(digest)
    msg = '{0}\n{1}\n{2}'.format(method, digest, dateTime)
    hmacKey = hmac.new(bytearray(secret.encode('utf-8')), bytearray(msg.encode('utf-8')), hashlib.sha256).digest()
    return base64.b64encode(hmacKey).decode() if convertToBase64 else hmacKey

print(hmacSha256(messages[1]['body'],messages[1]['secret'],messages[1]['method'],messages[1]['datetime']))
print(hmacSha256(messages[2]['body'],messages[2]['secret'],messages[2]['method'],messages[2]['datetime']))

#tNs/RePS44QfgK857RZkJNvOXMTTOLeSPT3XQ1mzFgg=
