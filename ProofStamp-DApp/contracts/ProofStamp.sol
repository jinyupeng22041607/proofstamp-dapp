// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
/// @notice A timestamped digest proves registration, not authorship or legal ownership.
contract ProofStamp {
    struct Proof { address registrant; uint256 timestamp; }
    mapping(bytes32 => Proof) public proofs;
    uint256 public totalProofs;
    event Registered(bytes32 indexed digest, address indexed registrant, uint256 timestamp);
    function register(bytes32 digest) external {
        require(digest != bytes32(0), "Empty digest");
        require(proofs[digest].registrant == address(0), "Already registered");
        proofs[digest] = Proof(msg.sender, block.timestamp);
        totalProofs++;
        emit Registered(digest, msg.sender, block.timestamp);
    }
    function appId() external pure returns (string memory) { return "ProofStamp-v1"; }
}
