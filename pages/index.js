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

  const [allcampaign, setAllcampaign] = useState();
  const [usercampaign, setUsercampaign] = useState();

  useEffect(()=>
  {
    const getCampaignsData = getCampaigns();
    const userCampaignsData = getUserCampaigns();
    return async () =>
    {
      const allData = await getCampaignsData;
      const userData = await userCampaignsData;
      setAllcampaign(allData);
      setUsercampaign(userData);
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
        allCampaign={allcampaign}
        setOpenModel={setOpenModel}
        setDonate= {setDonateCampaign}
      />
      <Card
        title="Your created Campaign"
        allCampaign = {usercampaign}
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