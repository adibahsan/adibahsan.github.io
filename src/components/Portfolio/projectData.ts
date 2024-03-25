export interface ProjectData {
    title: string;
    description: string;
    githubLink: string | null;
    externalLink: string | null;
    techList: string[];
}

export const projectsData: ProjectData[] = [
    {
        title: "AppiGo Retailer",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        githubLink: "https://github.com/adibahsan",
        externalLink: "https://appigo.co/stores/",
        techList: ["React", "Spring Boot", "MongoDB", "Kotlin", "Apache Solr", "MySQL", "Express", "Redux"]
    },
    {
        title: "AppiGo Pay",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        githubLink: "https://github.com/adibahsan",
        externalLink: "https://www.paymongo.com/partner/appigo",
        techList: ["React", "Typescript", "Styled Components"]
    },
    {
        title: "Restohub",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        githubLink: null,
        externalLink: "https://restohub.lk/",
        techList: ["Html", "Css", "JavaScript"]
    },
    {
        title: "applova Delivery Gateway",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        githubLink: null,
        externalLink: "https://applova.io/",
        techList: ["VueJs", "JavaScript"]
    },
    {
        title: "appiGo Rush",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        githubLink: null,
        externalLink: "https://menu.appigo.co/",
        techList: ["VueJs", "JavaScript"]
    },
    {
        title: "appiGo Delivery",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        githubLink: null,
        externalLink: "https://play.google.com/store/apps/details?id=com.aggregatorapp&hl=en&gl=US",
        techList: ["VueJs", "JavaScript"]
    },
    {
        title: "AI Space Assistant",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        githubLink: "https://github.com/adibahsan",
        externalLink: null,
        techList: ["VueJs", "JavaScript"]
    },
    {
        title: "Portfolio Website",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        githubLink: "https://github.com/adibahsan",
        externalLink: "https://adibahsan.github.io/",
        techList: ["Html", "Css", "JavaSript"]
    },
    // Add more projects here...
];
