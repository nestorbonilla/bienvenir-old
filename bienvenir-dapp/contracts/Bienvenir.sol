pragma solidity >=0.5.0 <0.7.0;
pragma experimental ABIEncoderV2;

/// @title Decentralized application to help coordinate and improve the impact
///        metric of non-profit organizations that work with migrants in Latin America
/// @author Nestor Bonilla
/// @notice Contract part of the Bienvenir mobile DApp built with Celo
/// @dev All function calls are currently implement without side effects

contract Bienvenir {

    /*_____________________________
     * 1. Variable Definitions
     *_____________________________
     */

    address public admin;

    uint nextCommitmentId = 1;
    uint nextSignedCommitmentId = 1;

    mapping(uint => Commitment) public commitments;
    mapping(address => mapping(uint => SignedCommitment)) signedCommitments;
    mapping(address => mapping(uint => Accomplishment[])) accomplishments;
    mapping(address => string) beneficiaries;

    enum AccomplishmentChoices { Unassigned, Assigned, Incomplete, Complete }

    struct Commitment {
        uint id;
        string name;
        string description;
        uint creationDate;
        Step[] steps;
        uint status;
    }

    struct Step {
        uint id;
        uint stepType; //simple, value_required, automatic_transfer
        uint transferValue; //Zero by default, when stepType is automatic_transfer the value need to be higher than zero
        string name;
    }

    struct SignedCommitment {
        uint id;
        uint commitmentId;
        uint signatureDate;
    }

    struct Accomplishment {
        uint id;
        uint stepId;
        uint accomplishDate;
        uint accomplishmentCategory; //started, finished
        string accomplishValue;
    }

    struct Profile {
        string phone;
        address profileAddress;
    }

    /*_____________________________
     * 2. Modifiers
     *_____________________________
     */

    modifier onlyAdmin() {
        require(msg.sender == admin, 'only admin is allowed');
        _;
    }

    modifier onlyBeneficiary() {
        require(bytes(beneficiaries[msg.sender]).length != 0, 'only beneficiaries are allowed');
        _;
    }

    modifier onlyOwnerOrAdmin() {
        require(bytes(beneficiaries[msg.sender]).length != 0 || admin == msg.sender, 'only beneficiary or admin allowed');
        _;
    }

    /*_____________________________
     * 3. Event Logs
     *_____________________________
     */
     event LogNewBeneficiary(string _phone);

    /*_____________________________
     * 4. Function definition
     *_____________________________
     */

    constructor() public {
        admin = msg.sender;
        uint[] memory _typeSteps = new uint[](3);
        _typeSteps[0] = 1;
        _typeSteps[1] = 2;
        _typeSteps[2] = 3;
        uint[] memory _transferValues = new uint[](3);
        _transferValues[0] = 0;
        _transferValues[1] = 0;
        _transferValues[2] = 10000000000;
        string[] memory _nameSteps = new string[](3);
        _nameSteps[0] = 'step number 1';
        _nameSteps[1] = 'step number 2';
        _nameSteps[2] = 'step number 3';
        createCommitment(
            'commitment number 1',
            'description from commitment number 1',
            _typeSteps,
            _transferValues,
            _nameSteps
        );
    }

    function deposit() external payable {
    }

    function balanceOf() external view returns(uint) {
        return address(this).balance;
    }

    /// @notice beneficiary adds its address to be able to sign a commitment
    ///         and adds its accomplishments.
    /// @dev beneficiary must be provided as an address
    /// @param _beneficiary The address of a beneficiary
    function addBeneficiary(
        address _beneficiary,
        string memory _phone
    ) public {
        beneficiaries[_beneficiary] = _phone;
        emit LogNewBeneficiary(_phone);
    }

    /// @notice admin creates a commitment based on the previous agreement
    ///         with donors or supporting organizations.
    /// @dev steps must be provided as an array of string, but should be saved as an array of steps
    /// @param  _name The name of the commitment
    ///         description The description of the commmitment
    ///         steps Array of strings of steps of the commitment
    function createCommitment(
        string memory _name,
        string memory _description,
        uint[] memory _typeSteps,
        uint[] memory _transferValues,
        string[] memory _nameSteps
    ) public onlyAdmin() {
        commitments[nextCommitmentId].id = nextCommitmentId;
        commitments[nextCommitmentId].name = _name;
        commitments[nextCommitmentId].description = _description;
        commitments[nextCommitmentId].creationDate = now;
        for(uint i = 1; i <= _nameSteps.length; i++) {
            commitments[nextCommitmentId].steps.push(Step(i, _typeSteps[i], _transferValues[i], _nameSteps[i]));
        }
        nextCommitmentId++;
    }

    /// @notice Anyone can obtain a list of the available commitments of the platform.
    /// @dev commitments can only be provided in array, not in mapping
    function getCommitments() public view returns (Commitment[] memory) {
        Commitment[] memory _commitments = new Commitment[](nextCommitmentId);
        for (uint i = 0; i < nextCommitmentId; i++) {
        _commitments[i] = _commitments[i];
    }
        return _commitments;
    }

    /// @notice Each beneficiary can obtain a list of the commitments already signed.
    /// @dev commitments can only be provided in array, not in mapping
    function getSignedCommitments()
        public view onlyBeneficiary()
        returns (Commitment[] memory)
    {
        Commitment[] memory _commitments = new Commitment[](nextCommitmentId);
        for (uint i = 0; i < nextCommitmentId; i++) {
            _commitments[i] = _commitments[i];
        }
        return _commitments;
    }

    /// @notice beneficiary can sign a commitment
    /// @dev beneficiary sign a commitment to be able to accomplish its requisites and obtain the benefits
    /// @param  _commitmentId The id of the available commitment
    function createSignedCommitment(
        uint _commitmentId
    ) public onlyBeneficiary() {
        signedCommitments[msg.sender][nextSignedCommitmentId] = SignedCommitment(nextSignedCommitmentId, _commitmentId, now);
        accomplishments[msg.sender][nextSignedCommitmentId].push(Accomplishment(1, 1, now, 0, ''));
        nextSignedCommitmentId++;
    }

    /// @notice beneficiary can sign a commitment
    /// @dev beneficiary sign a commitment to be able to accomplish its requisites and obtain the benefits
    /// @param  _signedCommitmentId The id of the available commitment
    function completeSignedCommitmentAccomplishment(
        uint _signedCommitmentId,
        uint _stepId,
        string memory _accomplishValue
    ) public payable onlyOwnerOrAdmin() {
        //Get length of the accomplishments
        uint _nextAccomplishmentId = accomplishments[msg.sender][_signedCommitmentId].length;

        //Push a new accomplishment of conclusion, accomplishmentCategory 2
        accomplishments[msg.sender][_signedCommitmentId].push(Accomplishment(_nextAccomplishmentId, _stepId, now, 2, _accomplishValue));
        _nextAccomplishmentId++;

        //Loop to verify if there are more steps to complete
        //and if its type is aumatic_transfer then transfer the ammount placed on the value to the beneficiary wallet
        for(uint i = _stepId; i < commitments[signedCommitments[msg.sender][_signedCommitmentId].commitmentId].steps.length; i++) {
            if(commitments[signedCommitments[msg.sender][_signedCommitmentId].commitmentId].steps[i].stepType == 3) { //automatic_transfer
                //Push a new accomplishment of initialization, accomplishmentCategory 1
                accomplishments[msg.sender][_signedCommitmentId].push(Accomplishment(_nextAccomplishmentId, i, now, 1, ''));

                //Automatic transfer from contract to beneficiary address with an ammount of transferValue from Commitment Step
                if(address(this).balance >= commitments[signedCommitments[msg.sender][_signedCommitmentId].commitmentId].steps[i].transferValue) {
                    msg.sender.transfer(commitments[signedCommitments[msg.sender][_signedCommitmentId].commitmentId].steps[i].transferValue);
                } else {
                    break;
                }

                _nextAccomplishmentId++;

                //Push a new accomplishment of conclusion, accomplishmentCategory 2
                accomplishments[msg.sender][_signedCommitmentId].push(Accomplishment(_nextAccomplishmentId, i, now, 2, ''));
            }
        }
    }

    function testCollect(
        uint _collectValue
    ) public payable onlyOwnerOrAdmin() {
        msg.sender.transfer(_collectValue);
    }

    function getBeneficiary(address _beneficiary) public view returns (string memory) {
            return beneficiaries[_beneficiary];
    }

    //function getCommitment(uint _signedCommitmentId) public view returns (string memory) {
    //    return uint2str(accomplishments[msg.sender][_signedCommitmentId].length);
    //}

    function getCommitment(uint _commitmentId) public view returns (Commitment memory) {
        return commitments[_commitmentId];
    }

    function getSignedCommitment(uint _signedCommitmentId) public view returns (SignedCommitment memory) {
        return signedCommitments[msg.sender][_signedCommitmentId];
    }

    function getCommitmentsCount() public view returns (uint) {
        return nextCommitmentId - 1;
    }

    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len - 1;
        while (_i != 0) {
            bstr[k--] = byte(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }
}