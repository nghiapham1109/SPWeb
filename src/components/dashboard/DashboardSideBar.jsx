import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
import Scrollbar from './Scrollbar.jsx';
import NavSection from './NavSection.jsx';
import sidebarConfig from './SidebarConfig.jsx';
// components

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200]
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};
export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
    const { pathname } = useLocation();
  
    useEffect(() => {
      if (isOpenSidebar) {
        onCloseSidebar();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);
  
    const renderContent = (
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
        }}
      >
        <Box sx={{ px: 2.5, py: 3 }}>
          <Box  to="/" sx={{ display: 'inline-flex'}}>
          <Box component="img" src="/images/logo-icon.png" sx={{ width: 40, height: 40 }} />;
          </Box>
        </Box>
  
        <Box sx={{ mb: 5, mx: 2.5 }}>
          <Link underline="none"  to="#">
            <AccountStyle>
              <Avatar src="/images/avatar_default.jpg" alt="photoURL" />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  Dean Hoang
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  ADMIN
                </Typography>
              </Box>
            </AccountStyle>
          </Link>
        </Box> 
        <NavSection navConfig={sidebarConfig} />

        <Box sx={{ flexGrow: 1 }} />            
      </Scrollbar>
    );
  
    return (
      <RootStyle>
          <Drawer
            open={isOpenSidebar}
            onClose={onCloseSidebar}
            PaperProps={{
              sx: { width: DRAWER_WIDTH }
            }}
          >
            {renderContent}
          </Drawer>
      </RootStyle>
    );
  }
  