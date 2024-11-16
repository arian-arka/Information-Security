##From security perspective, why do we need to verify of keys?

Data needs to be encrypted while transmitting and for that we need key or keys to encrypt/decrypt
voice.

Keys are transferred before the call. An attacker (man in the middle) could be listening or he/she could
transfer fake keys to two parties which are vali based on users view but attacker can also decrypt data.

So we need to make sure nobody knows the keys and also keys integrity are right and came or
generated from the right source

##What is diffie hellman applying? How did telegram manipulate this to achieve its encryption?

Let us consider the following scenario: User A would like to initiate end-to-end encrypted
communication with User B.

1. Both parties agrees to n,g 2045 bits
2. User A generates
    a. a=rand()
    b. g_a = g^a mod n
    c. g_a_hash = sha256(g_a)
3. User A sends g_a_hash to User B
4. User B generates
    a. B=rand()
    b. g_b = g^b mod n
5. User B sends g_b to user A
6. User A generates
    a. a_key = g_b^a mod n
    b. a_key_fingerprint = sha1(a_key)[:64] //lower 64 bits
7. User A sends g_a, a_key_fingerprint to User B
8. User B checks
    a. Sha256(g_a) == g_a_hash
9. User B generates
    a. b_key =g_a^b mod n
    b. b_key_fingerprint = sha1(b_key)[:64] //lower 64 bits
10. User B checks
    a. b_key_fingerprint == a_key_fingerprint


# In this situation three message modification is used instead of two like diffie hellman :

- A commits to a specific value of a (and of g_a) without disclosing it
    to B
- B has to choose its value of b and g_b without knowing the true value
    of g_a, why?
       o so that it cannot try different values of b to force the final
          key (g_a)^b to have any specific properties
- At this point, B commits to a specific value of g_b without
    knowing g_a
- Then A has to send its value g_a; it cannot change it even though it
    knows g_b now,
- because the other party B would accept only a value of g_a that has a
    hash specified in the very first message of the exchange

_if someone pretends to be another one either B or A, and tries man-in-the-middle attack how it does
prevent it?_

    A shares the key with B(or anyone) and they can’t change its exponent because of g_b and b is
    on dependent g_a because it commits to g_b before knowing g_A_

_Why using hash?_

    It makes attacker to have only one shot for guessing_

using just over 33 bits of entropy represented by four emoji in the visualization is enough
to make a successful attack highly improbable.

Sha256(key || g_A) -> splitted into 4 8Bytes integer -> each of integers divided by
333(total number of emoticons) -> each of reminders selects an emoticons

Comparing 4 emoticons is sufficient to prevent eavesdropping (MiTM attack on DH) with a
probability of 0.9999999999.

# So to answer the question :


    Differences from Diffie helman is that g_a is not sent to B at first but its hash is sent
    so at the first b does not know the value of g_a.
    
    Cause : prevent man in the middle


