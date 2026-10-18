import React from 'react';
import { HeroSection } from '../components/HeroSection.jsx';
import { PipCharacter } from '../components/PipCharacter.jsx';
import { ProjectGallery } from '../components/ProjectGallery.jsx';
import { DreamStory } from '../components/DreamStory.jsx';
import { DreamMap } from '../components/DreamMap.jsx';
import { DreamCollection } from '../components/DreamCollection.jsx';
import { Guestbook } from '../components/Guestbook.jsx';

export const HomePage = ({ audio }) => {
  return (
    <div className="home-page">
      <HeroSection />
      <PipCharacter />
      <ProjectGallery audio={audio} />
      <DreamStory />
      <DreamMap />
      <DreamCollection />
      <Guestbook />
    </div>
  );
};

