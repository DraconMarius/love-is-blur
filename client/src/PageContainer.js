// import React, { useState } from "react";
import NavigationTabs from "./NavigationTabs";

import Card from "./components/Card";


export default function PortfolioContainer() {
//   const [currentPage, setCurrentPage] = useState("AboutMe");

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
//   const renderPage = () => {
//     if (currentPage === "AboutMe") {
//       return <AboutMe />;
//     }
//     if (currentPage === "Resume") {
//       return <Resume />;
//     }
//     if (currentPage === "ContactMe") {
//       return <ContactMe />;
//     }

//     return <Portfolio />;
//   };

//   const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      {/* We are passing the currentPage from state and the function to update it */}
      <NavigationTabs
        // currentPage={currentPage}
        // handlePageChange={handlePageChange}
      />
          {/* Here we are calling the renderPage method which will return a component  */}
          <Card/>
      {/* {renderPage()} */}
    </div>
  );
}
