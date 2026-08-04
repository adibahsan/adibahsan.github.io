'use client'

import { Container } from "./styles"
import { motion } from "framer-motion"
import Illustration from "../../assets/illustration.svg"
import Link from "next/link"

export function Hero(){
  return(
    <Container id="home">
      <div className="hero-text">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
          <p>Hello 👋, I am</p>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1>Adib Ahsan Chowdhury</h1>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3>FullStack Software Developer</h3>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="small-resume">
            Full Time Developer, Part-time Designer, Lifelong Learner
          </p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
        >
            <Link href="#contact" className="button">Contact</Link>
        </motion.div>
      </div>
      <div className="hero-image">
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 }}
        >
          <img src={Illustration.src} alt="Illustration"/>
        </motion.div>
      </div>
    </Container>
  )
}
