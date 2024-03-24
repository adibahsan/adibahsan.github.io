import { Container } from "./styles";
import ScrollAnimation from "react-animate-on-scroll";
import adibImage from "../../assets/adib-linked-u2.jpg";
import {Skills, SkillsContainer} from "./Skills";

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
            style={{marginTop: "2rem", marginBottom: "2rem"}}
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
            style={{marginTop: "2rem", marginBottom: "2rem"}}
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

        <SkillsContainer callbackfn={(skill, index) => (
            <Skills key={index} src={skill.src} alt={skill.alt} delay={skill.delay}/>
        )}/>

      </div>
      <div className="about-image">
        <ScrollAnimation animateIn="fadeInRight" delay={0.6 * 1000}>
          <img loading="lazy" src={adibImage} alt="Adib Profile Picture"/>
        </ScrollAnimation>
      </div>
    </Container>
  );
}
