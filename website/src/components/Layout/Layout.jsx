 import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";






export default function Layout() {

  return (
    <>

      {/* Sidebar */}
      

      {/* Right side */}
      {/* <div className="flex flex-col flex-1 min-w-0"> */}

        {/* Header */}
        <Header/>

        {/* Page Content */}
        {/* <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Outlet />
        </main> */}
     <main >
          <Outlet />
        </main>
        <Footer/>

      {/* </div> */}
    </>
  );
}