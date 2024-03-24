
import cssIcon from "../../assets/css-icon.svg";
import htmlIcon from "../../assets/html-icon.svg";
import jsIcon from "../../assets/js-icon.svg";
import nodeIcon from "../../assets/node-icon.svg";
import reactIcon from "../../assets/react-icon.svg";
import typescriptIcon from "../../assets/typescript-icon.svg";
import vueIcon from "../../assets/vue-icon.svg";
export interface SkillProps {
    src: string;
    alt: string;
    delay: number;
}
export const skillsData:SkillProps[] = [
    {
        src: reactIcon,
        alt: "React",
        delay: 0.1 * 1000,
    },
    {
        src: vueIcon,
        alt: "Vue",
        delay: 0.2 * 1000,
    },
    {
        src: jsIcon,
        alt: "JavaScript",
        delay: 0.3 * 1000,
    },
    {
        src: htmlIcon,
        alt: "Html",
        delay: 0.4 * 1000,
    },
    {
        src: cssIcon,
        alt: "Css",
        delay: 0.5 * 1000,
    },
    {
        src: nodeIcon,
        alt: "Node",
        delay: 0.6 * 1000,
    },
    {
        src: typescriptIcon,
        alt: "Typescript",
        delay: 0.7 * 1000,
    },
];
