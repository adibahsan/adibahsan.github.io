import ScrollAnimation from "react-animate-on-scroll";
import {SkillProps, skillsData} from "./skillsData";
import React from "react";



export const Skills: React.FC<SkillProps> = ({ src, alt, delay }) => {
    return (
        <div className="hability">
            <ScrollAnimation animateIn="fadeInUp" delay={delay}>
                <img src={src} alt={alt} title={alt} loading="lazy" />
            </ScrollAnimation>
        </div>
    );
};


export function SkillsContainer(props: { callbackfn: (skill:SkillProps, index:number) => JSX.Element }) {
    return <>
        <ScrollAnimation animateIn="fadeInLeft" delay={0.7 * 1000}>
            <h3>Here are my technical skills:</h3>
        </ScrollAnimation>
        <div className="hard-skills">
            {skillsData.map(props.callbackfn)}
        </div>
    </>;
}
