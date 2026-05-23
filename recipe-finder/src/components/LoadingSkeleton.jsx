import Grid from '@mui/material/Grid';
import { Skeleton, Card } from '@mui/material';

export default function LoadingSkeleton({ count = 8 }) {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: count }).map((_, i) => (
        <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card sx={{ p: 0 }}>
            <Skeleton variant="rectangular" height={200} animation="wave" />
            <Skeleton variant="text" sx={{ mx: 2, mt: 2, mb: 1 }} animation="wave" />
            <Skeleton variant="text" width="60%" sx={{ mx: 2, mb: 2 }} animation="wave" />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
