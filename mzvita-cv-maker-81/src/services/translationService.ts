
export const TITLES_PT = {
    header: 'Cabeçalho',
    about: 'PERFIL PROFISSIONAL',
    experience: 'EXPERIÊNCIA PROFISSIONAL',
    education: 'FORMAÇÃO ACADÉMICA',
    skills: 'HABILIDADES',
    languages: 'IDIOMAS',
    references: 'REFERÊNCIAS',
    contact: 'CONTACTO'
};

export const TITLES_EN = {
    header: 'Header',
    about: 'PROFESSIONAL PROFILE',
    experience: 'WORK EXPERIENCE',
    education: 'EDUCATION',
    skills: 'SKILLS',
    languages: 'LANGUAGES',
    references: 'REFERENCES',
    contact: 'CONTACT'
};

export const getTranslatedTitles = (lang: 'pt' | 'en') => {
    return lang === 'en' ? TITLES_EN : TITLES_PT;
};
