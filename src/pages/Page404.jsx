import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Button, Typography, Container } from '@mui/material';
// components

export default function Page404() {
  return (
      <Container sx={{mt:10}}>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
              <Typography variant="h3" paragraph>
                Sorry, page not found!
              </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL?
              Be sure to check your spelling.
            </Typography>

              <Box
                component="img"
                src="/images/illustration_404.svg"
                sx={{ height: 260, mx: 5, my: 10 }}
              />

            <Button to="/dashboard" size="large" variant="contained" component={RouterLink}>
              Go to Home
            </Button>
          </Box>
      </Container>
  );
}
