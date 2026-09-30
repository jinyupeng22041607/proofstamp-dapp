# ProofStamp — SC6101 DApp

A new Ethereum DApp for timestamped file fingerprint registration and integrity verification. It is different from the lecture's storage, ballot, book and payment examples.

## Quick deployment to Render

1. Create a GitHub repository named `proofstamp-dapp` and upload the contents of this folder (not the enclosing folder). Include `package.json`, `package-lock.json`, `public`, `contracts`, `scripts`, and `render.yaml`. Never upload `node_modules`.
2. In Render choose **New → Static Site**, connect that repository, and select its main branch.
3. Build command: `npm ci && npm run build`
4. Publish directory: `public`
5. Create the static site. Wait for deployment to succeed and open the assigned HTTPS `onrender.com` URL.
6. On that page, connect a MetaMask wallet with Sepolia test ETH and click **Deploy ProofStamp contract**. Approve the testnet deployment in the wallet. No private key is entered in the application.
7. Calculate a text fingerprint or choose a file, then click **Register fingerprint** and approve the testnet transaction.
8. Click **Verify on blockchain** to check the record.
9. Expand **Contract setup & mobile access**, then click **Copy submission link**. Submit that full Render URL including `?contract=0x...` to the teacher. The query parameter ensures the teacher sees the same deployed registry on another device.

The project is ready to deploy but the archive itself is not a live Render link. A public Sepolia deployment requires a user-controlled wallet and test ETH. There is no fake blockchain mode.

## Suggested demonstration (one minute)

- Enter `SC6101 original assignment` and calculate its fingerprint.
- Register it, approve the wallet transaction, and wait for confirmation.
- Verify it: the registry shows the wallet and block timestamp.
- Change one character, recalculate, and verify: the new fingerprint is not registered.
- Restore the original text, recalculate, and verify: the original proof appears again.
- Open the transaction on Sepolia Etherscan.

## Design

- Frontend: HTML/CSS/JavaScript and bundled ethers v6.
- Contract: Solidity `ProofStamp`, using a struct, mapping, state variable, event and `require` checks.
- Hosting: Render Static Site. A backend is unnecessary because the wallet submits transactions and read-only JSON-RPC retrieves chain data.
- File processing: browser Web Crypto SHA-256. No file upload occurs. The public chain stores only the digest, registrant and block timestamp.
- Writes: wallet authorization on Sepolia only (chain ID 11155111).
- Reads: public Sepolia RPC, configurable when unavailable. No wallet needed.
- Responsive layout: desktop and mobile. Wallet writes on phones require MetaMask's in-app browser. This mobile wallet flow has not been tested on a physical device.

## What the proof does and does not mean

Matching SHA-256 bytes means that this digest was registered in this contract. Registration is first-come-first-served. It does not prove authorship, copyright ownership, legal identity, file safety or the original creation date. A missing match means no record in the selected contract, not proof that a file was maliciously altered. Blockchain data is public; predictable file contents can potentially be guessed from their digest.

## Local development and checks

Node.js 20 or newer:

```sh
npm ci
npm run build
npm test
npm start
```

Open `http://localhost:3000`. Production should use HTTPS for Web Crypto and clipboard access. `npm test` deploys the real compiled bytecode on an isolated Ganache EVM and checks registration, timestamp, event emission, duplicate/zero rejection, changed-file mismatch and registration from a second wallet. This is not a Sepolia live-network test.

Dependencies are pinned and the lockfile is included. No API key from the lecturer's slides is used.

## 中文提交说明

这是“文件指纹存证与完整性验证”DApp。先将网站部署到 Render，再在网页内用 MetaMask 部署 Sepolia 合约。务必通过页面的 Copy submission link 复制包含合约地址的完整链接交给老师。只发布网页但没有部署合约，并不算已完成链上功能。

页面无需登录也能计算哈希；设定合约后，不连接钱包也可查询。只有部署和登记需要钱包确认以及测试币。不要提供助记词或私钥。

课堂讲解：文件先在浏览器本地生成 SHA-256 指纹，钱包调用 Solidity 的 register 函数，将指纹、登记地址与区块时间保存在链上。验证时重新计算指纹，调用 proofs 查询。修改文件会得到不同指纹。Render 负责托管前端，Ethereum Sepolia 保存可信的登记记录。
