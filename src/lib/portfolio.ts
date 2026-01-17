import { colors } from "./colors";

// ==========================================
// PORTFOLIO DATA - GaloDev
// ==========================================

export interface PersonalInfo {
    name: string;
    displayName: string;
    title: string;
    bio: string;
    location: string;
    timezone: string;
    status: string;
    email: string;
    github: string;
    linkedin?: string;
    avatar?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    tech: string[];
    github: string;
    demo?: string;
    cover: string;
    color: (typeof colors)[keyof typeof colors];
    featured: boolean;
}

export interface SkillCategory {
    id: string;
    name: string;
    icon: string;
    skills: Skill[];
}

export interface Skill {
    name: string;
    level: number; // 1-5
    color: string;
}

// Personal Info
export const personalInfo: PersonalInfo = {
    name: "Gabriel",
    displayName: "GaloDev",
    title: "Desarrollador Full Stack",
    bio: "Desarrollador apasionado por crear experiencias web modernas y eficientes. Especializado en JavaScript, React y Python. Siempre aprendiendo y explorando nuevas tecnologías.",
    location: "Chile",
    timezone: "UTC -03:00",
    status: "Disponible para proyectos",
    email: "contacto@elgalo.dev",
    github: "https://github.com/bagxxi",
    linkedin: "/linkedin",
    avatar: "/avatar.jpg"
};

// Projects
export const projects: Project[] = [
    {
        id: "inversiones-byg",
        title: "Inversiones BYG",
        description: "Sitio web corporativo para empresa de inversiones inmobiliarias. Diseño profesional y optimizado para conversiones.",
        tech: ["HTML", "CSS", "JavaScript", "SEO"],
        github: "",
        demo: "https://inversionesbyg.cl/",
        cover: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop",
        color: colors.emerald,
        featured: true
    },
    {
        id: "photography-portfolio",
        title: "Portfolio de Fotografía",
        description: "Sitio de portafolio para fotografía profesional con galería interactiva y diseño moderno.",
        tech: ["Astro", "React", "TypeScript"],
        github: "https://github.com/bagxxi/portafolio-foto",
        cover: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=400&fit=crop",
        color: colors.pink,
        featured: true
    },
    {
        id: "hormiga-app",
        title: "HormigaApp",
        description: "Aplicación de finanzas personales con seguimiento de gastos, presupuestos y ahorro mensual.",
        tech: ["React", "Django", "PostgreSQL", "REST API"],
        github: "https://github.com/bagxxi/hormiga_front",
        cover: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=400&fit=crop",
        color: colors.green,
        featured: true
    },
    {
        id: "telecomx-analysis",
        title: "TelecomX Análisis",
        description: "Proyecto de análisis de datos para telecomunicaciones con Python y visualización de datos.",
        tech: ["Python", "Pandas", "Jupyter", "Data Analysis"],
        github: "https://github.com/bagxxi/TelecomX-Analisis",
        cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop",
        color: colors.blue,
        featured: false
    },
    {
        id: "dlab-c6",
        title: "DLab C6 Frontend",
        description: "Proyecto frontend colaborativo desarrollado en Desafío Latam con React y JavaScript.",
        tech: ["JavaScript", "React", "CSS", "Team Project"],
        github: "https://github.com/dlab-team/c6-frontend",
        cover: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=400&fit=crop",
        color: colors.purple,
        featured: false
    },
    {
        id: "dlab-c9",
        title: "DLab C9 Frontend",
        description: "Frontend para proyecto C9 de Desafío Latam con equipo colaborativo.",
        tech: ["JavaScript", "React", "Teamwork"],
        github: "https://github.com/dlab-team/c9-front",
        cover: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop",
        color: colors.indigo,
        featured: false
    },
    {
        id: "cuppon",
        title: "Cuppon",
        description: "Sistema de gestión de cupones y ofertas. Desafío evaluado.",
        tech: ["JavaScript", "HTML", "CSS"],
        github: "https://github.com/bagxxi/cuppon",
        cover: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop",
        color: colors.orange,
        featured: false
    },
    {
        id: "ricomida",
        title: "Ricomida",
        description: "Proyecto de recetas y comida para Desafío Latam.",
        tech: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com/bagxxi/Ricomida",
        cover: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&h=400&fit=crop",
        color: colors.rose,
        featured: false
    },
    {
        id: "sala-reservas",
        title: "Sala Reservas",
        description: "Sistema de reserva de salas con gestión de horarios.",
        tech: ["JavaScript", "Backend", "API"],
        github: "https://github.com/bagxxi/sala-reservas",
        cover: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop",
        color: colors.teal,
        featured: false
    },
    {
        id: "realestate-api",
        title: "Real Estate API",
        description: "API para gestión de propiedades inmobiliarias.",
        tech: ["REST API", "Backend", "Database"],
        github: "https://github.com/bagxxi/realestate-api",
        cover: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=400&fit=crop",
        color: colors.emerald,
        featured: false
    }
];

// Skills Categories
export const skillCategories: SkillCategory[] = [
    {
        id: "frontend",
        name: "Frontend",
        icon: "💻",
        skills: [
            { name: "JavaScript", level: 5, color: "#f7df1e" },
            { name: "React", level: 4, color: "#61dafb" },
            { name: "HTML5", level: 5, color: "#e34f26" },
            { name: "CSS3", level: 5, color: "#1572b6" },
            { name: "Tailwind CSS", level: 4, color: "#06b6d4" },
            { name: "Astro", level: 3, color: "#ff5d01" },
            { name: "Svelte", level: 3, color: "#ff3e00" }
        ]
    },
    {
        id: "backend",
        name: "Backend",
        icon: "⚙️",
        skills: [
            { name: "Python", level: 4, color: "#3776ab" },
            { name: "Django", level: 4, color: "#092e20" },
            { name: "REST APIs", level: 4, color: "#7dcfff" },
            { name: "PostgreSQL", level: 3, color: "#4169e1" },
            { name: "Node.js", level: 3, color: "#339933" }
        ]
    },
    {
        id: "tools",
        name: "Herramientas",
        icon: "🛠️",
        skills: [
            { name: "Git", level: 5, color: "#f05032" },
            { name: "GitHub", level: 5, color: "#181717" },
            { name: "VS Code", level: 5, color: "#007acc" },
            { name: "GitHub Actions", level: 3, color: "#2088ff" },
            { name: "Bootstrap", level: 4, color: "#7952b3" },
            { name: "Jupyter", level: 3, color: "#f37626" }
        ]
    },
    {
        id: "data",
        name: "Análisis de Datos",
        icon: "📊",
        skills: [
            { name: "Pandas", level: 3, color: "#150458" },
            { name: "Data Analysis", level: 3, color: "#9ece6a" },
            { name: "Visualización", level: 3, color: "#bb9af7" }
        ]
    }
];

// Social Links for Contact
export const socialLinks = [
    { name: "GitHub", url: "https://github.com/bagxxi", icon: "github" },
    { name: "LinkedIn", url: "/linkedin", icon: "linkedin" },
    { name: "Email", url: "mailto:contacto@elgalo.dev", icon: "mail" }
];
