import {Container} from "./styles";
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
