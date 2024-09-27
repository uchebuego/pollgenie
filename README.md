# PollGenie Smart Contract

## Overview

**PollGenie** is a smart contract developed on the Ethereum blockchain that allows the creation and management of polls. It enables users to vote on options within a poll, with added functionalities like whitelisting participants and tracking votes. This contract is designed for easy integration into decentralized applications (dApps) where community engagement is crucial.

## Features

- **Poll Creation**: The owner can create polls with a title, description, and a list of options.
- **Voting Mechanism**: Users can vote on options within a poll, provided they are whitelisted.
- **Whitelist Management**: The owner can add or remove addresses from a poll's whitelist.
- **Vote Tracking**: The contract keeps track of how many votes each option receives and who voted for which option.
- **Poll Status Management**: Polls can be opened or closed based on voting activity.
- **Detailed Poll Views**: Users can retrieve information about polls and their options.

## Data Structures

### PollOption

- **id**: Unique identifier for the option (hashed).
- **text**: The text description of the option.
- **count**: Number of votes received by this option.

### PollData

- **title**: Title of the poll.
- **description**: Description of the poll.
- **options**: Mapping of option IDs to PollOption structures.
- **optionIds**: Array of option IDs for the poll.
- **optionVoters**: Mapping of option IDs to an array of addresses that voted for them.
- **hasVoted**: Mapping to track if an address has voted.
- **isWhitelisted**: Mapping to track if an address is whitelisted to vote.
- **voterChoice**: Mapping to store each voter's choice.
- **votesCast**: Total number of votes cast in the poll.
- **whitelistedCount**: Number of whitelisted voters.
- **isOpen**: Indicates whether the poll is currently open for voting.

### PollView

- **id**: Unique identifier for the poll.
- **title**: Title of the poll.
- **description**: Description of the poll.
- **options**: Array of PollOption structures for displaying options.
- **isOpen**: Indicates whether the poll is currently open.

## Events

- **PollCreated**: Emitted when a new poll is created.
- **PollVoted**: Emitted when a vote is cast.
- **PollClosed**: Emitted when a poll is closed after all votes are cast.

## Errors

- **OnlyOwner**: Thrown when a function is called by a non-owner address.
- **PollDoesNotExist**: Thrown when an invalid poll ID is accessed.
- **PollNotOpen**: Thrown when an attempt is made to vote on a closed poll.
- **NotWhitelisted**: Thrown when a non-whitelisted address attempts to vote.
- **AlreadyVoted**: Thrown when an address attempts to vote more than once.
- **InvalidOptionId**: Thrown when an invalid option ID is provided during voting.

## Functions

### `createPoll(string memory _title, string memory _description, string[] memory _optionTexts)`

Creates a new poll with specified title, description, and options.

### `vote(uint pollId, bytes32 optionId)`

Allows a whitelisted address to vote on a specified option in an open poll.

### `updateWhitelist(uint pollId, address _address, bool status)`

Updates the whitelist status of a specified address for a poll.

### `getOptionVoters(uint pollId, bytes32 optionId)`

Retrieves the list of addresses that voted for a specific option in a poll.

### `getVoterChoice(uint pollId, address _voter)`

Returns the choice of a specified voter in a poll.

### `getAllPolls()`

Returns an array of all polls with their details.

### `getPollById(uint pollId)`

Retrieves details of a specific poll by its ID.

## Usage

1. **Deploy the Contract**: Deploy the PollGenie contract to the Ethereum blockchain.
2. **Create a Poll**: The owner creates a poll using `createPoll`, specifying the title, description, and options.
3. **Whitelist Voters**: The owner can whitelist addresses using `updateWhitelist`.
4. **Voting**: Whitelisted addresses can cast their votes using the `vote` function.
5. **View Results**: Users can retrieve poll information and results using `getPollById` and `getAllPolls`.

## Conclusion

PollGenie provides a robust framework for creating and managing polls on the blockchain, ensuring transparency and accountability in the voting process. Its features allow for enhanced community engagement, making it suitable for various applications in decentralized governance and decision-making.
