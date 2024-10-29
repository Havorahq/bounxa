### Bounxa Core Feature Flow
# Technologies used:
Klaster: for orchestrating multichain transactions with smart accounts
Particle connect
Particle connect
Seda
Particle account abstraction
Solidity
Hardhat: for building and testing smart contracts

# Event Creation:
- Login/create account at bounxa.com
- click on the "+" button on the left
<img width="1440" alt="Screenshot 2024-10-28 at 11 59 34" src="https://github.com/user-attachments/assets/d57635ba-f901-45e4-8201-ff493fa813fc">
- Submit necessary information and click on creat event (event name, ticket price, etc…)
<img width="1437" alt="Screenshot 2024-10-28 at 12 01 35" src="https://github.com/user-attachments/assets/64d2eb0c-7c51-431f-b027-c5698a079415">
- Deploy new event contract with our smart contract architecture

Set what blockchain you’d like to collect payments on.


# Tickets:
- Bounxa Tickets are NFTs on the arbitrum sepolia blockchain.
- Ticket NFT minters are deployed along with every Bounxa event

# Buying tickets:
Transactions are powered by klasters abstracted onchain ux, allowing users to pay for tickets regardless of where their funds are.
After a successful klaster transaction the Bounxa paymaster mints new NFT tickets for the requesting user.
- Transfer funds to smart account created by klaster
<img width="1215" alt="Screenshot 2024-10-28 at 12 05 22" src="https://github.com/user-attachments/assets/505e9693-58bc-4c24-b30f-adaa07483b6f">
- click on buy ticket
<img width="1439" alt="Screenshot 2024-10-28 at 12 08 30" src="https://github.com/user-attachments/assets/a9c4bab4-9864-4e94-992b-62e8b3e4b6e0">

# Events Calendar:
On the Bounxa platform, events for which a user holds tickets will appear on their calendar in chronological order.

