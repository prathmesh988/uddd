const url = '   ';

const data = {
  tokenIn: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",  // Address of the token you want to swap from
  tokenOut: "0x4cf3f6a5d0b9ce2dbeb4571a808e486ee5e4a963", // Address of the token you want to swap to 
  amountIn: "1000000",                                     // Amount of the tokenIn you want to swap
  recipient: "0x7CB996F75D98F01a2bB858Dc25c2f03faac593d1"  // Address of the recipient
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(result => {
  console.log('Success:', result);
})
.catch(error => {
  console.error('Error:', error);
});
