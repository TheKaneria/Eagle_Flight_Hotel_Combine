import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "./CountSection.css";

const CountSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation runs only once when the section enters the viewport
    threshold: 0.3, // Trigger when 10% of the component is visible
  });

  return (
    <div className="counterSec_main" ref={ref}>
      <div className="overlay"></div>
      <div className="counter_content">
        <div className="counter_item">
          <h2>
            {inView ? (
              <CountUp start={0} end={50} duration={2.5} suffix="+" />
            ) : (
              "0+"
            )}
          </h2>
          <p>BUSES</p>
        </div>
        <div className="counter_item">
          <h2>
            {inView ? (
              <CountUp
                start={0}
                end={10000}
                duration={2.5}
                separator=","
                suffix="+"
              />
            ) : (
              "0+"
            )}
          </h2>
          <p>HAPPY CUSTOMERS</p>
        </div>
        <div className="counter_item">
          <h2>
            {inView ? (
              <CountUp start={0} end={100} duration={2.5} suffix="+" />
            ) : (
              "0+"
            )}
          </h2>
          <p>CITIES TRAVEL</p>
        </div>
      </div>
    </div>
  );
};

export default CountSection;
