'use client'

import { Container } from './styles'
import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const [isActive, setActive] = useState(false)

  function toggleTheme() {
    let html = document.getElementsByTagName('html')[0]
    html.classList.toggle('light')
  }

  function closeMenu() {
    setActive(false)
  }

  return (
    <Container className="header-fixed">
      <Link href="#home" className="logo">
        <span style={{color:"#23ce6b"}}>AA</span>
        <span>Chowdhury</span>
      </Link>

      <input
        onChange={toggleTheme}
        className="container_toggle"
        type="checkbox"
        id="switch"
        name="mode"
      />
      <label htmlFor="switch">Toggle</label>

      <nav className={isActive ? 'active' : ''}>
        <Link href="#home" onClick={closeMenu}>
          Home
        </Link>
        <Link href="#about" onClick={closeMenu}>
          About Me
        </Link>
        <Link href="#portfolio" onClick={closeMenu}>
          Portfolio
        </Link>
        <Link href="#contact" onClick={closeMenu}>
          Contact
        </Link>
        <a href="/Adib Chowdhury_Resume.pdf" download className="button">
          CV
        </a>
      </nav>

      <div
        aria-expanded={isActive ? 'true' : 'false'}
        aria-haspopup="true"
        aria-label={isActive ? 'Fechar menu' : 'Abrir menu'}
        className={isActive ? 'menu active' : 'menu'}
        onClick={() => {
          setActive(!isActive)
        }}
      ></div>
    </Container>
  )
}
