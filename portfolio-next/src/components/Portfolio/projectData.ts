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
        description: "AppiGo Retailer is an e-commerce platform for merchants, offering customizable inventory and delivery management with features like booking services, social logins, and multi-language support. I led development, introduced key integrations, improved the checkout process, and built a desktop notifier app, serving over 150 merchants across multiple countries.",
        githubLink: null,
        externalLink: "https://appigo.co/stores/",
        techList: ["React", "Spring Boot", "MongoDB", "Kotlin", "Apache Solr", "MySQL", "Express", "Redux"]
    },
    {
        title: "AppiGo Pay",
        description: "AppiGo Pay is a payment aggregator middleware that simplifies integration with multiple payment gateways, offering features like hosted checkout, card tokenization, and recurring payments. I took over the project after the initial developers left, resolved critical production issues, and integrated the subscription flow. My contributions included enhancing security for HNB merchants and saving over $2000 in potential losses by fixing critical bugs",
        githubLink: null,
        externalLink: "https://www.paymongo.com/partner/appigo",
        techList: ["Spring Boot", "Kotlin", "MySQL", "Docker", "GraphQL", "Redux", "React", "Typescript", "Styled Components"]
    },
    {
        title: "Restohub",
        description: "Restohub is a restaurant discovery platform built with the MERN stack and deployed using Docker. I led the project, delivering it in 4 months with a small team, implementing core features for restaurant advertising and onboarding over 30 restaurants onto the platform.",
        githubLink: null,
        externalLink: "https://restohub.lk/",
        techList: ["React", "Express", "MongoDB", "Node.js", "Docker", "Redux", "Typescript"]
    },
    {
        title: "applova Delivery Gateway",
        description: "applova Delivery Gateway is a backend platform enabling merchants to manage delivery services and integrate with delivery partners. I developed and maintained the system integration with the delivery partner \"Grab\", ensuring scalability and performance while completing key integrations within tight timelines.",
        githubLink: null,
        externalLink: "https://applova.io/",
        techList: ["Spring Boot", "MySQL", "Java", "Docker"]
    },
    {
        title: "Rush by appiGo",
        description: "Rush by appiGo is a multi-platform food ordering app with real-time ordering and payment processing. I led development, upgraded React Native versions, integrated Firebase notifications, and worked on a UI revamp. I also built the web version and contributed to the admin portal with Spring Boot integration.",
        githubLink: null,
        externalLink: "https://menu.appigo.co/",
        techList: ["React", "React Native", "Typescript", "Spring Boot", "MongoDB", "MySQL", "Keycloak", "Docker", "Solr"]
    },
    {
        title: "appiGo Delivery",
        description: "Developed a robust delivery system for AppiGo Rush, a food delivery service in Colombo, featuring seamless order management, real-time rider tracking, and multi-platform support for Android, iOS, and Huawei devices. The system also included an admin portal for efficient order processing, rescheduling, and delivery coordination, ensuring a smooth and scalable operation.",
        githubLink: null,
        externalLink: "https://play.google.com/store/apps/details?id=com.aggregatorapp&hl=en&gl=US",
        techList: ["Spring Boot", "MongoDB", "Kotlin", "React", "React Native", "Redux"]
    },

    {
        title: "appiGo Auth",
        description: "AppiGo Auth is an OAuth2 identity provider for secure authentication and authorization, integratable with Keycloak and Auth0. I led the project, developing it in 3 months, adding CAPTCHA verification, SMS-based OTP, and ensuring scalability and security for various authentication platforms.",
        githubLink: null,
        externalLink: null,
        techList: ["Spring Boot", "MongoDB", "Kotlin", "Thymeleaf", "Coroutines"]
    },
    {
        title: "Portfolio Website",
        description: "A personal portfolio website showcasing my skills and projects as a software developer. It includes a clean, responsive design with interactive elements, a project showcase section, and a contact form for potential clients or collaborators.",
        githubLink: "https://github.com/adibahsan",
        externalLink: "https://adibahsan.github.io/",
        techList: ["React", "CSS", "Typescript", "Styled Components", "Github Actions"]
    },
    // Add more projects here...
];
