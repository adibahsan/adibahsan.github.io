import { Container } from "./styles";

import profileImage from "../../assets/profile-image.jpg";
import cssIcon from "../../assets/css-icon.svg";
import htmlIcon from "../../assets/html-icon.svg";
import jsIcon from "../../assets/js-icon.svg";
import nodeIcon from "../../assets/node-icon.svg";
import reactIcon from "../../assets/react-icon.svg";
import typescriptIcon from "../../assets/typescript-icon.svg";
import vueIcon from "../../assets/vue-icon.svg";
import ScrollAnimation from "react-animate-on-scroll";
import adibImage from "../../assets/adib-linked.jpg";

export function About() {
  return (
    <Container id="about">
      <div className="about-text">
        <ScrollAnimation animateIn="fadeInLeft">
          <h2>About Me</h2>
        </ScrollAnimation>

        <ScrollAnimation animateIn="fadeInLeft" delay={0.2 * 1000}>
          <p>
            Hi, I’m Adib and I’m a full-stack web developer who loves building
            innovative and user-friendly solutions.
          </p>
        </ScrollAnimation>

        <ScrollAnimation
          animateIn="fadeInLeft"
          style={{ marginTop: "2rem", marginBottom: "2rem" }}
          delay={0.3 * 1000}
        >
          <p>
            I have four years of experience in development and have worked on
            projects such as real-time delivery systems and e-commerce platforms
            using Spring Boot, React, and React Native. I also like leading and
            coaching teams of software engineers and interns, as well as
            supporting the designers and UX team with my graphics designing
            skills in Photoshop and illustrator.
          </p>
        </ScrollAnimation>

        <ScrollAnimation
          animateIn="fadeInLeft"
          delay={0.4 * 1000}
          style={{ marginTop: "2rem", marginBottom: "2rem" }}
        >
          <p>
            My aim is to use my skills and expertise to deliver high-quality
            products that satisfy the needs of my clients and users. I am always
            keen to learn new technologies and tools that can improve my work.
          </p>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInLeft" delay={0.6 * 1000}>
          <p>
            I’m looking for new opportunities to work with other professionals
            who share my passion. If you want to work with me or know more about
            my projects, don’t hesitate to connect with me or send me a message.
          </p>
        </ScrollAnimation>

        <ScrollAnimation animateIn="fadeInLeft" delay={0.7 * 1000}>
          <h3>Here are my technical skills:</h3>
        </ScrollAnimation>
        <div className="hard-skills">
          <div className="hability">
            <ScrollAnimation animateIn="fadeInUp" delay={0.1 * 1000}>
              <img src={reactIcon} alt="React" />
            </ScrollAnimation>
          </div>

          <div className="hability">
            <ScrollAnimation animateIn="fadeInUp" delay={0.2 * 1000}>
              <img src={vueIcon} alt="Vue" />
            </ScrollAnimation>
          </div>

          <div className="hability">
            <ScrollAnimation animateIn="fadeInUp" delay={0.3 * 1000}>
              <img src={jsIcon} alt="JavaScript" />
            </ScrollAnimation>
          </div>

          <div className="hability">
            <ScrollAnimation animateIn="fadeInUp" delay={0.4 * 1000}>
              <img src={htmlIcon} alt="Html" />
            </ScrollAnimation>
          </div>

          <div className="hability">
            <ScrollAnimation animateIn="fadeInUp" delay={0.5 * 1000}>
              <img src={cssIcon} alt="Css" />
            </ScrollAnimation>
          </div>
          <div className="hability">
            <ScrollAnimation animateIn="fadeInUp" delay={0.6 * 1000}>
              <img src={nodeIcon} alt="Node" />
            </ScrollAnimation>
          </div>

          <div className="hability">
            <ScrollAnimation animateIn="fadeInUp" delay={0.7 * 1000}>
              <img src={typescriptIcon} alt="Typescript" />
            </ScrollAnimation>
          </div>
        </div>
      </div>
      <div className="about-image">
        <ScrollAnimation animateIn="fadeInRight" delay={0.6 * 1000}>
          <img src={adibImage} alt="Adib Profile Picture" />
        </ScrollAnimation>
      </div>
    </Container>
  );
}
