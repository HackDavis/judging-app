'use client';

import { useState } from 'react';
import ProjectsHeader from './_components/ProjectsHeader';
import ProjectsList from './_components/ProjectsList';
import ProtectedDisplay from '@components/ProtectedDisplay/ProtectedDisplay';
// import SearchBar from './_components/SearchBar';

export default function Judges() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <ProtectedDisplay allowedRoles="admin judge" failRedirectPath="/login">
      <div>
        <ProjectsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        {/* <SearchBar /> */}
        <ProjectsList activeTab={activeTab} />
      </div>
    </ProtectedDisplay>
  );
}
