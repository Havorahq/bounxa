# Bounxa: Event Management On the Blockchain

**Bounxa** is a cutting-edge event management platform built on the blockchain, designed to streamline event creation, ticketing, and transaction processing. Leveraging powerful integrations with **Particle Network**, **Klaster**, and **Seda protocols**, Bounxa enables secure, flexible, and decentralized event hosting. Whether you're setting up a small gathering or a large conference, Bounxa’s infrastructure ensures seamless multichain interactions, automated ticketing through NFTs, and a user-friendly experience for both organizers and attendees.

Explore the key features and technologies that make Bounxa a reliable, future-proof solution for decentralized event management.

---

## Technologies Used
- **Klaster**: Facilitates multichain transaction orchestration with smart accounts as well as account abstraction.
- **Particle Connect**: Enables secure, streamlined connections for user authentication.
- **Seda**: Enables ticket validation and verification.
- **Solidity**: Used for creating smart contracts.
- **Hardhat**: Used for smart contract testing and manipulations. 

---



## Event Organizer's User Journey

1. **Visit Bounxa**  
   Begin by visiting [Bounxa.com](https://bounxa.com) and clicking on ***Get Started***.

   ![image](https://github.com/user-attachments/assets/fce0c3b0-e34b-409f-a8fc-7a21427c3adf)
---
2. **Login/Create Account**  
   Click on ***Connect*** to access all authentication options [Bounxa.com](https://bounxa.com).

   ![image](https://github.com/user-attachments/assets/ce726b7f-7c0a-44bc-b9db-4acc90598c19)
---
3. **Authentication**  
   With our Particle Connect integration, you have a range of convenient login options: sign in via email, social accounts, Wallet Connect, or use the Passkey Smart Wallet for seamless access.
   
  ![image](https://github.com/user-attachments/assets/d3dfcda2-a761-4dad-8ccb-76d72a44fe7c)
---
![image](https://github.com/user-attachments/assets/c62836a3-36ae-4d37-846e-bac95ca50759)
---
**For extra layer of security offered by our Particle Network thirdparty integration, you can create a master password to encrypt your data on-device, ensuring the safety of your assets.**
---
![image](https://github.com/user-attachments/assets/5ed51653-ac59-4f7e-9d1c-6718723cc233)

  --- 
3. **Start a New Event**  
   Click the **"+" button** on the left sidebar to begin creating a new event.
   
   ![Event Creation Button](https://github.com/user-attachments/assets/d57635ba-f901-45e4-8201-ff493fa813fc)

4. **Submit Event Information**  
   Complete necessary details, such as the event name, ticket pricing, and other relevant information.  
   Click **"Create Event"** to finalize the submission.
   
   ![Event Information Submission](https://github.com/user-attachments/assets/64d2eb0c-7c51-431f-b027-c5698a079415)

5. **Deploy Event Contract**  
   Deploy a new event contract utilizing Bounxa’s smart contract architecture.
   
6. **Select Blockchain**  
   Choose the blockchain network (e.g., Arbitrum Sepolia) for ticket payment processing.

---

## Ticketing System
- **NFT Tickets**  
  Bounxa event tickets are issued as NFTs on the Arbitrum Sepolia blockchain, making each ticket a unique, verifiable asset.
  
- **Automated NFT Minters**  
  With every new event, a dedicated NFT minter contract is deployed to manage ticket minting seamlessly.

---

## Ticket Purchase Process

1. **Powered by Klaster**  
   Bounxa utilizes Klaster’s on-chain UX, allowing users to purchase tickets with flexibility, regardless of the origin of their funds.
   
2. **Transaction Flow**  
   Transfer funds to the smart account created by Klaster, which handles the payment process.
   
   ![Transfer Funds](https://github.com/user-attachments/assets/505e9693-58bc-4c24-b30f-adaa07483b6f)
   
3. **Complete Purchase**  
   Click **"Buy Ticket"** to confirm and finalize your purchase.
   
   ![Buy Ticket Button](https://github.com/user-attachments/assets/a9c4bab4-9864-4e94-992b-62e8b3e4b6e0)
   
4. **NFT Ticket Minting**  
   After a successful transaction, the Bounxa paymaster automatically mints a new NFT ticket to your account, confirming your attendance.

---

## Events Calendar

- **Chronological Event Display**  
  All events for which a user holds tickets will appear in their personal events calendar on the Bounxa platform, organized by date for easy access and management.

--- 

For more information, please contact a [Bounxa Dev](mailto:princenchiba@gmail.com).
