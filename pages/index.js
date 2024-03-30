import React, {useEffect,useContext,useState} from "react";

import { CrowdFundingContext } from "@/Context/CrowdFunding";
import {Hero, Card, PopUp} from "../Components";

const index = () =>
{
  const {
    titleData,
    getCampaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations,
  }= useContext(CrowdFundingContext);

  const [allCampaign, setAllCampaign] = useState();
  const [userCampaign, setUserCampaign] = useState();

  useEffect(()=>
  {
    const getCampaignsData = getCampaigns();
    const userCampaignData = getUserCampaigns();
    return async () =>
    {
      const allData = await getCampaignsData;
      const userData = await userCampaignData;
      setAllCampaign(allData);
      setAllCampaign(userData);
    };
  },[]);

  // DONATE POPUP MODAL
  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState();

  console.log(donateCampaign);

  return(
    <>
      <Hero titleData ={titleData} createCampaign={createCampaign}/>
      <Card
        title="All listed Campaign"
        allCampaigns={allCampaign}
        setOpenModel={setOpenModel}
        setDonate= {setDonateCampaign}
      />
      <Card
        title="Your created Campaign"
        allcampaign = {userCampaign}
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
      />
      
      {openModel && (
        <PopUp
          setOpenModel = {setOpenModel}
          getDonations = {getDonations}
          donate = {donateCampaign}
          donateFunction ={donate}
        />
      )}

    </>
  );
}

export default index;