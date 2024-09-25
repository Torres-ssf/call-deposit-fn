
## Setup Instructions

#### 1. Install Dependencies
Use the following command to install all project dependencies:

```sh
pnpm install
```

#### 2. Create Environment File
Copy the example environment configuration to a new .env file:

```sh
cp .env.example .env
```

#### 3. Set Wallet Private Key
Open the `.env` file and set the `WALLET_PRIVATE_KEY` variable to your wallet's private key:

```makefile
WALLET_PRIVATE_KEY=your_private_key_here
```

#### 4. Run Tests
Execute the test suite to verify the setup:

```sh
pnpm test
```
