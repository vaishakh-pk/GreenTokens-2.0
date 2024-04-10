// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding{
    struct Campaign {

        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        address[] donators;
        uint [] donations;
        uint reports;
        address [] reported;
        
    }

    struct News {
        string headline;
        string content;
        uint256 timestamp;
    }
    struct Event {
        string title;
        string content;
        string location;
        uint date;
        uint256 timestamp;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => News) public news;
    mapping(uint256 => Event) public events;

    uint256 public numberOfCampaigns = 0;
    uint256 public numberOfNews = 0;
    uint256 public numberOfEvents = 0;
    address public admin = 0x71bE63f3384f5fb98995898A86B02Fb2426c5788;

    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline) 
    public returns (uint256){
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(campaign.deadline < block.timestamp, "The deadline should be date in the future");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.reports = 0;
        numberOfCampaigns++;
        return numberOfCampaigns-1;
    }

    function donateCampaign(uint256 _id) public  payable 
    {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent,) = payable(campaign.owner).call{value: amount}("");

        if(sent)
        {
            campaign.amountCollected = campaign.amountCollected + amount; 
        }
    }

        function reportCampaign(uint256 _id) public 
    {

        Campaign storage campaign = campaigns[_id];

        campaign.reported.push(msg.sender);
        campaign.reports ++;

    }

    function getReported(uint256 _id) view public returns (address[] memory,uint256)
    {
        return (campaigns[_id].reported, campaigns[_id].reports);
    }

    function getDonators(uint256 _id) view public returns (address[] memory,uint256[] memory)
    {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory)
    {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) 
        {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;   
        }

        return allCampaigns;
    }

    function createNews(string memory _headline, string memory _content) public {
        News storage latestNews = news[numberOfNews];
        latestNews.headline = _headline;
        latestNews.content = _content;
        latestNews.timestamp = block.timestamp;
        numberOfNews++;
    }

        function getAllNews() public view returns (News[] memory) {
        News[] memory allNews = new News[](numberOfNews);
        for (uint256 i = 0; i < numberOfNews; i++) {
            News storage item = news[i];
            allNews[i] = item;   
        }
        return allNews;
    }

    function createEvent(string memory _title, string memory _content, string memory _location, uint _deadline) public {
        Event storage latestEvent = events[numberOfEvents];
        latestEvent.title = _title;
        latestEvent.content = _content;
        latestEvent.location = _location;
        latestEvent.date = _deadline;
        latestEvent.timestamp = block.timestamp;
        numberOfEvents++;
    }

    function getAllEvents() public view returns (Event[] memory) {
        Event[] memory allEvents = new Event[](numberOfEvents);
        for (uint256 i = 0; i < numberOfEvents; i++) {
            allEvents[i] = events[i];   
        }
        return allEvents;
    }
}