import argon2

ph = argon2.PasswordHasher()

hash = ph.hash('mypassword')
print("hashed password",hash)


try:
    ph.verify(hash, 'nowp')
    print('Password verified')
except argon2.exceptions.VerifyMismatchError:
    print('Password Did not match ')
    

