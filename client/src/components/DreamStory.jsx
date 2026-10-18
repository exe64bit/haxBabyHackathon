import React from 'react';
import { BookOpen } from 'lucide-react';

const STORY_SCENES = [
  {
    step: 'Scene 01',
    heading: 'The Starlight Well',
    text: 'Deep in the Midnight Nursery, beneath an old clocktower that ticks in waltz rhythm, Pip was born from a sleepy wish and a scoop of moonlight. Unlike other creatures of the night, Pip was never scary—Pip just loved the sound of wind in the curtains and the gentle glow of nightlights.',
    badgeColor: 'peach'
  },
  {
    step: 'Scene 02',
    heading: 'The First Broken Lullaby',
    text: 'One rainy Tuesday, the nursery’s music box fell off the cloud shelf and broke into sixteen tiny brass gears. Rather than crying, Pip sat cross-legged on the floor, tied a little pink ribbon around his nightcap, and began humming a soothing replacement song. The baby ghosts fell asleep in minutes.',
    badgeColor: 'yellow'
  },
  {
    step: 'Scene 03',
    heading: 'The Junior Engineer Badge',
    text: 'Recognizing Pip’s gift for calm wonders, the Master Dream Weaver handed him a golden brass key and a warm glass lantern. Pip was officially appointed Junior Dream Engineer, tasked with designing dreams, lullabies, and bedside nightlights for children all across the world.',
    badgeColor: 'mint'
  },
  {
    step: 'Scene 04',
    heading: 'To the Stars and Beyond',
    text: 'Now every midnight, Pip floats high into the starry indigo sky atop his favorite cumulus cloud, steering with starlight and delivering soft bedtime stories so no creature feels lonely in the dark.',
    badgeColor: 'lavender'
  }
];

export const DreamStory = () => {
  return (
    <section id="story" className="section container">
      <div className="section-header">
        <span className="section-tag">
          <BookOpen size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> Storybook Chronicle
        </span>
        <h2 className="section-title">The Legend of Pip</h2>
        <p className="section-subtitle">
          How a sleepy skull baby became the chief lullaby composer at Midnight Nursery.
        </p>
      </div>

      <div className="story-scenes-track">
        {STORY_SCENES.map((scene, idx) => (
          <div key={idx} className="story-scene-card">
            <span className={`scene-step-badge sticker-${scene.badgeColor}`}>
              {scene.step}
            </span>
            <h3 className="scene-heading">{scene.heading}</h3>
            <p className="scene-body">{scene.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

