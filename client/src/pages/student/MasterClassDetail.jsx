import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMasterclassBySlug } from "./masterclass-components/masterclass-configs";
import { getTimeRemaining } from "./masterclass-components/masterclass-configs/utils";
import HeroSection from "./masterclass-components/HeroSection";
import AboutSection from "./masterclass-components/AboutSection";
import LearnSection from "./masterclass-components/LearnSection";
import InstructorSection from "./masterclass-components/InstructorSection";
import WhoSection from "./masterclass-components/WhoSection";
import FaqSection from "./masterclass-components/FaqSection";
import CtaSection from "./masterclass-components/CtaSection";
import DynamicReservationModal from "./masterclass-components/DynamicReservationModal";
import ContactModal from "./masterclass-components/ContactModal";
import "./PMPMasterClass.css";

const MasterClassDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const config = getMasterclassBySlug(slug);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // If config not found or is past event, redirect
  useEffect(() => {
    if (!config) {
      navigate('/master-classes');
      return;
    }
    if (config.isPast) {
      navigate('/master-classes');
      return;
    }
  }, [config, navigate]);

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
    if (!config) return;
    
    setTimeLeft(getTimeRemaining(config.eventDate));
    
    const intervalId = setInterval(() => {
      setTimeLeft(getTimeRemaining(config.eventDate));
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [config]);

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

  if (!config) {
    return null;
  }

  return (
    <div className="masterclass-page">
      <main>
        <HeroSection 
          timeLeft={timeLeft} 
          onReserveClick={handleOpenModal}
          onContactClick={handleOpenContactModal}
          config={config}
        />
        <AboutSection onReserveClick={handleOpenModal} config={config} />
        <LearnSection onReserveClick={handleOpenModal} config={config} />
        <InstructorSection config={config} />
        <WhoSection onReserveClick={handleOpenModal} config={config} />
        <FaqSection config={config} />
        <CtaSection onReserveClick={handleOpenModal} config={config} />
      </main>
      
      <DynamicReservationModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        config={config}
      />
      <ContactModal isOpen={isContactModalOpen} onClose={handleCloseContactModal} />
    </div>
  );
};

export default MasterClassDetail;
