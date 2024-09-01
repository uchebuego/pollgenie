// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract PollGenie {
    struct PollOption {
        string text;
        bytes32 id; // UUID-like unique identifier
    }

    struct PollData {
        string title;
        string description;
        PollOption[] options; // Updated to use PollOption struct
        mapping(bytes32 => address[]) optionVoters; // Mapping by optionID
        mapping(address => bool) hasVoted;
        mapping(address => bool) isWhitelisted;
        bool isOpen;
    }

    struct PollView {
        uint id;
        string title;
        string description;
        PollOption[] options;
        uint[] voteCounts;
        bool isOpen;
    }

    address public owner;
    uint public pollCount;
    mapping(uint => PollData) private polls;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier pollExists(uint pollId) {
        require(pollId < pollCount, "Poll does not exist");
        _;
    }

    modifier pollIsOpen(uint pollId) {
        require(polls[pollId].isOpen, "The poll is not open");
        _;
    }

    modifier onlyWhitelisted(uint pollId) {
        require(
            polls[pollId].isWhitelisted[msg.sender],
            "You are not whitelisted to vote"
        );
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createPoll(
        string memory _title,
        string memory _description,
        string[] memory _optionTexts
    ) external onlyOwner {
        PollData storage newPoll = polls[pollCount];
        newPoll.title = _title;
        newPoll.description = _description;
        newPoll.isOpen = true;

        for (uint i = 0; i < _optionTexts.length; i++) {
            bytes32 optionId = keccak256(
                abi.encodePacked(_title, _description, _optionTexts[i], i)
            );
            newPoll.options.push(
                PollOption({text: _optionTexts[i], id: optionId})
            );
        }

        pollCount++;
    }

    function vote(
        uint pollId,
        bytes32 optionId
    ) external onlyWhitelisted(pollId) pollIsOpen(pollId) pollExists(pollId) {
        PollData storage poll = polls[pollId];

        require(!poll.hasVoted[msg.sender], "You have already voted");

        require(
            poll.optionVoters[optionId].length > 0 ||
                isOptionExists(pollId, optionId),
            "Invalid option ID"
        );

        poll.optionVoters[optionId].push(msg.sender);
        poll.hasVoted[msg.sender] = true;
    }

    function isOptionExists(
        uint pollId,
        bytes32 optionId
    ) internal view returns (bool) {
        PollData storage poll = polls[pollId];
        for (uint i = 0; i < poll.options.length; i++) {
            if (poll.options[i].id == optionId) {
                return true;
            }
        }
        return false;
    }

    function closePoll(uint pollId) external onlyOwner pollExists(pollId) {
        polls[pollId].isOpen = false;
    }

    function addToWhitelist(
        uint pollId,
        address _address
    ) external onlyOwner pollExists(pollId) {
        polls[pollId].isWhitelisted[_address] = true;
    }

    function removeFromWhitelist(
        uint pollId,
        address _address
    ) external onlyOwner pollExists(pollId) {
        polls[pollId].isWhitelisted[_address] = false;
    }

    function getVotes(
        uint pollId,
        bytes32 optionId
    ) external view pollExists(pollId) returns (uint) {
        return polls[pollId].optionVoters[optionId].length;
    }

    function getOptionVoters(
        uint pollId,
        bytes32 optionId
    ) external view pollExists(pollId) returns (address[] memory) {
        return polls[pollId].optionVoters[optionId];
    }

    function getOptions(
        uint pollId
    ) external view pollExists(pollId) returns (PollOption[] memory) {
        return polls[pollId].options;
    }

    function getTitle(
        uint pollId
    ) external view pollExists(pollId) returns (string memory) {
        return polls[pollId].title;
    }

    function getDescription(
        uint pollId
    ) external view pollExists(pollId) returns (string memory) {
        return polls[pollId].description;
    }

    function isPollOpen(
        uint pollId
    ) external view pollExists(pollId) returns (bool) {
        return polls[pollId].isOpen;
    }

    function getVoterChoice(
        uint pollId,
        address _voter
    ) public view pollExists(pollId) returns (bytes32) {
        PollData storage poll = polls[pollId];
        for (uint i = 0; i < poll.options.length; i++) {
            address[] memory voters = poll.optionVoters[poll.options[i].id];
            for (uint j = 0; j < voters.length; j++) {
                if (voters[j] == _voter) {
                    return poll.options[i].id;
                }
            }
        }
        return bytes32(0); // Return a sentinel value if no choice is found
    }

    function getAllPollIds() external view returns (uint[] memory) {
        uint[] memory allPollIds = new uint[](pollCount);
        for (uint i = 0; i < pollCount; i++) {
            allPollIds[i] = i;
        }
        return allPollIds;
    }

    function getAllPolls() external view returns (PollView[] memory) {
        PollView[] memory allPolls = new PollView[](pollCount);
        for (uint i = 0; i < pollCount; i++) {
            PollData storage poll = polls[i];
            uint[] memory voteCounts = new uint[](poll.options.length);
            for (uint j = 0; j < poll.options.length; j++) {
                voteCounts[j] = poll.optionVoters[poll.options[j].id].length;
            }

            allPolls[i] = PollView({
                id: i,
                title: poll.title,
                description: poll.description,
                options: poll.options,
                voteCounts: voteCounts,
                isOpen: poll.isOpen
            });
        }

        return allPolls;
    }
}
