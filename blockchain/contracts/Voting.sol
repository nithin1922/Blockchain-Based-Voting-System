pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    mapping(address => bool) public hasVoted;
    Candidate[] public candidates;
    address public owner;

    event CandidateAdded(string name);
    event VoteCast(address indexed voter, uint256 candidateId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Add a new candidate (Only the owner can add candidates)
    function addCandidate(string memory _name) public onlyOwner {
        candidates.push(Candidate(_name, 0));
        emit CandidateAdded(_name);
    }

    // Get the total number of candidates
    function getCandidateCount() public view returns (uint256) {
        return candidates.length;
    }

    // Get a candidate's details
    function getCandidate(uint256 _index) public view returns (string memory, uint256) {
        require(_index < candidates.length, "Invalid candidate index");
        Candidate memory candidate = candidates[_index];
        return (candidate.name, candidate.voteCount);
    }

    // Vote for a candidate
    function vote(uint256 _candidateId) public {
        require(!hasVoted[msg.sender], "You have already voted");
        require(_candidateId < candidates.length, "Invalid candidate ID");

        candidates[_candidateId].voteCount++;
        hasVoted[msg.sender] = true;

        emit VoteCast(msg.sender, _candidateId);
    }
}
