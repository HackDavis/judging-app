'use client';

import { useState } from 'react';
import ProtectedDisplay from '@components/ProtectedDisplay/ProtectedDisplay';
import LoginPage from '../_components/LoginPage/LoginPage';
// import SearchBar from './_components/SearchBar';
import ProjectPage from '../_components/ProjectsPage/ProjectPage';

export default function Judges() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <ProtectedDisplay loadingDisplay={'loading...'} failDisplay={<LoginPage />}>
      <div>
        <ProjectPage />
      </div>
    </ProtectedDisplay>
  );
}
