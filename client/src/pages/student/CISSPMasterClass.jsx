import React, { useEffect, useState } from "react";
import { getTimeRemaining } from "./masterclass-components/cissp-constants";
import HeroSection from "./masterclass-components/HeroSection";
import AboutSection from "./masterclass-components/AboutSection";
import LearnSection from "./masterclass-components/LearnSection";
import InstructorSection from "./masterclass-components/InstructorSection";
import WhoSection from "./masterclass-components/WhoSection";
import FaqSection from "./masterclass-components/FaqSection";
import CtaSection from "./masterclass-components/CtaSection";
import CISSPReservationModal from "./masterclass-components/CISSPReservationModal";
import ContactModal from "./masterclass-components/ContactModal";
import "./PMPMasterClass.css";

const CISSPMasterClass = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Load Font Awesome
  useEffect(() => {
    const faId = "fa-6-cdn";
    if (!document.getElementById(faId)) {
      const link = document.createElement("link");
      link.id = faId;
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    }
  }, []);

  // Update countdown every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenContactModal = () => {
    setIsContactModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <div className="masterclass-page">
      <main>
        <HeroSection 
          timeLeft={timeLeft} 
          onReserveClick={handleOpenModal}
          onContactClick={handleOpenContactModal}
          masterclassType="cissp"
        />
        <AboutSection onReserveClick={handleOpenModal} masterclassType="cissp" />
        <LearnSection onReserveClick={handleOpenModal} masterclassType="cissp" />
        <InstructorSection masterclassType="cissp" />
        <WhoSection onReserveClick={handleOpenModal} masterclassType="cissp" />
        <FaqSection masterclassType="cissp" />
        <CtaSection onReserveClick={handleOpenModal} masterclassType="cissp" />
      </main>
      
      <CISSPReservationModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <ContactModal isOpen={isContactModalOpen} onClose={handleCloseContactModal} />
    </div>
  );
};

export default CISSPMasterClass;
