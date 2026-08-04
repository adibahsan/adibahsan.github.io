'use client'

import { Container } from "./styles";
import { motion } from "framer-motion";
import adibImage from "../../assets/adib-linked-u2.jpg";
import { Skills, SkillsContainer } from "./Skills";

export function About() {
  return (
    <Container id="about">
      <div className="about-text">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>About Me</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p>
            Hi, I’m Adib and I’m a full-stack web developer who loves building
            innovative and user-friendly solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginTop: "2rem", marginBottom: "2rem" }}
        >
          <p>
            I have four years of experience in development and have worked on
            projects such as real-time delivery systems and e-commerce platforms
            using Spring Boot, React, and React Native. I also like leading and
            coaching teams of software engineers and interns, as well as
            supporting the designers and UX team with my graphics designing
            skills in Photoshop and illustrator.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ marginTop: "2rem", marginBottom: "2rem" }}
        >
          <p>
            My aim is to use my skills and expertise to deliver high-quality
            products that satisfy the needs of my clients and users. I am always
            keen to learn new technologies and tools that can improve my work.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p>
            I’m looking for new opportunities to work with other professionals
            who share my passion. If you want to work with me or know more about
            my projects, don’t hesitate to connect with me or send me a message.
          </p>
        </motion.div>

        <SkillsContainer callbackfn={(skill, index) => (
          <Skills key={index} src={skill.src} alt={skill.alt} delay={skill.delay} />
        )} />

      </div>
      <div className="about-image">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <img loading="lazy" src={adibImage.src} alt={'Adib Ahsan Chowdhury'} />
        </motion.div>
      </div>
    </Container>
  );
}
