import React, { useState, useEffect } from "react";
import Wenb3Modal from "web3modal";
import { ethers } from "ethers";

// INTERNAL IMPORT

import { crowdFundingABI, CrowdFundingAddress } from "./contants";

// Fetch Smart Contract

const fetchContract = (signerOrProvider) =>
    new ethers.Contract(CrowdFundingAddress, crowdFundingABI, signerOrProvider);

export const CrowdFundingContext = React.createContext();

export const CrowdFundingProvider = ({ children }) => {
    const titleData = "Crowd Funding Contract";
    const [currentAccount, setCurrentAccount] = useState("");
    const [admin, setAdmin] = useState("");

    // Function to fetch the admin address
    const fetchAdminAddress = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const adminAddress = await contract.admin();
            setAdmin(adminAddress);
        } catch (error) {
            console.error("Error fetching admin address:", error);
        }
    };
    useEffect(() => {
        checkIfWalletConnected();
        fetchAdminAddress(); // Fetch the admin address when the component mounts
    }, []);

    const createCampaign = async (campaign) => {
        const { title, description, amount, deadline } = campaign;
        const web3modal = new Wenb3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const accounts = await window.ethereum.request({
            method: "eth_accounts"
        });
        const currentUser = accounts[0];

        console.log(currentAccount);
        console.log(currentUser);

        try {
            const transaction = await contract.createCampaign(
                currentUser,
                title,
                description,
                ethers.utils.parseUnits(amount, 18),
                new Date(deadline).getTime()
            );

            await transaction.wait();

            location.reload();

            console.log("contract call success", transaction);
        }
        catch (error) {
            console.log("contract call faliure", error);
        }
    };

    const getCampaigns = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const allCampaigns = await contract.getCampaigns();

            const accounts = await window.ethereum.request({
                method: "eth_accounts"
            });
            const currentUser = accounts[0];

            // Filter campaigns where current user has not reported
            const filteredCampaigns = allCampaigns.filter(campaign => {
                if (!currentUser) {
                    console.log("No current user found");
                    return false; // If currentUser is not defined, don't include any campaigns
                }
                // Convert both currentUser and elements in campaign.reported to lowercase for case-insensitive comparison
                const currentUserLower = currentUser.toLowerCase();
                const reportedLower = campaign.reported.map(addr => addr.toLowerCase());
                return !reportedLower.includes(currentUserLower) && // User hasn't reported
                       campaign.amountCollected < campaign.target; // Amount collected is less than target
            });
            

            const parsedCampaigns = filteredCampaigns.map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
                reportsCount: campaign.reports.toNumber(),
                reportedAddresses: campaign.reported,
                pId: i
            }));

            return parsedCampaigns;
        } catch (error) {
            console.error("Error fetching campaigns:", error);
        }
    };



    const getUserCampaigns = async () => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const allCampaigns = await contract.getCampaigns();

        const accounts = await window.ethereum.request({
            method: "eth_accounts"
        });

        const currentUser = accounts[0];

        console.log(currentUser)

        const filteredCampaigns = allCampaigns.filter(campaign => {
            const owner = campaign.owner.toLowerCase(); // Convert owner to lowercase for comparison
            const currentUserLowerCase = currentUser.toLowerCase(); // Convert currentUser to lowercase for comparison
            return owner === currentUserLowerCase;
        });

        const userData = filteredCampaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(
                campaign.amountCollected.toString(),
            ),
            reportsCount: campaign.reports.toNumber(),
            reportedAddresses: campaign.reported,
            pId: i
        }));

        return userData;

    };


    const donate = async (pId, amount) => {
        console.log("donate func");
        const web3modal = new Wenb3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        

        const campaignData = await contract.donateCampaign(pId, { value: ethers.utils.parseEther(amount) });

        await campaignData.wait();
        location.reload();

        return campaignData;
    };

    const getDonations = async (pId) => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        console.log(contract);

        const donations = await contract.getDonators(pId);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString())
            });
        }

        return parsedDonations;
    };


    const reportCampaign = async (pId) => {
        try {
            const web3modal = new Wenb3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const reportTx = await contract.reportCampaign(pId);
            await reportTx.wait();
            location.reload();

            return reportTx;
        } catch (error) {
            console.error("Error reporting campaign:", error);
        }
    };

    const getReported = async (pId) => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const [reportedAddresses, reportsCount] = await contract.getReported(pId);

            return { reportedAddresses, reportsCount };
        } catch (error) {
            console.error("Error getting reported data:", error);
        }
    };


    const createNews = async (headline, description) => {
        try {
            if (currentAccount) {
                const web3modal = new Wenb3Modal(); // Corrected typo
                const connection = await web3modal.connect();
                const provider = new ethers.providers.Web3Provider(connection);
                const signer = provider.getSigner();
                const contract = fetchContract(signer);

                const transaction = await contract.createNews(headline, description);
                await transaction.wait();
                location.reload();

                console.log("News created successfully");
            } else {
                throw new Error("Only admin can create news articles"); // Throw an error if user is not admin
            }
        } catch (error) {
            console.error("Error creating news:", error);
            throw error; // Re-throw the error to handle it in the component
        }
    };


    const getAllNews = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const allNews = await contract.getAllNews();

            return allNews;
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };


    const createEvent = async (title, description, location, deadline) => {
        try {
            if (currentAccount) {
                const web3modal = new Wenb3Modal(); // Corrected typo
                const connection = await web3modal.connect();
                const provider = new ethers.providers.Web3Provider(connection);
                const signer = provider.getSigner();
                const contract = fetchContract(signer);

                // Convert deadline to Unix timestamp
                const deadlineTimestamp = Date.parse(deadline) / 1000; // Convert milliseconds to seconds

                const transaction = await contract.createEvent(title, description, location, deadlineTimestamp);
                await transaction.wait();

                // Reload the page after creating the event
                window.location.reload();

                console.log("Event created successfully");
            } else {
                throw new Error("Only admin can create Events"); // Throw an error if user is not admin
            }
        } catch (error) {
            console.error("Error creating Event:", error);
            throw error; // Re-throw the error to handle it in the component
        }
    };




    const getAllEvents = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const allEvents = await contract.getAllEvents();

            return allEvents;
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };


    // --CHECK WALLET IS CONNECTED
    // --CHECK WALLET IS CONNECTED
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) {
                setOpenError(true);
                setError("Install MetaMask");
                return;
            }

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No account found");
            }
        } catch (error) {
            console.log("Something went wrong while connecting to the wallet:", error);
        }
    };

    useEffect(() => {
        checkIfWalletConnected();
    }, []);


    // -- CONNECT WALLET FUNCTION

    const connectWallet = async () => {
        try {
            if (!window.ethereum) return console.log("Install MetaMask");

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentAccount(accounts[0]);
        }
        catch (error) {
            console.log("Error while connecting to wallet");
        }
    };

    return (
        <CrowdFundingContext.Provider
            value={{
                titleData,
                currentAccount,
                createCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
                connectWallet,
                reportCampaign,
                getReported,
                createNews,
                getAllNews,
                createEvent,
                getAllEvents,
                admin
            }}
        >
            {children}
        </CrowdFundingContext.Provider>
    )

}