<p align="center">
  <img width="280" height="100" src="Cen.svg">
</p>

Cen is a Tezos powered Portfolio, Payment & Assets management dapp which provides resources for Sending/Receiving XTZ or FA1.2/FA2 Tokens and tracking assets across a range of other dapps such as PlentyDefi & QuipuSwap

* Supports up to 8 Wallets.
* Safe & Secure using the BeaconSDK
* Open Transaction and Account information using Cen's dedicated api
* Zero Transaction Fees
* Supports Mobile Devices
* Open Source frontend/backend
* Asset Management for NFTs & Tokens
* Swap & Liquidity Support
* Portfolio Analysis & Tools
* Games

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
permission to freely view the data

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
GET mainnet.cen.network/.netlify/functions/api/user/{address, name, email}
```
### Analytics

```
GET mainnet.cen.network/.netlify/functions/api/transactions/totaltransactions
GET mainnet.cen.network/.netlify/functions/api/transactions/totalamount
```

### Price

```
GET mainnet.cen.network/.netlify/functions/api/price/xtz
```

### Status

```
GET mainnet.cen.network/.netlify/functions/api/status
```

## Contribute

Cen is Open to Contributions, for every pull request make sure you include 
- What you have Worked on or Working on
- A detailed explanation of changes
- Reason for these changes



