export const generateLetterText = (
    date: string,
    data: {
        nomeCompleto: string;
        cargoDesejado: string;
        nomeEmpresa: string;
        experienciaPrincipal: string;
        habilidadesPrincipais: string;
        motivacaoVaga: string;
    },
    tone: 'formal' | 'modern' | 'simple',
    experience: 'junior' | 'mid' | 'senior'
) => {
    const { cargoDesejado, nomeEmpresa, experienciaPrincipal, habilidadesPrincipais, motivacaoVaga } = data;

    if (tone === 'formal') {
        return `Prezados Senhores,

Venho por meio desta carta manifestar meu forte interesse na vaga de ${cargoDesejado} na ${nomeEmpresa}, conforme anunciado. Acompanho a trajetória da vossa organização com admiração e acredito que meu perfil técnico e comportamental está alinhado com os valores de excelência que vocês prezam.

${experience === 'junior'
                ? `Embora esteja em início de carreira, trago uma base sólida e recente em ${experienciaPrincipal}. Minha formação acadêmica e projetos práticos me prepararam com o rigor necessário para os desafios desta posição.`
                : `Com uma carreira consolidada em ${experienciaPrincipal}, desenvolvi uma expertise que me permite entregar resultados consistentes desde o primeiro dia. Minha atuação prévia em ambientes corporativos exigentes me conferiu a maturidade profissional que o cargo requer.`}

Possuo domínio em ${habilidadesPrincipais}, competências que considero fundamentais para manter o alto padrão de qualidade da ${nomeEmpresa}. ${motivacaoVaga}

Coloco-me à inteira disposição para uma entrevista, onde poderei detalhar como minhas qualificações podem contribuir para os objetivos estratégicos da vossa empresa.

Atenciosamente,`;
    }

    if (tone === 'modern') {
        return `Olá equipe da ${nomeEmpresa},

Estou muito entusiasmado em me candidatar à vaga de ${cargoDesejado}! Tenho acompanhado o trabalho inovador que vocês vêm desenvolvendo e seria incrível poder fazer parte dessa jornada.

${experience === 'junior'
                ? `Sou apaixonado por ${experienciaPrincipal} e tenho buscado aprender tudo sobre a área. Tenho muita energia, vontade de crescer e trago uma visão fresca, apoiada por minhas habilidades em ${habilidadesPrincipais}.`
                : `Nos últimos anos, tenho mergulhado fundo no universo de ${experienciaPrincipal}. Adoro resolver problemas complexos e trago na bagagem projetos onde apliquei ${habilidadesPrincipais} para criar soluções reais.`}

O que mais me atrai nesta oportunidade é ${motivacaoVaga}. Sinto que temos um "match" cultural e técnico.

Adoraria bater um papo para contar mais sobre minhas ideias e como podemos construir coisas legais juntos.

Um abraço,`;
    }

    // Simple / Direct
    return `Prezados Responsáveis,

Gostaria de me candidatar à vaga de ${cargoDesejado} na ${nomeEmpresa}.

${experience === 'junior'
            ? `Estou buscando minha oportunidade no mercado e tenho conhecimentos em ${experienciaPrincipal}. Sou uma pessoa dedicada, esforçada e com facilidade para aprender.`
            : `Tenho experiência prática trabalhando com ${experienciaPrincipal} e conheço bem as rotinas da função.`}

Minhas principais habilidades são: ${habilidadesPrincipais}. ${motivacaoVaga}

Agradeço a oportunidade e aguardo um contacto para entrevista.

Obrigado,`;
};
