import {ProjectData} from "./projectData";
import ScrollAnimation from "react-animate-on-scroll";
import githubIcon from "../../assets/github-icon.svg";
import externalLinkIcon from "../../assets/external-link-icon.svg";

export function ProjectComponent({title, description, githubLink, externalLink, techList}: ProjectData) {
    return <ScrollAnimation animateIn="flipInX">
        <div className="project">
            <header>
                <svg width="50" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none"
                     stroke="#23ce6b " strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <title>{title}</title>
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
                <div className="project-links">
                    {!!githubLink && <a href="https://github.com/adibahsan" target="_blank" rel="noreferrer">
                        <img src={githubIcon} alt="GitHub"/>
                    </a>}

                    {externalLink && (
                        <a href={externalLink} target="_blank" rel="noreferrer">
                            <img src={externalLinkIcon} alt="Visitar site"/>
                        </a>
                    )}
                </div>
            </header>
            <div className="body">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <footer>
                <ul className="tech-list">
                    {techList.map((tech, index) => (
                        <li key={index}>{tech}</li>
                    ))}
                </ul>
            </footer>
        </div>
    </ScrollAnimation>;
}
