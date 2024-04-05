
import CardMedia from '@mui/material/CardMedia';

import Card from '@mui/material/Card';

import DoctorSideBar from "./DoctorSideBar";

function DoctorProfile() {


    return (
        <>
            <div className="h-screen  bg-blue-200">
                <aside className="">
                    <DoctorSideBar/>
                </aside>

                <main className="ml-60">
                    <div className=" text-center pt-8 font-semibold text-2xl"> Profile </div>
                    <div className="flex items-center justify-center pt-16">
                        <div className="w-1/2 h-full bg-white">
                        
                        <Card className="flex flex-col items-center justify-center w-full">
                                    <CardMedia
                                        className=" pt-12"
                                        component="img"
                                        sx={{ width: 151 }}
                                        image="logo512.png"
                                        alt="Live from space album cover"
                                    />
                                    <div className="">
                                        <div className="text-xl text-center font-semibold">
                                            Chandler Bing
                                        </div>
                                        <div className="pb-16 pt-4">
                                            <div className="flex pl-10">
                                                <div className="w-1/2 font-semibold">Age</div>
                                                <div className="w-1/2">21</div>
                                            </div>
                                            <div className="flex pt-4 pl-10">
                                                <div className="w-1/2 font-semibold">Gender</div>
                                                <div className="w-1/2">Male</div>
                                            </div>
                                            <div className="flex pt-4 pl-10">
                                                <div className="w-1/2 font-semibold">Email ID</div>
                                                <div className="w-1/2">chandlerbing29@gmail.com</div>
                                            </div>
                                        </div>
                                        
                                    </div>

                        </Card>

                        </div>
                    </div>
                    
                </main>

            </div>


        </>
    );
}


export default DoctorProfile