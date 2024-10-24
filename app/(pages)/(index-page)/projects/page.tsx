'use client';

import ProtectedDisplay from '@components/ProtectedDisplay/ProtectedDisplay';
// import SearchBar from './_components/SearchBar';
import ProjectPage from '../_components/ProjectsPage/ProjectPage';

export default function Judges() {
  return (
    <ProtectedDisplay allowedRoles="admin judge" failRedirectPath="/login">
      <div>
        <ProjectPage />
      </div>
    </ProtectedDisplay>
  );
}
