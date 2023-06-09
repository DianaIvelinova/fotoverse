import Header from "@fotoverse/components/Header";
import UserSection from "@fotoverse/components/UserSection";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Footer from "@fotoverse/components/Footer";
import usePhoto from "@fotoverse/hooks/usePhoto";
import { useUser } from "@fotoverse/hooks/useUser";

const profile = () => {
  const { user } = useUser();
  const { getImagesFromStorage, imageUrls } = usePhoto();

  useEffect(() => {
    if (user && user.uid) {
      getImagesFromStorage();
    }
  }, [user, imageUrls]);

    return (
      <>
        <div className="d-flex">
          <div className="position-fixed">
            <Header />
          </div>
          <div className="h-100" id="main">
            <div className="d-flex flex-column ">
              <UserSection />
              <div className="ps-5 pe-5 pb-5 gallery">
                {imageUrls.map((url) => (
                  <img key={url} src={url} alt="Image" />
                ))}
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </>
    );
  }

export default profile

