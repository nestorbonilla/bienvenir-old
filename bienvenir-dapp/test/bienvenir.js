//import { web3 } from "../client/root";
const Kit = require('@celo/contractkit')
// Connect to the desired network
const kit = Kit.newKit('https://alfajores-forno.celo-testnet.org')

const Bienvenir = artifacts.require('Bienvenir');

const assertError = async (promise, error) => {
    try {
        await promise;
    } catch(e) {
        assert(e.message.includes(error));
        return;
    }
    assert(false);
}

contract('Bienvenir', accounts => {

    let bv = null;
    const [owner, beneficiary] = accounts;

    before(async () => {
        bv = await Bienvenir.deployed();
    });

    it('Should deposit to contract', async () => {
        await bv.deposit({from: owner, value: 100});
        const bvBalance = parseInt(await web3.eth.getBalance(bv.address));
        assert(bvBalance === 100);
    });

    it('Should allow to add a beneficiary', async () => {
        await bv.addBeneficiary(beneficiary, '50763146241');
        const _beneficiary = await bv.getBeneficiary(beneficiary);
        assert(_beneficiary === '50763146241');
    });

    // it('Should allow to create a commitment', async () => {
    //     let addError;
    //     try {
    //         //contract throws error here
    //         await bv.createCommitment(
    //             'commitment number 1',
    //             'description from commitment number 1',
    //             [1, 2, 4],
    //             [0, 0, 10000000],
    //             ['step number 1', 'step number 2', 'step number 3'],
    //             {from: owner}
    //         );
    //     } catch (error) {
    //         addError = error;
    //     }
    //     assert(addError === undefined);
    //     //const bvCommitmentsCount = await bv.getCommitmentsCount();
    //     //assert(bvCommitmentsCount === 0);
    //     //assert(0 === 0);
    // });

    // it('Should allow to sign a commitment', async () => {
    //     await bv.createSignedCommitment(
    //         1,
    //         {from: beneficiary}
    //     );
    //     const bvSignedCommitment = await bv.getSignedCommitment(1);
    //     assert(bvSignedCommitment.commitmentId === 1);
    //     //const bvCommitmentsCount = await bv.getCommitmentsCount();
    //     //assert(bvCommitmentsCount === 0);
    //     //assert(0 === 0);
    // });

});