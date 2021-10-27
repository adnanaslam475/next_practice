import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from 'next/link'


function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar style={{ alignItems: 'center' }}>
                    <Link href='/' >
                        News App
                    </Link>
                    <div style={{ position: 'absolute', right: '30px', display: 'flex' }}>
                        <Button   >
                            <Link href='/login' > Login</Link>
                        </Button>
                        <Button   >
                            <Link href='/register' > Register</Link>
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;