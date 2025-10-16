/**
 * Demo file for Hero component
 * This file demonstrates how to use the Hero component
 */

import { Hero } from './Hero';
import profileData from '@/data/profile.json';

export default function HeroDemo() {
  return (
    <div>
      <Hero profile={profileData} />
    </div>
  );
}
