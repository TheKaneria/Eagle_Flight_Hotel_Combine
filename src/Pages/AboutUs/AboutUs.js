import React, { useEffect } from "react";
import "./Aboutus.css";
import "bootstrap/dist/css/bootstrap.min.css";
import images from "../../Constants/images";
import HappyClients from "../../Components/HappyClients/HappyClients";
import PathHero from "../../Components/PathHeroComponent/PathHero";
import { Helmet } from "react-helmet";
import { useBusContext } from "../../Context/bus_context";

const AboutUs = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const { selectedTabMainHome } = useBusContext();

  return (
    <>
      <Helmet>
        <title>About | Airline Booking</title>
      </Helmet>
      <PathHero name={"About Us"} />

      {selectedTabMainHome === "flights" ? (
        <section className="container videosection">
          <div className="row align-items-center justify-content-center pt-4 gap-3">
            <div className="col-lg-8 col-12 text-center">
              <h1 className="fw-bolder">
                Where Your Journey Begins with Quality and Reliability
              </h1>
            </div>
            <div className="col-lg-8 col-12 text-center">
              <p className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                non molestias tempora, debitis distinctio id nemo praesentium
                fuga quas eveniet harum esse nisi quasi sed saepe unde doloribus
                reiciendis placeat eaque laboriosam vel quidem sunt! Minus
                laudantium earum explicabo quibusdam,
              </p>
            </div>
          </div>

          <div className="row px-3 pb-4">
            <div className="videodiv">
              <iframe
                width="100%"
                height="500px"
                src="https://www.youtube.com/embed/HN6PDeBejIc?si=xnTYb6gO05TgSrLc"
                title="YouTube video player"
                frameborder="1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
                className="videodiv"
              ></iframe>
            </div>
          </div>
        </section>
      ) : (
        <div className="abtusbuscont">
          <div className="row align-items-center gap-3 gap-md-0 p-3 mb-md-5">
            <div className="col-md-6">
              <div className="imgZoomContainer">
                <img src={images.brothers} className="abtusbuscontImg" />
              </div>
            </div>
            <div className="col-md-6">
              <h1 style={{ fontWeight: "bold", color: "var(--color-theme)" }}>
                About Eagle Travels
              </h1>
              <p className="abtusbuscontPtag">
                When Eagle entered the road travel business in Gujarat, the
                quality of buses and the experience of road travel needed
                significant improvement. With the objective to make the road
                travel a pleasant experience, Late Shri Rasikbhai Golawala laid
                the foundation of Eagle in the year 1978. His Son and current
                Chairman and Managing Director, Mr. Jayendra Bavaria joined his
                father’s travel business when he was just 12 years of age.
              </p>
              <p className="abtusbuscontPtag">
                Since 1978, Eagle has been a pioneer in offering the comfort to
                passengers and have set a benchmark for the competitors to
                follow.
              </p>
            </div>
          </div>

          <div className="row align-items-center gap-3 gap-md-0 p-3">
            <div className="col-md-6">
              <h1 style={{ fontWeight: "bold" }}>Eagle Travels</h1>
              <p className="abtusbuscontPtag">
                In year 2018, Eagle is taking a leap to the next level in road
                travel experience. Eagle will be introducing specially designed
                all new fleet of 95 buses under the brand name Eagle Travels.
                ‘Eagle Travels’ symbolizes ‘Novel travel Experience’.
              </p>
              <p className="abtusbuscontPtag">
                ‘Eagle Travels’ is the branchild of Mr. Darshan Bavaria, the son
                of Mr. Jayendra Bavaria.
              </p>
              <p className="abtusbuscontPtag">
                Mr. Darshan brings with him a new zeal, energy and professional
                approach in management that will take Eagle Travels to the next
                level of Road travel business.
              </p>
            </div>
            <div className="col-md-6">
              <div className="imgZoomContainer">
                <img src={images.bus3} className="abtusbuscontImg" />
              </div>
            </div>
          </div>
        </div>
      )}

      <HappyClients />
    </>
  );
};

export default AboutUs;
