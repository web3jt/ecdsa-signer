# ECDSA Signer

## Installation

```bash
cp config.sample.yaml config.yaml
yarn
```


## Run

```bash
yarn dev
```


## Development

check `./index.ts`

```typescript
const messageHash = ethers.utils.solidityKeccak256(
    [
        'address',
        'uint256',
    ],
    [
        '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
        '0',
    ]
);
```

