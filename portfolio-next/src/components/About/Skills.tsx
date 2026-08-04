import { motion } from "framer-motion";
import { SkillProps, skillsData } from "./skillsData";
import React from "react";

export const Skills: React.FC<SkillProps> = ({ src, alt, delay }) => {
    return (
        <div className="hability">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: delay / 1000 }}
            >
                <img src={src} alt={alt} title={alt} loading="lazy" />
            </motion.div>
        </div>
    );
};

export function SkillsContainer(props: { callbackfn: (skill:SkillProps, index:number) => React.ReactNode }) {
    return <>
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <h3>Here are my technical skills:</h3>
        </motion.div>
        <div className="hard-skills">
            {skillsData.map((skill, index) => props.callbackfn(skill, index))}
        </div>
    </>;
}
