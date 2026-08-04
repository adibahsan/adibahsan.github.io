'use client'

import { Container } from './styles'
import { useState } from 'react'

function smoothScrollTo(hash: string) {
  const id = hash.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export function Header() {
  const [isActive, setActive] = useState(false)

  function toggleTheme() {
    let html = document.getElementsByTagName('html')[0]
    html.classList.toggle('light')
  }

  function closeMenu() {
    setActive(false)
  }

  function handleNavClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) {
    event.preventDefault()
    closeMenu()
    smoothScrollTo(hash)
    window.history.pushState(null, '', hash)
  }

  return (
    <Container className="header-fixed">
      <a
        href="#home"
        className="logo"
        onClick={(e) => handleNavClick(e, '#home')}
      >
        <span style={{ color: '#23ce6b' }}>AA</span>
        <span>Chowdhury</span>
      </a>

      <input
        onChange={toggleTheme}
        className="container_toggle"
        type="checkbox"
        id="switch"
        name="mode"
      />
      <label htmlFor="switch">Toggle</label>

      <nav className={isActive ? 'active' : ''}>
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')}>
          Home
        </a>
        <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>
          About Me
        </a>
        <a href="#portfolio" onClick={(e) => handleNavClick(e, '#portfolio')}>
          Portfolio
        </a>
        <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>
          Contact
        </a>
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
