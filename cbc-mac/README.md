# vulnerability
Allowing the initialization vector to vary in value

we need to change the first block which is

         to=9714163002&fr => to=181555555&&fr

 

 

we need to find iv' which

        xor(iv1,p1) = xor(iv',p1')  => iv' = xor(xor(iv1,p1),p1')
        M = p1|p2|p3|...
        E(iv,p1) produces (M,T)
        M' = p1'|p2|p3|...
        E(p1',iv1')

- requirement

        change the first block of message

- the only thing you need to do is that you create your own message[length = 16bytes]
- then produce a new iv
- new iv = 


        xor(new block,xor(old block,iv))