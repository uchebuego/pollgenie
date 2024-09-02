// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract PollGenie {
    struct PollOption {
        bytes32 id;
        string text;
        uint count;
    }

    struct PollData {
        string title;
        string description;
        mapping(bytes32 => PollOption) options;
        bytes32[] optionIds;
        mapping(bytes32 => address[]) optionVoters;
        mapping(address => bool) hasVoted;
        mapping(address => bool) isWhitelisted;
        mapping(address => bytes32) voterChoice;
        uint votesCast;
        uint whitelistedCount;
        bool isOpen;
    }

    struct PollView {
        uint id;
        string title;
        string description;
        PollOption[] options;
        bool isOpen;
    }

    address public owner;
    uint public pollCount;
    mapping(uint => PollData) private polls;

    error OnlyOwner();
    error PollDoesNotExist();
    error PollNotOpen();
    error NotWhitelisted();
    error AlreadyVoted();
    error InvalidOptionId();

    modifier onlyOwner() {
        if (msg.sender != owner) revert OnlyOwner();
        _;
    }

    modifier pollExists(uint pollId) {
        require(pollId < pollCount, "Poll does not exist");
        _;
    }

    modifier pollIsOpen(uint pollId) {
        require(polls[pollId].isOpen, "Poll is not open");
        _;
    }

    modifier onlyWhitelisted(uint pollId) {
        require(polls[pollId].isWhitelisted[msg.sender], "Not whitelisted");
        _;
    }

    event PollCreated(uint pollId, string title);
    event PollVoted(uint pollId, bytes32 optionId, address voter);
    event PollClosed(uint pollId);

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
            newPoll.options[optionId] = PollOption({
                id: optionId,
                text: _optionTexts[i],
                count: 0
            });
            newPoll.optionIds.push(optionId);
        }

        emit PollCreated(pollCount, _title);
        pollCount++;
    }

    function vote(
        uint pollId,
        bytes32 optionId
    ) external onlyWhitelisted(pollId) pollIsOpen(pollId) pollExists(pollId) {
        PollData storage poll = polls[pollId];

        if (poll.hasVoted[msg.sender]) revert AlreadyVoted();
        require(
            bytes(poll.options[optionId].text).length > 0,
            "Invalid option ID"
        );

        poll.optionVoters[optionId].push(msg.sender);
        poll.hasVoted[msg.sender] = true;
        poll.voterChoice[msg.sender] = optionId;
        poll.options[optionId].count++;
        poll.votesCast++;

        if (allVotesCast(poll)) {
            poll.isOpen = false;
            emit PollClosed(pollId);
        } else {
            emit PollVoted(pollId, optionId, msg.sender);
        }
    }

    function allVotesCast(PollData storage poll) internal view returns (bool) {
        return poll.votesCast >= poll.whitelistedCount;
    }

    function updateWhitelist(
        uint pollId,
        address _address,
        bool status
    ) external onlyOwner pollExists(pollId) {
        PollData storage poll = polls[pollId];
        poll.isWhitelisted[_address] = status;

        if (status) {
            poll.whitelistedCount++;
        } else if (poll.whitelistedCount > 0) {
            poll.whitelistedCount--;
        }
    }

    function getOptionVoters(
        uint pollId,
        bytes32 optionId
    ) external view pollExists(pollId) returns (address[] memory) {
        return polls[pollId].optionVoters[optionId];
    }

    function getVoterChoice(
        uint pollId,
        address _voter
    ) public view pollExists(pollId) returns (bytes32) {
        return polls[pollId].voterChoice[_voter];
    }

    function getPollView(uint pollId) internal view returns (PollView memory) {
        PollData storage poll = polls[pollId];
        uint optionsLength = poll.optionIds.length;
        PollOption[] memory options = new PollOption[](optionsLength);

        for (uint i = 0; i < optionsLength; i++) {
            bytes32 optionId = poll.optionIds[i];
            options[i] = PollOption({
                id: optionId,
                text: poll.options[optionId].text,
                count: poll.options[optionId].count
            });
        }

        return
            PollView({
                id: pollId,
                title: poll.title,
                description: poll.description,
                options: options,
                isOpen: poll.isOpen
            });
    }

    function getAllPolls() external view returns (PollView[] memory) {
        uint count = pollCount;
        PollView[] memory allPolls = new PollView[](count);
        for (uint i = 0; i < count; i++) {
            allPolls[i] = getPollView(i);
        }
        return allPolls;
    }

    function getPollById(
        uint pollId
    ) external view pollExists(pollId) returns (PollView memory) {
        return getPollView(pollId);
    }
}
