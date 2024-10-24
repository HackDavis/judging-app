import HubHero from './HubHero';
import TableLocations from './TableLocations';
import ViewProjects from './ViewProjects';
import styles from './JudgingHub.module.scss';

export default async function JudgingHub() {
  return (
    <div className={styles.container}>
      <ViewProjects />
      <HubHero />
      {/* <JudgingList projects={unjudgedTeams} /> */}
      <TableLocations />
    </div>
  );
}
