import React, { useState } from "react";
import "./App.css";
import MainContent from "./components/MainContent";
import TextComponent from "./components/TextComponent";
import EmailComponent from "./components/EmailComponent";
import Navbar from "./components/Navbar";
import PhoneComponent from "./components/PhoneComponent";
import SmsComponent from "./components/SmsComponent";
import VcardComponent from "./components/VcardComponent";
import MeeCardComponent from "./components/MeeCardComponent";
import LocationComponent from "./components/LocationComponent";
import FacebookComponent from "./components/FacebookComponent";
import TwitterComponent from "./components/TwitterComponent";
import YouTubeComponent from "./components/YouTubeComponent";
import WifiComponent from "./components/WifiComponent";
import EventComponent from "./components/EventComponent";
import BitCoinComponent from "./components/BitCoinComponent";
import Header from "./components/Header";
import MenuBar from "./components/MenuBar";
import SectionGetStarted from "./components/SectionGetStarted";

function App() {
  const [activeComponent, setActiveComponent] = useState("url");
  console.log("active component", activeComponent);
  const initialConfig = {
    body: "dot",
    eye: "frame2",
    eyeBall: "ball0",
    bodyColor: "#000000",
    bgColor: "#FFFFFF",
    // additional properties...
  };

  return (
    <React.Fragment>
      <div className="bg-[#247f4f] min-h-screen flex justify-center overflow-x-hidden">
        <main className="mx-auto p-2 w-full max-w-[1132px] min-h-screen pt-10">
          {/* Top bar containing the Header and MenuBar */}
          <div className="flex justify-between items-center w-full mb-8">
            <Header />
            <MenuBar />
          </div>
          <Navbar
            setCurrentPage={setActiveComponent}
            activeComponent={activeComponent}
          />
          {activeComponent === "url" && (
            <MainContent setCurrentPage={setActiveComponent} />
          )}
          {activeComponent === "text" && (
            <TextComponent setCurrentPage={setActiveComponent} />
          )}
          {activeComponent === "email" && (
            <EmailComponent setCurrentPage={setActiveComponent} />
          )}
          {activeComponent === "phone" && (
            <PhoneComponent setCurrentPage={setActiveComponent} />
          )}
          {activeComponent === "sms" && (
            <SmsComponent setCurrentPage={setActiveComponent} />
          )}
          {activeComponent === "vcard" && (
            <VcardComponent setCurrentPage={setActiveComponent} />
          )}
          {activeComponent == "mecard" && (
            <MeeCardComponent setCurrentPage={setActiveComponent} />
          )}
          {activeComponent == "location" && (
            <LocationComponent setCurrentPage={setActiveComponent} />
          )}
          {activeComponent == "facebook" && (
            <FacebookComponent setCurrentPage={setActiveComponent} />
          )}
          {activeComponent === "twitter" && (
            <TwitterComponent setCurrentPage={setActiveComponent} />
          )}
          {activeComponent === "youtube" && (
            <YouTubeComponent setCurrentPage={setActiveComponent} />
          )}

          {activeComponent === "wifi" && (
            <WifiComponent setCurrentPage={setActiveComponent} />
          )}
          {activeComponent === "event" && (
            <EventComponent setCurrentPage={setActiveComponent} />
          )}
          {activeComponent === "bitcoin" && (
            <BitCoinComponent setCurrentPage={setActiveComponent} />
          )}
        </main>
      </div>
      <div className="bg-white mt-16 px-0 m-0 overflow-x-hidden">
        <SectionGetStarted />
      </div>
      <div className="flex space-x-4"></div>
    </React.Fragment>
  );
}

export default App;
