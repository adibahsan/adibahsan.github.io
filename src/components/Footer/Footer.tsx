import { Container } from './styles'

import reactIcon from '../../assets/react-icon.svg'
import linkedinIcon from '../../assets/linkedin.png'
import githubIcon from '../../assets/github.png'
import instagramIcon from '../../assets/instagram.png'
import discordIcon from '../../assets/discord.png'
import facebookIcon from '../../assets/fb.svg'

export function Footer() {
  return (
    <Container className="footer">
      <a href="/" className="logo">
        <span style ={{"color": "#23ce6b"}}>AA</span>
        <span>Chowdhury</span>
      </a>
      <div>
        <p>
         Made with <img src={reactIcon} alt="React" /> & a lot of
          <span>❤️</span>
        </p>
          <p>Designing Inspiration from the Great
              <a href={"https://github.com/joaotuliojt"} target={"_blank"}>Joao Tuilo</a>
              <span></span></p>
      </div>

      <div className="social-media">
        <a
          href="https://www.linkedin.com/in/adib-ahsan/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={linkedinIcon} alt="Linkedin" />
        </a>

        <a
          href="https://github.com/adibahsan"
          target="_blank"
          rel="noreferrer"
        >
          <img src={githubIcon} alt="GitHub" />
        </a>

        <a
          href="https://www.facebook.com/tjadib/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={facebookIcon} alt="Facebook" />
        </a>

        <a
          href="https://discord.com/users/465134313319694337"
          target="_blank"
          rel="noreferrer"
        >
          <img src={discordIcon} alt="Discord" />
        </a>
      </div>
    </Container>
  )
}
