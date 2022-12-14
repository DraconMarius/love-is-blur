import { useRef } from "react";
//import useInView hook from framer motion
import { useInView } from "framer-motion";
//importing our custom scrollbar component
import Scrollbar from "../components/Scrollbar";
import "../styles/homepage.css";

// section componenet that will be used to create the sections of the homepage
function Section({ children }) {
  // useRef hook to get the ref of the section
  const ref = useRef(null);
  // useInView hook to check if the section is in view
  const isInView = useInView(ref, { once: false });
  // jsx for the section component
  return (
    <section ref={ref}>
      <span
        // if the section is in view, the filter and opacity will be set to none and 1 respectively. thus allowing for the fade in text effect
        style={{
          position: "relative",
          left: "50%",

          transform: "translateX(-50%)",
          filter: isInView ? "none" : "blur(10px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        {/* //rendering the children. this component will be the layout for each section */}
        {children}
      </span>
    </section>
  );
}

//home page component
export default function Home() {
  return (
    <>
      <main className="main-container">
        {/* //section component that will be used to create the sections of the homepage. sections we defined above */}
        <Section className="welcome-section">
          <h1>
            Welcome to Love is Blur. A dating app for people who are looking for
            true love
          </h1>
          {/* inserting moving text scroll bar onto each section of homepage */}
          <Scrollbar />
        </Section>
        <Section className="blurb">
          <h1>
            Photos are gradually unblurred over time, so that you can connect on
            what really matters.
          </h1>
          <Scrollbar />
        </Section>
        <Section className="how-to-use">
          <h1>testimonials</h1>
          <span>
            I met my wife on Love is Blurr and we've been happily married for 2
            years- John from Kentucky
          </span>
          <span>
            Love is Blur is a breath of fresh air in a dating world dominated by
            Tinder- Marissa from New York
          </span>
          <span>I love this concept!- Tony from Montana</span>

          <Scrollbar />
        </Section>
        <Section className="try-it">
          <h1>Try it out!</h1>
        </Section>
      </main>
    </>
  );
}
