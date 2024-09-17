import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <div>Đây là Dashboard</div>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
