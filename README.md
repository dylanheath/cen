# Cen (In Development)

Cen is a tezos powered payment platform using a Contacts system. Send to a Phone Number, Unique Name or Email address with a 2 step process.

* Supports up to 8 Wallets.
* Safe & Secure using the BeaconSDK
* Open Transaction and Account information using Cen's dedicated api
* Zero Transaction Fees

## How It Works

1. Cen links your Wallet Address with your `Email`, `Unique Name` and `Phone Number`.
2. Connecting your Wallet to Cen is `Safe & Secure` as we use the BeaconSDK, providing the ability to Send,
Receive and Mint.
3. Through the use of the BeaconSDK, you can only access your account through a `direct Wallet connection`
with a `Signed Payload` operation proving you own the address provided.

## Running from source

```
git clone https://github.com/dylanheath/cen.git
cd cen
npm install
npm start
```
 
## Api Usage

### Transactions

All Transactions will be viewable through the in web browser or through its dedicated Api `mainnet.cen.network/.netlify/functions/api/` allowing any entity the
permissions to freely view the data

#### EndPoints

```
GET mainnet.cen.network/.netlify/functions/api/transactions/getall
GET mainnet.cen.network/.netlify/functions/api/transactions/getsent{address, name, email or phone number}
GET mainnet.cen.network/.netlify/functions/api/transactions/getreceived{address, name, email or phone number}
```

### Users

User information will be accessable either by api or browser but some data may not be accessable for the privacy of the users phone number or email.

#### EndPoints

```
GET mainnet.cen.network/.netlify/functions/api/user/{address, name, email or phone number}
```
### Analytics

```
GET mainnet.cen.network/.netlify/functions/api/transactions/totaltransactions
GET mainnet.cen.network/.netlify/functions/api/transactions/totalamount
```

### Connected Repos

#### Backend
https://github.com/dylanheath/cen-server

#### Backend Documentation
https://github.com/dylanheath/cen-api-documentation

