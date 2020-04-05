pragma solidity >=0.4.0 <0.7.0;
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

    uint nextCommitmentId;
    uint nextSignedCommitmentId;

    mapping(uint => Commitment) commitments;
    //mapping(address => SignedCommitment[]) signedCommitments;
    mapping(address => mapping(uint => bool)) signedCommitments;
    mapping(address => bool) beneficiaries;
    mapping(address => bool) consultants;
    mapping(address => bool) verifiers;
    mapping(address => Profile) profiles;

    enum AccomplishmentChoices { Unassigned, Assigned, Incomplete, Complete }

    struct Commitment {
        uint id;
        string name;
        string description;
        Step[] steps;
        uint status;
    }

    struct Step {
        uint id;
        string content;
    }

    struct SignedCommitment {
        uint id;
        uint commitmentId;
        uint signatureDate;
        Accomplishment[] accomplishments;
    }

    struct Accomplishment {
        uint id;
        uint stepId;
        uint startDate;
        uint deadlineDate;
        uint accomplishDate;
        uint accomplishChoice;
    }

    struct Profile {
        string phone;
        string fullName;
        string passport;
    }

    /*_____________________________
     * 2. Modifiers
     *_____________________________
     */

    modifier onlyAdmin() {
        require(msg.sender == admin, 'only admin');
        _;
    }

    modifier onlyBeneficiary() {
        require(beneficiaries[msg.sender] == true, 'only beneficiaries can sign commitment');
        _;
    }

    /*_____________________________
     * 3. Event Logs
     *_____________________________
     */

    /*_____________________________
     * 4. Function definition
     *_____________________________
     */

    constructor() public {
        admin = msg.sender;
    }

    /// @notice Admin add a verifier to be able to help with the manage
    ///         of the different steps that needs to be validated to continue
    ///         with the different process in the signed commitments
    /// @dev verifier must be provided as an address
    /// @param verifier The address of a verifier
    function addVerifier(
        address verifier
    ) external onlyAdmin() {
        verifiers[verifier] == true;
    }

    /// @notice Admin adds a consultant to allow this to take the responsibility
    ///         of supporting a beneficiary on a specific process, part of its commitment
    ///         previously signed.
    /// @dev consultant must be provided as an address
    /// @param consultant The address of a consultant
    function addConsultant(
        address consultant
    ) external onlyAdmin() {
        consultants[consultant] == true;
    }

    /// @notice Beneficiary adds its address to be able to sign a commitment
    ///         and adds its accomplishments.
    /// @dev beneficiary must be provided as an address
    /// @param beneficiary The address of a beneficiary
    function addBeneficiary(
        address beneficiary
    ) external onlyBeneficiary() {
        beneficiaries[beneficiary] == true;
    }

    /// @notice Admin creates a commitment based on the previous agreement
    ///         with donors or supporting organizations.
    /// @dev steps must be provided as an array of string, but should be saved as an array of steps
    /// @param  name The name of the commitment
    ///         description The description of the commmitment
    ///         steps Array of strings of steps of the commitment
    function createCommitment(
        string memory name,
        string memory description,
        string[] memory steps
    ) public onlyAdmin() {
        commitments[nextCommitmentId].id = nextCommitmentId;
        commitments[nextCommitmentId].name = name;
        commitments[nextCommitmentId].description = description;
        for(uint i = 0; i < steps.length; i++) {
            commitments[nextCommitmentId].steps.push(Step(i, steps[i]));
        }
        nextCommitmentId++;
    }

    function signCommitment(
        uint commitmentId
    ) external onlyBeneficiary() {
        signedCommitments[msg.sender][commitmentId] = true;
    }

}