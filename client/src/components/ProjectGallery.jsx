import React, { useState, useEffect } from 'react';
import { projectApi } from '../api/projectApi.js';
import { ProjectCard } from './ProjectCard.jsx';
import { Sparkles } from 'lucide-react';

const FALLBACK_PROJECTS = [
  {
    title: 'The Lullaby Lab',
    slug: 'the-lullaby-lab',
    category: 'Sound Invention',
    badge: 'Audio Synthesizer',
    imageUrl: '/images/pip_lullaby_box.png',
    description:
      'A whimsical music box that catches fallen starlight and turns it into gentle chimes and sleepy melodies. Built with brass gears and moon dust so little creatures drift into sweet slumbers without scary noises.',
    features: [
      'Interactive Web Audio synthesis',
      'Real-time star chord progression',
      'Volume and soothing chime generator',
      '100% gentle and whisper-quiet'
    ]
  },
  {
    title: 'Nightlight Collection',
    slug: 'nightlight-collection',
    category: 'Glow Engineering',
    badge: 'Bedside Lantern',
    imageUrl: '/images/pip_dream_lantern.png',
    description:
      'Handcrafted bedside lanterns designed by Pip to chase away shadows under the bed. Powered by captured moonlight and sleepy fireflies, each lantern casts a cozy peach and lavender aura across the nursery.',
    features: [
      'Interactive light switch with warm glow aura',
      'Adjustable soft brightness modes',
      'Shadow-calming starlight lens',
      'Cozy room ambiance'
    ]
  },
  {
    title: 'Dream Delivery Routes',
    slug: 'dream-delivery-routes',
    category: 'Night Sky Navigation',
    badge: 'Flight Radar 1999',
    imageUrl: '/images/pip_avatar_cloud.png',
    description:
      'The cosmic flight map Pip uses to pilot his cloud across midnight rooftops. Connects the Cloud Castle to the Moon Garden with zero bumpy turbulence so bedtime dreams arrive right on schedule.',
    features: [
      'Interactive destination selector',
      'Real-time flight path calculation',
      'Sticker discovery checkpoint system',
      'Live delivery dispatch status'
    ]
  }
];

export const ProjectGallery = ({ audio }) => {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchProjects = async () => {
      try {
        const res = await projectApi.getProjects();
        if (mounted && res.data?.projects?.length > 0) {
          setProjects(res.data.projects);
        }
      } catch {
        // Graceful fallback to client default projects
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProjects();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="projects" className="section container">
      <div className="section-header">
        <span className="section-tag">
          <Sparkles size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> Junior Dream Engineer Showcase
        </span>
        <h2 className="section-title">Pip’s Midnight Inventions</h2>
        <p className="section-subtitle">
          Every project is built by hand at the Midnight Nursery using brass gears, moonbeams, and sweet melodies.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug || project._id} project={project} audio={audio} />
        ))}
      </div>
    </section>
  );
};

