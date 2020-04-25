const Kit = require('@celo/contractkit')
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
    let previousBeneficiaryBalance = 0;
    const [owner, beneficiary] = accounts;

    before(async () => {
        bv = await Bienvenir.deployed();
    });

    it('Should deposit to contract', async () => {
        await bv.deposit({from: owner, value: 100});
        const bvBalance = parseInt(await web3.eth.getBalance(bv.address));
        assert(bvBalance === 100);
    });

    it('Should allow to get the commitment created in the constructor', async () => {
        const _commitment = await bv.getCommitment(0);
        assert(_commitment.name, 'Supporting migrants in their application for refuge');
    });

    it('Should allow to sign a commitment', async () => {
        await bv.createSignedCommitment(0, {from: beneficiary});
        const _signedCommitment = await bv.getSignedCommitment(0, {from: beneficiary});
        assert(_signedCommitment.commitmentId == 0 && _signedCommitment.currentStep == 0, 'Supporting migrants in their application for refuge');
    });

    it('Should allow to verify the beneficiary', async () => {
        const _isBeneficiary = await bv.isBeneficiary({from: beneficiary});
        assert(_isBeneficiary, 'Not added as beneficiary');
    });

    it('Should allow to accomplish a simple commitment step', async () => {
        await bv.createSignedCommitmentAccomplishment(0, 0, '', {from: beneficiary});
        const _signedCommitment = await bv.getSignedCommitment(0, {from: beneficiary});
        assert.equal(_signedCommitment.currentStep, 1, 'Commitment current step should be one after conclude step zero');
    });

    it('Commitment should have tree accomplishments', async () => {
        const _signedCommitment = await bv.getSignedCommitment(0, {from: beneficiary});
        assert.equal(_signedCommitment.accomplishments.length, 3, 'Accomplishment account should be tree');
    });

    it('Should allow to accomplish a required value commitment step', async () => {

        //Getting beneficiary balance before automatic transfer is triggered
        previousBeneficiaryBalance = await parseInt(await web3.eth.getBalance(beneficiary));

        await bv.createSignedCommitmentAccomplishment(0, 1, 'test_code', {from: beneficiary});
        const _signedCommitment = await bv.getSignedCommitment(0, {from: beneficiary});
        assert.equal(_signedCommitment.accomplishments[3].accomplishCategory, 2, 'Accomplishment was not concluded, because its not category 2');
    });

    it('Accomplish value of the automatic transaction should be test_code', async () => {
        const _signedCommitment = await bv.getSignedCommitment(0, {from: beneficiary});
        assert.equal(_signedCommitment.accomplishments[3].accomplishValue, 'test_code', 'Accomplishment required value was not saved');
    });

    it('Accomplish value of the automatic transaction should be transfer_complete', async () => {
        const _signedCommitment = await bv.getSignedCommitment(0, {from: beneficiary});
        assert.equal(_signedCommitment.accomplishments[5].accomplishValue, 'transfer_complete', 'Accomplishment required value was not saved');
    });

    // it('Beneficiary balance should be higher due to previous automatic transfer', async () => {
    //     const _signedCommitment = await bv.getSignedCommitment(0, {from: beneficiary});
    //     const _currentBeneficiaryBalance = await parseInt(await web3.eth.getBalance(beneficiary));
    //     assert(previousBeneficiaryBalance < _currentBeneficiaryBalance, 'Current beneficiary balance should be higher than previous');
    // });

});