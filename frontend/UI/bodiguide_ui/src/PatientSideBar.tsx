
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HomeIcon from '@mui/icons-material/Home';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link } from "react-router-dom";

const drawerWidth = 240;

export default function PatientSideBar() {
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
        <div className='text-center text-xl font-semibold pt-8 pb-8 bg-gray-100'>User</div>
        
        <Divider />
        <nav className="ml-6 pt-6">

            <Link to={"/patient-home"} className="text-black  flex" >
              <HomeIcon/>  
              <div className="pl-2">  Home </div>  
            </Link>
            <Link to={"/"} className="text-black pt-6 flex" >
              <MonitorHeartIcon/> 
              <div className="pl-2">  
                Monitor Data  
              </div>
            </Link>
            <Link to={`/patient-report/1}`} className="text-black pt-6 flex" ><NoteAddOutlinedIcon/> <div className="pl-2"> View your Reports </div> </Link>
            <Link to={"/"} className="text-black pt-6 flex" ><AccountCircleOutlinedIcon/><div className="pl-2">Profile</div></Link>
            <Link to={"/"} className="text-black pt-6 flex" ><InfoOutlinedIcon/><div className="pl-2">About</div></Link>
            <Link to={"/"} className="text-black pt-6 flex" ><LogoutOutlinedIcon/><div className="pl-2"> Logout</div></Link>
        </nav>
        
        
      </Drawer>
        
    </Box>
  );
}

// import React from "react";
// import { Link } from "react-router-dom";
// import { useState } from "react";




// function Navbar({state}) {

//   const [account, setTransaction] = useState([]);

//   const getDetails= async (event) =>{
//     event.PreventDeafult();
//     const { ethereum } = window;
//     if (ethereum) {
//       const account = await ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       setTransaction(account);
//       console.log(account[0]);
//     }
    
//   }
  
//   return (
//     <>

//      <div className="bg-slate-700 w-46 fixed left-0 top-0 h-screen p-10 ">
      
      // <nav>
      // <hr />
      //   <Link to={"/"} className="text-white" >Home</Link><br></br>
      //   <hr />
      //   <Link to={"/hospital"} className="text-white"> Hospital </Link><br></br>
      //   <hr />
      //   <Link to={"/hospital/searchdoc"} className="text-white" >
      //     Search Doctor
      //   </Link><br></br>
      //   <hr />
      //   <Link to={"/hospital/adddoc"} className="text-white" >
      //     Add Doctor Details
      //   </Link>
      //   <hr />

      // </nav>
//     </div>
    


//     </>
//   );
// }

// export default Navbar;
