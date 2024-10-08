import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';

import ListActionLogs from './action-logs';

const Dashboard = () => {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} md={4}>
        <ListActionLogs />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
