# Bit(or byte) flipping attack

-AES block size

    128 = 16 bytes

-  message


    ?date=2019/03/05&comment=request&admin=0

- position of zero


    total 40 bytes => actual size = 48 bytes(8 bytes for padding)
    where is the position of 0
    the sequence is {0,1,2,3,...,45,46,47}
    {40,41,42,43,44,45,46,47} are padding so the last position is 39 where zero is located

- encrypted message


    yPQ2zpXT/rtd/nI13tOGDkER9VUf6Lye40tfQzVhoud8+RPxJIlctu/y0ataF1LQ


- we want to change the last byte 0 to 1
    

    first we need to know 0 as character is 48 decimal in ascii
    48 ^ x = 1 => x = 49
    49 decimal in ascii is 1 as character
    so we need to xor the desired position(39) with 49

- so after flipping the 39th position  (xor with 49) we get the 
    

    yPQ2zpXT/rtd/nI13tOGDkER9VUf6Lye40tfQzVhoud8+RPxJIlct+/y0ataF1LQ
