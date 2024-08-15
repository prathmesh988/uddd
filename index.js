const express = require('express');

const app = express();

app.use(express.json());

app.post('/quote', async (req, res) => {
    const { tokenIn, tokenOut, amountIn, recipient } = req.body;

    if (!tokenIn || !tokenOut || !amountIn || !recipient) {
        return res.status(400).json({ error: 'Please provide all required fields: tokenIn, tokenOut, amountIn, and recipient.' });
    }

    try {
        const response = await fetch("https://interface.gateway.uniswap.org/v2/quote", {
            "headers": {
                "accept": "*/*",
                "accept-encoding": "gzip, deflate, br, zstd",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "text/plain;charset=UTF-8",
                "origin": "https://app.uniswap.org",
                "priority": "u=1, i",
                "referer": "https://app.uniswap.org/",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
                "x-request-source": "uniswap-web"
            },
            "referrer": "https://app.uniswap.org/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": JSON.stringify({
                "tokenInChainId": 8453, // Static value for base chain
                "tokenIn": tokenIn,
                "tokenOutChainId": 8453, // Static value for base chain
                "tokenOut": tokenOut,
                "amount": amountIn,
                "sendPortionEnabled": true,
                "type": "EXACT_INPUT",
                "intent": "quote",
                "configs": [
                    {
                        "enableUniversalRouter": true,
                        "protocols": ["V2", "V3", "MIXED"],
                        "routingType": "CLASSIC",
                        "recipient": recipient,
                        "enableFeeOnTransferFeeFetching": true
                    }
                ],
                "useUniswapX": true,
                "swapper": recipient,
                "slippageTolerance": "0.5"
            }),
            "method": "POST",
            "mode": "cors"
        });

        const data = await response.json();
        res.json(data);

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the quote.', details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});