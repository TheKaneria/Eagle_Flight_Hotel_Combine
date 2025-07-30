import React, { useEffect } from "react";
import "./HappySection.css";
import images from "../../Constants/images";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";

const HappySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });
  const [hasAnimated, setHasAnimated] = useState(() => {
    return localStorage.getItem("hasAnimatedHappySection") === "true";
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rightOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const rightX = useTransform(scrollYProgress, [0, 0.3], [-100, 0]);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      localStorage.setItem("hasAnimatedHappySection", "true");
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <div className="happywrapper">
      <div className="happymain">
        <div className="row align-items-center">
          <div className="col-md-6 d-none d-md-block" ref={ref}>
            <motion.img
              src={images.eaglebus}
              className="happysecbus"
              style={{
                opacity: hasAnimated || isInView ? rightOpacity : 0,
                x: hasAnimated || isInView ? rightX : -100,
              }}
            />
          </div>
          <div className="col-md-6">
            <h1 className="hjsecmah1">Happy Journey</h1>
            <h3 style={{ fontWeight: 700, color: "white" }}>
              We care about your Comfort and Time ☺️
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HappySection;
