import oldABI from './old-json-abi.json'
import newABI from './new-json-abi.json'
import { BN, Contract, Provider, Wallet } from 'fuels'
import axios from 'axios'

describe('CallDeposit', () => {
  const CONTRACT_ID = '0xc24ecaddd54cb04b88fb657da41da54e805aa2789654101dac7ede7716923e54'
  const TESTNET_URL = 'https://testnet.fuel.network/v1/graphql'

  it('should be able to deposit and decode DepositEvent using old abi', async () => {
    const provider = await Provider.create(TESTNET_URL)

    const wallet = Wallet.fromPrivateKey(process.env.WALLET_PRIVATE_KEY as string, provider)
    const contract = new Contract(CONTRACT_ID, oldABI, wallet)

    const amount = 100
    const assetId = provider.getBaseAssetId()

    const depositcall = await contract.functions
      .deposit()
      .callParams({
        forward: [amount, assetId],
      })
      .call();

    const { logs } = await depositcall.waitForResult()

    expect(logs.length).toBe(1)
    expect(logs[0].liquid_base).toBeDefined()
    expect(logs[0].liquid_quote).toBeDefined()
    expect(logs[0]).toStrictEqual({
      amount: expect.any(BN),
      asset: {
        bits: provider.getBaseAssetId()
      },
      user: { Address: { bits: wallet.address.toB256() } },
      liquid_base: expect.any(BN),
      liquid_quote: expect.any(BN),
    })
  }, 15_000)

  it('should throw error when calling deposit and decode DepositEvent using new abi', async () => {
    const provider = await Provider.create(TESTNET_URL)

    const wallet = Wallet.fromPrivateKey(process.env.WALLET_PRIVATE_KEY as string, provider)
    const contract = new Contract(CONTRACT_ID, newABI, wallet)

    const amount = 100
    const assetId = provider.getBaseAssetId()

    let thrownError: any

    try {
      const depositcall = await contract.functions
        .deposit()
        .callParams({
          forward: [amount, assetId],
        })
        .call();

      await depositcall.waitForResult()
    } catch(err) {
      thrownError = err
    }

    expect(thrownError.message).toBe('Invalid u64 byte data size.')
  }, 15_000)

  it('should throw error when calling deposit and decode DepositEvent using new abi', async () => {

    const latestABIUrl = "https://raw.githubusercontent.com/compolabs/orderbook-contract/refs/heads/master/spark-market/out/release/spark-market-abi.json"
    const res = await axios.get(latestABIUrl)

    expect(res.data).toEqual(newABI)
    expect(res.data).not.toEqual(oldABI)
  }, 15_000)
})
