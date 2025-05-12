import React, { useState } from 'react';
import logo from './assets/thoughtworks-logo.svg';
import aiImg from './assets/image.png';
import aiAssit from './assets/ai-assist.png';
import './NavigationBar.css';
import { MenuItem } from '@mui/material';
import { Search } from '@mui/icons-material';
import AIAssistDialog from './AIAssistDialog';

function NavigationBar() {
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <>
      <div className='Tech redar'>
        <nav className='navbar'>
          <img src={logo} className='logo-top-left' alt='logo' />
          <div className='navbar-items'>
            <MenuItem className='navbar-item' href='#home'>
              What we do
            </MenuItem>
            <MenuItem className='navbar-item' href='#about'>
              Whom we work with
            </MenuItem>
            <MenuItem className='navbar-item' href='#services'>
              Insights
            </MenuItem>
            <MenuItem className='navbar-item' href='#contact'>
              Careers
            </MenuItem>
            <MenuItem className='navbar-item' href='#contact'>
              Contact
            </MenuItem>
            <MenuItem className='navbar-item' href='#contact'>
              <Search style={{ marginRight: '8px' }} />
              Search
            </MenuItem>
            <MenuItem className='navbar-item' onClick={handleOpenDialog}>
              <img src={aiAssit} className='ai-assist' alt='ai-assist-img' /> AI Assist
            </MenuItem>
          </div>
        </nav>
      </div>
      <img src={aiImg} className='base-image' alt='aiImg' />
      <AIAssistDialog open={openDialog} onClose={handleCloseDialog} />
    </>
  );
}

export default NavigationBar;
