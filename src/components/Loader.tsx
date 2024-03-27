import { CircularProgress, Container } from '@mui/material';

const Loader = () => {
  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%', // Full width
        height: '100%',
        background: 'rgba(255, 255, 255, 0.8)', // Translucent background
        zIndex: 9999, // Ensure it appears on top of other content
      }}
    >
      <CircularProgress color="primary" size={60} thickness={4} />
    </Container>
  );
};

export default Loader;
