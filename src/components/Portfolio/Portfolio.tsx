import {Container} from "./styles";
import githubIcon from "../../assets/github-icon.svg"
import externalLinkIcon from "../../assets/external-link-icon.svg"
import ScrollAnimation from "react-animate-on-scroll";
import {ProjectData, projectsData} from "./projectData";
import {ProjectComponent} from "./ProjectComponent";


export function Portfolio() {
    return (
        <Container id="portfolio">
            <h2>My Portfolio</h2>
            <div className="projects">
                {projectsData.map((project: ProjectData, index: number) => (
                    <ProjectComponent key={index} {...project} />
                ))}
            </div>
        </Container>
    );
}
