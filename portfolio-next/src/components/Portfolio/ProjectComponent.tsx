'use client'

import { ProjectData } from "./projectData";
import { motion } from "framer-motion";
import githubIcon from "../../assets/github-icon.svg";
import externalLinkIcon from "../../assets/external-link-icon.svg";
import styled from "styled-components";

// Styled components for the new card design
const Card = styled(motion.div)`
  background: #2b2b2b;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const CardHeader = styled.div<{ $hasImage: boolean }>`
  height: 160px;
  background: ${props => props.$hasImage ? 'transparent' : 'linear-gradient(135deg, #23ce6b 0%, #1eac59 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  img.project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    opacity: 0.8;
  }
`;

const CardBody = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h3`
  font-size: 1.8rem;
  color: white;
  margin: 0;
`;

const Description = styled.p`
  font-size: 1.4rem;
  color: #a0a0a0;
  line-height: 1.5;
  flex: 1;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 1rem;
`;

const Badge = styled.span`
  background: rgba(35, 206, 107, 0.1);
  color: #23ce6b;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  font-size: 1.2rem;
  font-weight: 500;
`;

const Links = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    font-size: 1.4rem;
    padding: 0.5rem 1rem;
    background: rgba(255,255,255,0.05);
    border-radius: 6px;
    transition: background 0.2s;
    
    &:hover {
      background: rgba(255,255,255,0.1);
    }

    img {
      width: 16px;
      height: 16px;
    }
  }
`;

export function ProjectComponent({ title, description, githubLink, externalLink, techList, img }: ProjectData) {
    return (
        <Card
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <CardHeader $hasImage={!!img}>
                {img ? (
                    <img src={img} alt={title} className="project-image" loading="lazy" />
                ) : (
                    <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    </svg>
                )}
            </CardHeader>
            <CardBody>
                <Title>{title}</Title>
                <Description>{description}</Description>
                <TechStack>
                    {techList.slice(0, 4).map((tech, index) => (
                        <Badge key={index}>{tech}</Badge>
                    ))}
                    {techList.length > 4 && <Badge>+{techList.length - 4}</Badge>}
                </TechStack>
                <Links>
                    {!!githubLink && (
                        <a href={githubLink} target="_blank" rel="noreferrer">
                            <img src={githubIcon.src} alt="GitHub" />
                            <span>Code</span>
                        </a>
                    )}
                    {!!externalLink && (
                        <a href={externalLink} target="_blank" rel="noreferrer">
                            <img src={externalLinkIcon.src} alt="Link" />
                            <span>Live</span>
                        </a>
                    )}
                </Links>
            </CardBody>
        </Card>
    );
}
