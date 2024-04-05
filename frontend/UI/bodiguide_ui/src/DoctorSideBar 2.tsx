
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HomeIcon from '@mui/icons-material/Home';


import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import { Link } from "react-router-dom";

const drawerWidth = 240;

export default function DoctorSideBar() {
  return (
    <Box sx={{ display: 'flex' }}>
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >        
        <div className='text-center text-xl font-semibold pt-8 pb-8 bg-gray-100'>Doctor</div>
        
        <Divider />
        <nav className="ml-6 pt-6">

            <Link to={"/"} className="text-black  flex" >
              <HomeIcon/>  
              <div className="pl-2">  Home </div>  
            </Link>
            <Link to={"/"} className="text-black pt-6 flex" ><FormatListNumberedOutlinedIcon/> <div className="pl-2"> Patients List </div> </Link>
            <Link to={"/"} className="text-black pt-6 flex" ><AccountCircleOutlinedIcon/><div className="pl-2">Profile</div></Link>
            <Link to={"/"} className="text-black pt-6 flex" ><InfoOutlinedIcon/><div className="pl-2">About</div></Link>
            <Link to={"/"} className="text-black pt-6 flex" ><LogoutOutlinedIcon/><div className="pl-2"> Logout</div></Link>
        </nav>
        
        
      </Drawer>
        
    </Box>
  );
}


