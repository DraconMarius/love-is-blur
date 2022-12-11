import { useRef } from "react";
import { useInView } from "framer-motion";
import Scrollbar from "../components/Scrollbar";
import NavigationTabs from "../components/NavigationTabs";
import Footer from "../components/Footer";
import "../styles/homepage.css";

function Section({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <section ref={ref}>
      <span
        style={{
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          filter: isInView ? "none" : "blur(10px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        {children}
      </span>
    </section>
  );
}

export default function App() {
  return (
    <>
      <main className="main-container">
        <NavigationTabs />
        <Section className="welcome-section">
          <h1>
            Welcome to Love is Blur!A dating app for people who are looking for
            true love
          </h1>
          <Scrollbar />
        </Section>
        <Section className="blurb">
          <h1>
            photos are gradually unblurred ovrer time, so that you can connect
            on what really matters.
          </h1>
          <Scrollbar />
        </Section>
        <Section className="how-to-use">
          <h1>testomonials</h1>

          <Scrollbar />
        </Section>
        <Section className="try-it">
          <h1>Try it out!</h1>
        </Section>
        <Footer />
      </main>
    </>
  );
}
