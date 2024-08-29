# COMO GERAR AS CHAVES JWT

- Caso você utilize Windows, então utilize o terminal com WSL
- Navegue para a pasta resources:

```
src\main\resources
```
- Rode os seguintes comandos:
```
openssl genrsa -out keypair.pem 2048
openssl rsa -in keypair.pem -pubout -out app.pub
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in keypair.pem -out app.key
```