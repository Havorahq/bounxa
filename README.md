# Bounxa: Event Management On the Blockchain

**Bounxa** is a cutting-edge event management platform built on the blockchain, designed to streamline event creation, ticketing, and transaction processing. Leveraging powerful integrations with **Particle Network**, **Klaster**, and **Seda protocols**, Bounxa enables secure, flexible, and decentralized event hosting. Whether you're setting up a small gathering or a large conference, Bounxa’s infrastructure ensures seamless multichain interactions, automated ticketing through NFTs, and a user-friendly experience for both organizers and attendees.

Explore the key features and technologies that make Bounxa a reliable, future-proof solution for decentralized event management.

---

## Technologies Used
- **Particle Connect**: We integrated the Particle Connect SDK to securely onboard users and create accounts that support interaction across multiple blockchains. This setup provides users with various login options, including email, social login, and so on. See more about Particle Connect SDK [here](https://developers.particle.network/api-reference/connect/desktop/web)

  
- **Klaster**: We implemented cross-chain transactions through the Klaster SDK, enabling users to purchase tickets seamlessly, regardless of the blockchain where their funds are held. See more about Klaster Account Abstraction [here](https://klaster.io/)


- **Seda Protocol**: We integrated Seda as our ticket validator. The Seda explorer allows us to modify transaction reports and provide users with real-time feedback on ticket status, enabling event hosts to verify ticket transactions instantly. Tthe Seda EtherScanv2 API, which leverages multichain queries through a single API key, helps us retrieve transaction statuses in real time to validate Bounxa ticket vouchers. See more about Seda Oracle [here](https://docs.seda.xyz/home/for-developers/building-an-oracle-program/deploying-your-oracle-program)

  
- **Solidity**: Used for creating smart contracts.

  
- **Hardhat**: Used for smart contract testing and manipulations.

- - **Figma**: Bounxa was designed from scratch on Figma. See design [here](https://www.figma.com/design/LZhLfAZw2d6VvmX5bpVER4/Bounxa?node-id=156-3719&t=Q7Fojg8zPt61FDBG-1). 

---



## User Journey

1. **Visit Bounxa**  
   Begin by visiting [Bounxa.com](https://bounxa.com) and clicking on ***Get Started***.

   ![image](https://github.com/user-attachments/assets/fce0c3b0-e34b-409f-a8fc-7a21427c3adf)

---

2. **Login/Create Account**
   Click on ***Connect*** to access all authentication options.

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
4. **Explore Events**  
   Click "Explore Events" to view all available listings. You can do this even without logging in.
   
   ---
  ![image](https://github.com/user-attachments/assets/720e0db2-eb8e-4c7c-b5c2-000c579cedfb)

 --- 

 5. **Create an Event**  
Easily host an event by navigating to "My Events" and clicking "Create Event." Here, you can choose to create either a public or private event. Public events are listed on "Explore Events" for anyone to view and join, while private events remain unlisted and can only be accessed by sharing the event URL with your target audience. While event attendees can purchase tickets with any supported chain of their choice, event hosts are given the option of choosing the blockchain network they would like to receive their money. All funds are converted to the hosts choice of blockchain with the help of Klaster account abstraction. 
---

![image](https://github.com/user-attachments/assets/96873d65-9278-4197-ba6e-e66ef3e8fc82)

---
6. **Explore Your Hosted Events**  

    You can click on My Events to see the events you listed.
   
   ---
   ![image](https://github.com/user-attachments/assets/96d0edbd-708a-42bf-9530-8b3b7b3109af)


--- 

7. **View, Modify, or Delete Your Event**  
   You can view your event details to check ticket sales and other information. You can also edit the event or delete it if it’s not a paid event. To curb fraud, paid events cannot be deleted.
---
 ![image](https://github.com/user-attachments/assets/c0f691a9-c15d-4557-8a5f-9972a7d51ee2)
   
--- 

8. **Buy Tickets**  
   You can purchase a ticket by simply viewing an event and clicking on Buy ticket. A voucher is generated once the transaction is successful. 
---
 ![image](https://github.com/user-attachments/assets/fb5330e1-c8c2-4ef1-b071-4e52695fbd81)

   
--- 
9. **Ticket Voucher**  
Tickets are validated using the Seda EtherScanv2 Protocol, which fetches and verifies successful transactions. Seda Explorer customisation feature also enables Bounxa to provide event hosts with real-time feedback on ticket status.
---
![image0 (1)](https://github.com/user-attachments/assets/c74c1d73-4264-4b1e-a40e-11ac220a1134)


   
--- 
10. **Funding Your Wallet**  
Once you authenticate, a Particle Wallet is created for you. This particle wallet generates a Klaster wallet which you can use for multichain transactions. These transactions are signed and authorized by your Particle connect wallet as the owner. To buy ticket, you will need to click on View Balance, copy your generated wallet, and fund it. 
---

![image](https://github.com/user-attachments/assets/8ef42b20-9a5f-4325-bd92-5a6d7001cb57)



--- 
11. **Bounxa is Mobile Friendly**  
We know most of our users access Bounxa on their phones, so the platform is fully optimized for mobile responsiveness.
---

![image](https://github.com/user-attachments/assets/e7726231-7d93-480c-b0e9-ba30b8e12c1d)


---


**Links:**

Website: [bounxa.com](https://bounxa.com)

Demo Video: https://www.youtube.com/watch?v=5oyj1Pptcz8

Project Repo: https://github.com/Havorahq/bounxa

Smart Contract Code: https://sepolia.arbiscan.io/address/0x32d4B0F1C9150F23613035F825eE52FD6fDC75Cc#code

Bounxa Main Smart Contract Address: 0x32d4B0F1C9150F23613035F825eE52FD6fDC75Cc

Bounxa OracleProgramId: 3fae5c7063ae93bbba37efd4928208ffca490818db865d6fb0cf1b434f0a150e

Figma Link: https://www.figma.com/design/LZhLfAZw2d6VvmX5bpVER4/Bounxa?node-id=156-3719&t=Q7Fojg8zPt61FDBG-1



---

For more information, please contact a [Bounxa Dev](mailto:princenchiba@gmail.com).

---
