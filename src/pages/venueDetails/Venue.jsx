import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Venues_Details_Url } from "../../components/auth/constants/Url";
import { save } from "../../components/storage/save";
import { load } from "../../components/storage/load";
import VenueInfo from "./components/VenueInfo";
import VenueMeta from "./components/VenueMeta";
import ShowUpdateDelete from "./components/ShowUpdateDelete";
import VenueMedia from "./components/VenueMedia";

const Venue = () => {
  const [venue, setVenue] = useState("");
  console.log("venue: ", venue);
  const params = useParams();
  console.log("Params: ", params);
  const paramsId = params.id;
  console.log("Params ID: ", paramsId);
  const profile = load("profile");
  console.log("Profile: ", profile);
  const profileEmail = profile.email;
  console.log("Profile Email: ", profileEmail);
  const profileVenueManager = profile.venueManager;
  console.log("profileVenueManager: ", profileVenueManager);
  const venueOwner = venue.owner;
  console.log("Venue Owner: ", venueOwner);

  async function fetchVenue() {
    const VenueDetailsUrl = Venues_Details_Url;
    console.log("VenueUrl: ", VenueDetailsUrl);
    const FetchVenueDetails =
      VenueDetailsUrl + paramsId + "?_owner=true&_bookings=true";
    console.log("FetchVenueDetails: ", FetchVenueDetails);

    const fetchOptions = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    try {
      const response = await fetch(FetchVenueDetails, fetchOptions);
      console.log("Response :", response);

      const result = await response.json();
      console.log("Result:", result);

      if (response.ok) {
        setVenue(result);
        save("venue_details", result);
        console.log("Result Success:", result);
      } else {
        console.log("Result Error:");
      }
    } catch (error) {
      console.log("Catch Error FetchVenue: ", error);
    }
  }

  useEffect(() => {
    fetchVenue();
  }, []);

  return (
    <main className="venue_details_main">
      <div className="venue_details_card">
        <h1 className="venue_name">{venue.name}</h1>
        <VenueInfo />
        <ShowUpdateDelete />
        <div className="venue_media_description">
          <VenueMedia />
          <p className="venue_description">venue.description</p>
        </div>
        <VenueMeta />
      </div>
      profileVenueManager
    </main>
  );
};

export default Venue;