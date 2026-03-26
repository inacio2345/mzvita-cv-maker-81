import React from 'react';

export interface BlogPostData {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
  featured: boolean;
  metaDescription?: string;
  content: string; // HTML/JSX string or component structure
}

export const blogPosts: BlogPostData[] = [
  // --- Novos Artigos: Primeiro Emprego ---
  {
    id: 101,
    slug: "primeira-entrevista-emprego",
    title: "O Guia Definitivo: Como se Vestir para uma Entrevista de Emprego em Moçambique",
    excerpt: "Não perca a vaga antes de abrir a boca. Descubra o código de vestimenta ideal para homens e mulheres no mercado corporativo moçambicano.",
    date: "2026-02-19",
    author: "Equipe MozVita",
    readTime: "12 min",
    category: "Primeiro Emprego",
    image: "/blog/primeira-entrevista.jpg",
    featured: false,
    metaDescription: "Guia completo de vestimenta para entrevistas em Moçambique. Saiba o que vestir para bancos, empresas e vagas informais. Dicas para homens e mulheres.",
    content: `
      <p class="lead">Dizem que a primeira impressão é a que fica. No mercado de trabalho moçambicano, onde a cultura corporativa ainda preza muito pela formalidade e respeito hierárquico, a sua imagem pode ser o fator decisivo entre conseguir o emprego ou ser descartado.</p>

      <h2>Por que a Aparência Importa Tanto em Moçambique?</h2>
      <p>Muitos jovens recém-graduados questionam: "Mas não deviam avaliar apenas a minha competência técnica?". Num mundo ideal, talvez. Mas na realidade das empresas em Maputo, Beira ou Nampula, a sua imagem comunica:</p>
      <ul>
        <li><strong>Respeito:</strong> Pela empresa e pelo entrevistador.</li>
        <li><strong>Atenção aos Detalhes:</strong> Se você não cuida da sua própria imagem, cuidará dos processos da empresa?</li>
        <li><strong>Adequação Cultural:</strong> A capacidade de entender e se adaptar às normas do ambiente.</li>
      </ul>
      <p>Em Moçambique, "apresentar-se bem" é visto como um sinal de boa educação (berço) e profissionalismo.</p>

      <h2>A Regra de Ouro: Na Dúvida, Seja Formal</h2>
      <p>Se você não tem certeza sobre o código de vestimenta da empresa (Dress Code), o erro deve ser sempre para o lado do excesso de formalidade. É muito melhor chegar de fato e gravata numa empresa informal do que chegar de calções numa empresa formal.</p>

      <div class="bg-blue-50 border-l-4 border-google-blue p-4 my-6">
        <p class="font-bold text-google-blue">Dica de Pro:</p>
        <p>Pesquise a empresa nas redes sociais (LinkedIn, Facebook) antes da entrevista. Veja as fotos dos eventos e reuniões deles. Como os funcionários se vestem? Tente imitar esse estilo, mas um nível acima.</p>
      </div>

      <h2>Guia Completo para Homens</h2>
      
      <h3>1. A Camisa</h3>
      <p>A camisa de manga comprida é a escolha mais segura. </p>
      <ul>
        <li><strong>Cores:</strong> Branca e Azul Clara são as campeãs. Transmitem limpeza, confiança e serenidade.</li>
        <li><strong>Ajuste:</strong> Nem muito larga (parecendo que herdou do irmão mais velho), nem muito apertada (os botões não podem estar a gritar).</li>
        <li><strong>Manga Curta?</strong> Evite, a menos que seja um trabalho muito operacional ou o calor esteja insuportável e o ambiente seja casual. Mesmo assim, a manga comprida dobrada é mais elegante.</li>
      </ul>

      <h3>2. As Calças</h3>
      <p>Calça social (de tecido) é obrigatória para vagas em Bancos, Seguradoras, Advocacia e grandes empresas.</p>
      <ul>
        <li><strong>Cores:</strong> Preta, Azul Marinho (Navy) ou Cinza Escuro.</li>
        <li><strong>Jeans (Calça de Ganga):</strong> Só use se tiver certeza absoluta que a empresa é casual (ex: agências de publicidade, startups de tecnologia, obras). E mesmo assim, que seja um jeans escuro, sem rasgos e sem lavagens manchadas.</li>
      </ul>

      <h3>3. Sapatos e Meias</h3>
      <p>Muitos candidatos "caem" aqui. Sapato social preto ou castanho.</p>
      <ul>
        <li><strong>Limpeza:</strong> Os sapatos devem estar engraxados. Sapatos empoeirados (comuns em nossas ruas de terra) dão má impressão. Leve um pano no bolso para limpar antes de entrar.</li>
        <li><strong>Meias:</strong> A regra clássica diz que a meia deve combinar com a calça ou com o sapato. Evite meias brancas desportivas com roupa social.</li>
      </ul>

      <h3>4. Gravata e Paletó?</h3>
      <p>Para vagas de gestão, atendimento bancário ou advocacia: <strong>Sim</strong>. Para outras vagas, uma boa camisa social bem passada é suficiente.</p>

      <h3>5. Cabelo e Barba</h3>
      <p>O estilo "Afro" e cortes modernos são cada vez mais aceites, mas devem estar cuidados. Se usa barba, mantenha-a aparada e desenhada. A aparência de "desleixo" é o inimigo, não o estilo do cabelo em si.</p>

      <h2>Guia Completo para Mulheres</h2>
      <p>Para as mulheres, as opções são mais variadas, o que pode gerar mais dúvidas.</p>

      <h3>1. O Conceito de "Business Casual"</h3>
      <p>O objetivo é estar elegante sem chamar atenção excessiva para o corpo.</p>
      <ul>
        <li><strong>Blazers:</strong> Uma peça chave. Transforma uma blusa simples num look executivo instantâneo.</li>
        <li><strong>Camisas e Blusas:</strong> Evite tecidos transparentes ou decotes muito profundos. Lembre-se que o ar condicionado dos escritórios costuma ser forte.</li>
      </ul>

      <h3>2. Saias e Vestidos</h3>
      <p>O comprimento ideal é na altura do joelho ou midi. Saias muito curtas podem ser mal interpretadas em ambientes conservadores.</p>

      <h3>3. Calças</h3>
      <p>Calças de alfaiataria (corte reto ou cigarrete) são perfeitas. Evite leggings ou calças muito justas que marcam excessivamente.</p>

      <h3>4. Sapatos</h3>
      <p>Sapatos fechados (scarpin, sapatilhas) são os ideais. Sandálias muito abertas ou "rasteirinhas" de praia devem ser evitadas. O salto não precisa ser alto – o conforto é essencial, pois você pode ter que esperar ou ficar em pé.</p>

      <h3>5. Maquiagem e Acessórios</h3>
      <p>A maquiagem "cara de saúde" é a melhor: base leve, rímel e um batom discreto.</p>
      <ul>
        <li><strong>Unhas:</strong> Limpas e, se pintadas, preferencialmente sem descascar. Cores neutras ou o clássico vermelho são seguros.</li>
        <li><strong>Perfume:</strong> Cuidado com perfumes muito doces ou fortes. Num escritório fechado, pode incomodar.</li>
      </ul>

      <h2>Erros Fatais: O Que NUNCA Usar</h2>
      <p>Independentemente da vaga, evite a todo custo:</p>
      <ol>
        <li><strong>Chinelos:</strong> Nunca. Nem Havaianas, nem slides.</li>
        <li><strong>Bonés e Chapéus:</strong> Devem ser retirados ao entrar no edifício.</li>
        <li><strong>Óculos Escuros:</strong> Tire-os do rosto e da cabeça durante a entrevista. O contato visual é fundamental.</li>
        <li><strong>Roupas de Balada:</strong> Brilhos excessivos, transparências ousadas ou roupas muito curtas.</li>
        <li><strong>Camisetas de Times de Futebol:</strong> Deixe a paixão pelo Mambas ou Maxaquene para o estádio.</li>
      </ol>

      <h2>O Fator Clima vs. Conforto</h2>
      <p>Em cidades como Tete ou Nampula, o calor é intenso. Em Maputo e Beira, a humidade é alta.</p>
      <p><strong>A Dica de Ouro:</strong> Não se vista totalmente em casa se vai apanhar chapa. Vá com uma roupa mais fresca e coloque o blazer ou a gravata apenas quando chegar perto do local da entrevista (num café ou casa de banho próxima). Chegar suado transmite nervosismo e desconforto.</p>

      <h2>Conclusão</h2>
      <p>A sua roupa é a "capa" do seu livro profissional. Ela não substitui o conteúdo (suas habilidades), mas convida o recrutador a querer ler o resto da história. Invista tempo a preparar a sua roupa na noite anterior, verifique se não há manchas ou botões faltando.</p>
      <p>Quando você se veste bem, você se sente mais confiante. E a confiança é a melhor roupa que você pode usar numa entrevista.</p>
      
      <div class="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200 text-center">
        <h3 class="text-xl font-bold text-gray-900 mb-2">Já tem a roupa, falta o CV?</h3>
        <p class="text-gray-600 mb-4">Um visual impecável precisa de um currículo à altura. Use nossos modelos profissionais.</p>
        <a href="/app" class="inline-block bg-google-blue text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">Criar Meu CV Agora</a>
      </div>
    `
  },
  {
    id: 102,
    slug: "modelos-cv-estagio",
    title: "5 Segredos para criar um CV de Estágio Irresistível (Mesmo sem Experiência)",
    excerpt: "Não ter experiência não é o fim do mundo. Aprenda a destacar sua formação, projetos acadêmicos e voluntariado para conseguir seu primeiro estágio em Moçambique.",
    date: "2026-02-19",
    author: "Equipe MozVita",
    readTime: "10 min",
    category: "Primeiro Emprego",
    image: "/blog/cv-estagio.jpg",
    featured: true,
    metaDescription: "Guia completo de CV para estágio em Moçambique. Baixe modelos e aprenda o que colocar no currículo quando não se tem experiência profissional.",
    content: `
      <p class="lead">É o clássico dilema do recém-graduado moçambicano: "Pedem experiência para ter o emprego, mas preciso do emprego para ter experiência". Como quebrar esse ciclo? A resposta está na forma como você vende o seu <strong>potencial</strong>.</p>

      <h2>O Erro Número 1: Deixar o CV em Branco</h2>
      <p>Muitos estudantes enviam currículos quase vazios, contendo apenas dados pessoais e a formação. Isso é um erro fatal. Se você não tem passado profissional, precisa vender o seu futuro.</p>

      <h2>O Que Colocar no Lugar da "Experiência Profissional"?</h2>
      <p>Aqui está o segredo que os recrutadores não contam: <strong>Tudo conta como experiência se for relevante para a vaga.</strong></p>

      <h3>1. Projetos Acadêmicos Relevantes</h3>
      <p>Aquele trabalho de investigação do 3º ano? A feira de ciências? O projeto final de curso? </p>
      <ul>
        <li><strong>Como listar:</strong> Crie uma seção chamada "Projetos Acadêmicos".</li>
        <li><strong>O que escrever:</strong> "Desenvolvimento de um Plano de Marketing para uma PME fictícia (Cadeira de Gestão). Responsável pela análise SWOT e orçamento."</li>
      </ul>

      <h3>2. Atividades Extracurriculares</h3>
      <p>Participou da Associação de Estudantes? Organizou o baile de finalistas? Foi chefe de turma?</p>
      <p>Isso demonstra <strong>Liderança</strong>, <strong>Organização</strong> e <strong>Capacidade de Mobilização</strong>. As empresas amam isso.</p>

      <h3>3. Voluntariado</h3>
      <p>Se você ajudou na igreja, na mesquita ou numa ONG local, isso deve estar no seu CV. (Temos um artigo inteiro só sobre isso!).</p>

      <h2>A Estrutura Vencedora para Estagiários</h2>
      <p>Use esta ordem para garantir que o recrutador vê o seu melhor primeiro:</p>
      <ol>
        <li><strong>Resumo Profissional (Objetivo):</strong> Curto e direto. "Estudante finalista de Contabilidade com forte domínio de Excel e Inglês, busca oportunidade de estágio para iniciar carreira na área financeira."</li>
        <li><strong>Formação Acadêmica:</strong> O destaque do seu CV. Inclua a média final se for superior a 14 valores. Cite 3 ou 4 cadeiras principais onde você teve as melhores notas.</li>
        <li><strong>Habilidades Técnicas (Hard Skills):</strong> O que você sabe fazer? Excel Avançado? Photoshop? PHC? Sabe preencher guias de imposto? Coloque aqui.</li>
        <li><strong>Projetos e Voluntariado:</strong> (Como explicado acima).</li>
        <li><strong>Idiomas:</strong> Essencial em Moçambique.</li>
      </ol>

      <h2>Soft Skills: O Seu Diferencial</h2>
      <p>Em estagiários, as empresas buscam atitude (Soft Skills) mais do que técnica. Destaque:</p>
      <ul>
        <li><strong>Vontade de Aprender:</strong> (Mostre que fez cursos online por conta própria).</li>
        <li><strong>Pontualidade e Assiduidade:</strong> (Mencione se teve 100% de presença nas aulas, por exemplo).</li>
        <li><strong>Proatividade:</strong> (Não espera ordens, busca soluções).</li>
      </ul>

      <h2>Modelos de CV Recomendados no MozVita</h2>
      <p>Não use aquele modelo Word antigo e desformatado. No nosso aplicativo, recomendamos:</p>
      <ul>
        <li><strong>Modelo "Cronológico Moderno":</strong> Limpo e foca na educação.</li>
        <li><strong>Modelo "Funcional":</strong> Ideal para esconder as lacunas de tempo e focar nas habilidades.</li>
      </ul>

      <h2>Dica Final: A Carta de Motivação</h2>
      <p>Para estagiários, a carta de motivação (Cover Letter) é quase obrigatória. É a sua chance de falar "humanamente" com o recrutador e explicar por que você ama aquela empresa.</p>

      <div class="mt-8 bg-green-50 p-6 rounded-xl border border-green-200">
        <h3 class="text-lg font-bold text-green-800">Pronto para começar?</h3>
        <p class="text-green-700 mb-4">Selecione o modelo "Estudante" no nosso criador de CV e preencha os campos. Nós formatamos tudo para você.</p>
        <a href="/app" class="font-bold text-green-900 underline">Criar CV de Estágio Grátis &rarr;</a>
      </div>
    `
  },
  {
    id: 103,
    slug: "pedir-emprego-email",
    title: "Como pedir emprego por email: Exemplo prático e Assuntos que Funcionam",
    excerpt: "O email é a nova carta de apresentação. Saiba o que escrever no assunto e no corpo para garantir que seu CV seja aberto pelo recrutador.",
    date: "2026-02-19",
    author: "Equipe MozVita",
    readTime: "8 min",
    category: "Primeiro Emprego",
    image: "/blog/email-emprego.jpg",
    featured: false,
    metaDescription: "Guia completo de emails para candidatura a vagas de emprego. Modelos de texto prontos para copiar.",
    content: `
      <p class="lead">Você sabia que 80% dos currículos enviados por email nunca são lidos? O motivo: Assuntos mal escritos ou emails sem texto. Aprenda a furar esse bloqueio.</p>

      <h2>O Primeiro Desafio: O Assunto do Email (Subject)</h2>
      <p>O "Assunto" é a primeira coisa que o Recrutador vê. Se for ruim, vai para o lixo (ou Spam).</p>
      
      <h3>Erros Comuns (NUNCA FAÇA ISSO):</h3>
      <ul>
        <li>"Curriculum Vitae" (Muito genérico)</li>
        <li>"Pedido de Emprego" (Desesperado)</li>
        <li>"CV Joana" (Quem é Joana?)</li>
        <li>(Assunto em branco) - Erro fatal.</li>
      </ul>

      <h3>A Fórmula Perfeita:</h3>
      <div class="bg-gray-100 p-3 rounded font-mono text-sm mb-4">
        [Nome da Vaga] - [Seu Nome Completo] - [Sua Principal Qualificação]
      </div>
      <p><strong>Exemplos Eficazes:</strong></p>
      <ul>
        <li>"Candidatura à Vaga de Contabilista - João Matusse - Licenciatura em Contabilidade"</li>
        <li>"Assistente Administrativo - Maria Silva - Disponibilidade Imediata"</li>
      </ul>

      <h2>O Segundo Desafio: O Corpo do Email</h2>
      <p>Muitos candidatos apenas anexam o PDF e enviam. Errado! O corpo do email é sua Carta de Apresentação curta.</p>
      <p>Deve ser curto, profissional e sem erros de português.</p>

      <div class="bg-blue-50 border border-blue-200 p-6 rounded-lg my-6">
        <h4 class="font-bold text-blue-800 mb-2">Modelo Pronto para Copiar:</h4>
        <p><strong>Assunto:</strong> Candidatura Vaga Recepcionista - Ana Paulo</p>
        <br/>
        <p>Prezado(a) Responsável pelo Recrutamento,</p>
        <p>Escrevo com entusiasmo para submeter a minha candidatura à vaga de <strong>Recepcionista</strong> conforme anunciado no [Nome do Site/Jornal].</p>
        <p>Sou recém-graduada em Relações Públicas e possuo excelente domínio da língua inglesa e de informática na óptica do utilizador. Durante meu estágio na [Empresa Anterior], desenvolvi fortes habilidades de atendimento ao cliente e organização de arquivos.</p>
        <p>Acredito que minha proatividade e simpatia seriam um ativo valioso para a recepção da vossa empresa.</p>
        <p>Anexo meu CV para vossa análise e coloco-me à disposição para uma entrevista.</p>
        <p>Atenciosamente,</p>
        <p><strong>Ana Paulo</strong><br>+258 84 123 4567<br>Link para LinkedIn (se tiver)</p>
      </div>

      <h2>O Terceiro Desafio: O Anexo do CV</h2>
      <p>Parece óbvio, mas muitos erram aqui.</p>
      <ol>
        <li><strong>Formato PDF:</strong> NUNCA envie em Word (.doc). O Word desformata em celulares ou computadores diferentes. O PDF é seguro.</li>
        <li><strong>Nome do Arquivo:</strong> Não chame o arquivo de "CV.pdf" ou "Documento1.pdf". Use: <code>CV_Nome_Sobrenome_Vaga.pdf</code>.</li>
        <li><strong>Tamanho:</strong> Garanta que o arquivo tenha menos de 2MB.</li>
      </ol>

      <h2>Dicas Extras de Etiqueta Profissional</h2>
      <ul>
        <li><strong>Endereço de Email:</strong> Use um email profissional (ex: <code>joao.matusse@gmail.com</code>). Evite <code>gatinha.linda@hotmail.com</code> ou <code>joaozinho_matador@gmail.com</code>.</li>
        <li><strong>Horário de Envio:</strong> Envie terça, quarta ou quinta-feira, entre 08h e 10h da manhã. É quando os RHs estão mais ativos. Evite sexta-feira à tarde ou fim de semana.</li>
      </ul>

      <div class="mt-8">
        <p>Precisa de um CV profissional em PDF para anexar? Use o MozVita CV Maker. É grátis e sai pronto em minutos.</p>
        <a href="/app" class="font-bold text-google-blue underline">Gerar meu CV em PDF agora</a>
      </div>
    `
  },
  {
    id: 104,
    slug: "trabalho-voluntario-experiencia",
    title: "Trabalho voluntário conta como experiência? A resposta é SIM!",
    excerpt: "Muitos jovens ignoram suas experiências na igreja ou comunidade. Descubra como transformar isso em um diferencial no CV.",
    date: "2026-02-19",
    author: "Equipe MozVita",
    readTime: "7 min",
    category: "Primeiro Emprego",
    image: "/blog/voluntariado.jpg",
    featured: false,
    metaDescription: "Saiba como incluir trabalho voluntário no seu currículo e impressionar recrutadores.",
    content: `
      <p class="lead">Você nunca teve carteira assinada, mas já organizou festas na igreja, liderou campanhas de limpeza no bairro ou ajudou na machamba da família. Adivinhe? Você TEM experiência.</p>

      <h2>O Que o Recrutador Realmente Procura?</h2>
      <p>Quando uma empresa pede "experiência", ela quer saber se você tem:</p>
      <ol>
        <li>Responsabilidade (aparecer na hora certa).</li>
        <li>Compromisso (terminar o que começou).</li>
        <li>Capacidade de trabalhar com outras pessoas.</li>
      </ol>
      <p>O trabalho voluntário prova tudo isso, às vezes até mais do que um emprego pago.</p>

      <h2>Exemplos de Voluntariado Valorizados em Moçambique</h2>
      
      <h3>1. Atividades Religiosas (Igreja/Mesquita)</h3>
      <p>Não tenha vergonha de colocar. Se você é tesoureiro da juventude, canta no coro ou organiza a logística dos cultos, você está exercendo <strong>Gestão de Pessoas</strong> e <strong>Contabilidade Básica</strong>.</p>
      
      <h3>2. Grupos Comunitários e Associações</h3>
      <p>Participar da Cruz Vermelha, Escuteiros ou grupos de limpeza de praia mostra <strong>Cidadania</strong> e <strong>Trabalho em Equipe</strong>.</p>

      <h3>3. Apoio Familiar (Machamba ou Negócio)</h3>
      <p>Muitos jovens ajudam na barraca dos pais ou na machamba. Isso é trabalho! Se você lida com clientes, trocos e fornecedores, você tem experiência em <strong>Vendas</strong> e <strong>Atendimento</strong>.</p>

      <h2>Como Colocar no Currículo (Exemplos Práticos)</h2>
      <p>Crie uma secção específica chamada <strong>"Experiência de Voluntariado e Comunitária"</strong>.</p>

      <div class="bg-gray-100 p-4 rounded-md my-4 shadow-sm border-l-4 border-green-500">
        <h4 class="font-bold">Exemplo 1: Líder de Grupo Juvenil</h4>
        <p><strong>Cargo:</strong> Coordenador de Atividades Juvenis</p>
        <p><strong>Organização:</strong> Paróquia de São José de Boroma</p>
        <p><strong>Período:</strong> 2023 - Presente</p>
        <p><strong>Principais Atividades:</strong></p>
        <ul class="list-disc pl-5 mt-2 text-sm">
          <li>Gestão de uma equipe de 15 voluntários para eventos semanais.</li>
          <li>Organização logística de retiros e conferências para 200 pessoas.</li>
          <li>Controle de caixa e relatórios financeiros mensais.</li>
        </ul>
      </div>

      <div class="bg-gray-100 p-4 rounded-md my-4 shadow-sm border-l-4 border-orange-500">
        <h4 class="font-bold">Exemplo 2: Ajuda no Negócio Familiar</h4>
        <p><strong>Cargo:</strong> Assistente de Vendas (Negócio Familiar)</p>
        <p><strong>Local:</strong> Mercearia Central da Matola</p>
        <p><strong>Principais Atividades:</strong></p>
        <ul class="list-disc pl-5 mt-2 text-sm">
          <li>Atendimento ao cliente e gestão de caixa.</li>
          <li>Controle de stock e reposição de produtos.</li>
          <li>Negociação com fornecedores de bebidas e frescos.</li>
        </ul>
      </div>

      <h2>Soft Skills que o Voluntariado Revela</h2>
      <ul>
        <li><strong>Empatia:</strong> Capacidade de entender o outro (essencial para atendimento).</li>
        <li><strong>Resiliência:</strong> Trabalhar com poucos recursos.</li>
        <li><strong>Liderança:</strong> Motivar pessoas que não estão a receber salário para trabalhar. Isso é a forma mais pura de liderança.</li>
      </ul>

      <h2>Conclusão</h2>
      <p>Não deixe seu CV vazio. O voluntariado é uma medalha de honra. Mostre-a com orgulho.</p>
    `
  },
  {
    id: 105,
    slug: "sites-emprego-mocambique",
    title: "Os 5 Melhores Sites para Achar o Primeiro Emprego em Moçambique",
    excerpt: "Pare de entregar CVs em papel. A maioria das vagas está na internet. Saiba onde procurar.",
    date: "2026-02-19",
    author: "Equipe MozVita",
    readTime: "8 min",
    category: "Primeiro Emprego",
    image: "/blog/sites-emprego.jpg",
    featured: false,
    metaDescription: "Lista dos melhores sites e portais de emprego em Moçambique para recém-graduados.",
    content: `
      <p class="lead">A era de imprimir 50 currículos e andar de "pata-em-pata" a entregar nas recepções acabou. Hoje, 90% das grandes empresas em Moçambique recrutam exclusivamente online.</p>

      <h2>Onde Estão as Vagas Escondidas?</h2>
      <p>Muitas vagas nunca chegam ao Jornal Notícias. Elas são preenchidas através de plataformas digitais. Se você não está lá, você não existe.</p>

      <h3>1. LinkedIn (O Indispensável)</h3>
      <p><strong>O que é:</strong> A maior rede social profissional do mundo.</p>
      <p><strong>Quem usa:</strong> Vodacom, MCEL, Bancos, Sasol, Mozal.</p>
      <p><strong>Dica de Ouro:</strong> Não basta criar conta. Preencha seu perfil todo, coloque uma foto profissional e siga as páginas de RH das empresas. Ative os alertas de vaga para "Maputo" ou "Moçambique".</p>

      <h3>2. Emprego.co.mz</h3>
      <p><strong>O que é:</strong> Talvez o portal mais antigo e respeitado de Moçambique.</p>
      <p><strong>Vantagem:</strong> Tem vagas verificadas e é muito fácil de usar. Muitas ONGs e embaixadas publicam aqui.</p>

      <h3>3. MMO Emprego (Sapo Moçambique)</h3>
      <p><strong>O que é:</strong> Um agregador gigante de oportunidades de emprego e concursos.</p>
      <p><strong>Vantagem:</strong> Traz vagas para todas as províncias, não apenas Maputo. Ótimo para vagas no setor público.</p>

      <h3>4. Contact e Elite (Agências de Recrutamento)</h3>
      <p>Grandes multinacionais contratam agências para fazer a triagem. Você deve cadastrar seu CV diretamente no site delas.</p>
      <ul>
        <li><strong>Contact:</strong> Muito forte em vagas administrativas e Call Center.</li>
        <li><strong>Elite:</strong> Focada em cargos de gestão e técnicos especializados.</li>
      </ul>

      <h3>5. Facebook (Com Muito Cuidado)</h3>
      <p>Grupos como "Vagas de Emprego em Moçambique" são populares, mas são um campo minado.</p>
      <div class="bg-red-50 border-l-4 border-red-500 p-4 my-4">
        <h4 class="font-bold text-red-700">⚠️ ALERTA DE BURLA</h4>
        <p>Se alguém pedir dinheiro para "processar o CV", "pagar o uniforme" ou "fazer uma entrevista", É BURLA. Nenhuma empresa séria cobra dinheiro ao candidato.</p>
      </div>

      <h2>E o Jornal Notícias?</h2>
      <p>Ainda é relevante, especialmente para concursos públicos e vagas no Estado. Vale a pena comprar à sexta-feira (o dia com mais classificados).</p>

      <h2>Estratégia de Busca Ativa</h2>
      <ol>
        <li>Tire 1 hora por dia (de manhã) para checar esses 5 sites.</li>
        <li>Adapte o seu CV para cada vaga (use as palavras-chave do anúncio).</li>
        <li>Envie o email conforme ensinamos no nosso outro artigo.</li>
      </ol>

      <div class="mt-8 text-center">
        <p class="text-xl font-bold">Precisa de um CV otimizado para essas plataformas?</p>
        <a href="/app" class="inline-block mt-4 bg-google-blue text-white py-2 px-6 rounded hover:bg-blue-700">Criar CV Online</a>
      </div>
    `
  },


  // --- Novos Artigos: Mercado de Trabalho ---
  {
    id: 106,
    slug: "profissoes-maiores-salarios",
    title: "As 7 Profissões com Maiores Salários em Moçambique em 2024",
    excerpt: "Quer ganhar bem? Descubra quais as áreas que pagam os melhores salários no mercado moçambicano atualmente.",
    date: "2026-02-19",
    author: "Equipe MozVita",
    readTime: "7 min",
    category: "Mercado de Trabalho",
    image: "/blog/salarios-altos.jpg",
    featured: true,
    metaDescription: "Ranking atualizado das profissões mais bem pagas em Moçambique. Descubra os salários em Banca, Petróleo, TI e Direito.",
    content: `
      <p class="lead">Todo mundo quer ganhar bem, mas em Moçambique, a disparidade salarial é enorme. Enquanto um licenciado pode ganhar 15.000 MT numa pequena empresa, o mesmo profissional pode ganhar 150.000 MT numa multinacional.</p>

      <h2>Onde Está o "Dinheiro Grande"?</h2>
      <p>Os maiores salários estão concentrados em setores de capital intensivo (Mineração, Gás) e serviços especializados (Banca, Seguros). Em 2024/2025, estas são as áreas de ouro:</p>

      <h3>1. Engenharia de Petróleo, Gás e Minas</h3>
      <p>Os megaprojetos em Cabo Delgado e Tete continuam a ser os reis dos salários.</p>
      <ul>
        <li><strong>Cargos:</strong> Engenheiro de Perfuração, Geólogo, Superintendente de Mina.</li>
        <li><strong>Salário Estimado:</strong> 150.000 a 400.000 MT/mês.</li>
        <li><strong>Onde:</strong> TotalEnergies, ExxonMobil, Vale (Vulcan), Kenmare.</li>
      </ul>

      <h3>2. Direção Financeira e Bancária</h3>
      <p>O setor financeiro paga prémios elevados por responsabilidade.</p>
      <ul>
        <li><strong>Cargos:</strong> Diretor Financeiro (CFO), Gestor de Tesouraria, Diretor de Risco.</li>
        <li><strong>Salário Estimado:</strong> 200.000 a 500.000 MT/mês + Bônus anuais.</li>
      </ul>

      <h3>3. Tecnologia da Informação (TI) e Cibersegurança</h3>
      <p>A escassez de talento local fez os salários dispararem. Bancos e Fintechs lutam por estes profissionais.</p>
      <ul>
        <li><strong>Cargos:</strong> Arquiteto de Software, DevOps, Especialista em Segurança da Informação.</li>
        <li><strong>Salário Estimado:</strong> 80.000 a 250.000 MT/mês.</li>
      </ul>

      <h3>4. Procurement e Logística (Supply Chain)</h3>
      <p>Quem consegue fazer a empresa poupar dinheiro e garantir que o material chega a tempo em Afungi vale ouro.</p>
      <ul>
        <li><strong>Cargos:</strong> Gestor de Cadeia de Suprimentos, Diretor de Compras.</li>
        <li><strong>Salário Estimado:</strong> 100.000 a 300.000 MT/mês.</li>
      </ul>

      <h3>5. Direito Corporativo</h3>
      <p>Não estamos a falar de advogados de tribunal, mas sim de consultoria para grandes fusões e contratos.</p>
      <ul>
        <li><strong>Salário Estimado:</strong> 150.000 MT a valores muito superiores (em grandes firmas como SAL & Caldeira, ABCC).</li>
      </ul>

      <h3>6. Medicina Especializada (Privada)</h3>
      <p>Cirurgiões, Anestesistas e Cardiologistas com consultório privado ou em hospitais de elite.</p>

      <h3>7. Aviação (Pilotos e Controladores)</h3>
      <p>Uma área técnica extremamente regulada e bem paga.</p>

      <h2>Não é Só o Salário Base</h2>
      <p>Nestas posições, os benefícios muitas vezes duplicam o valor real:</p>
      <ul>
        <li>Seguro de Saúde Internacional (incluindo evacuação para RSA).</li>
        <li>Subsídio de Carro e Combustível.</li>
        <li>Subsídio de Educação para os filhos.</li>
        <li>Bônus de Performance (pode chegar a 3 ou 4 salários extras).</li>
      </ul>

      <div class="mt-8 bg-yellow-50 p-6 rounded-xl border border-yellow-200">
        <h3 class="text-lg font-bold text-yellow-800">Quer Chegar Lá?</h3>
        <p class="text-yellow-900 mb-4">Essas vagas exigem CVs impecáveis e inglês fluente. Não perca oportunidades por causa de um currículo fraco.</p>
        <a href="/app" class="font-bold text-yellow-900 underline">Melhorar Meu CV Agora &rarr;</a>
      </div>
    `
  },
  {
    id: 107,
    slug: "futuro-trabalho-remoto",
    title: "O Futuro do Trabalho Remoto em Moçambique: Vale a pena?",
    excerpt: "Trabalhar de casa em Maputo ou Beira para empresas estrangeiras? Veja como essa tendência está a crescer.",
    date: "2026-02-19",
    author: "Equipe MozVita",
    readTime: "5 min",
    category: "Mercado de Trabalho",
    image: "/blog/trabalho-remoto.jpg",
    featured: false,
    metaDescription: "Guia completo para conseguir trabalho remoto em Moçambique. Receba em Dólares ou Euros via Payoneer/Wise.",
    content: `
      <p class="lead">Ganhar em Dólares e gastar em Meticais. Esse é o sonho de muitos jovens moçambicanos, e em 2025, é totalmente possível. A "fuga de cérebros" agora é digital: você não precisa emigrar para ganhar salários internacionais.</p>

      <h2>O Que é Preciso para Começar? (O Kit Básico)</h2>
      <p>Antes de procurar a vaga, garanta a infraestrutura. Sem isso, você será demitido na primeira semana.</p>
      <ol>
        <li><strong>Internet Redundante:</strong> Não confie apenas num provedor. Tenha fibra (TVCabo/Vodacom) e um router 4G de backup (Movitel costuma ser estável em bairros).</li>
        <li><strong>Energia (O Grande Vilão):</strong> A EDM falha. Você PRECISA de um mini-UPS para o router (custa ~2.000 MT) e um laptop com boa bateria. Se possível, um inversor.</li>
        <li><strong>Inglês:</strong> A língua universal do trabalho remoto. Se o seu inglês é "básico", invista tudo em melhorá-lo.</li>
      </ol>

      <h2>Melhores Áreas para Moçambicanos</h2>

      <h3>1. Tradução e Transcrição (PT <-> EN)</h3>
      <p>Muitas empresas precisam de falantes nativos de Português. Sites como Rev.com ou agências de tradução procuram freelancers.</p>

      <h3>2. Atendimento ao Cliente (Customer Support)</h3>
      <p>Empresas de SaaS (Software) contratam suporte global 24h. O fuso horário de Moçambique (GMT+2) é ótimo para cobrir o horário europeu.</p>

      <h3>3. Assistência Virtual</h3>
      <p>Gerir emails, marcar reuniões e fazer pesquisas para executivos ocupados na Europa ou EUA.</p>

      <h3>4. Programação e Design</h3>
      <p>A área mais óbvia. Se você sabe React, Python ou UI Design, o mundo é o seu escritório.</p>

      <h2>Como Receber o Pagamento?</h2>
      <p>O maior medo: "Como o dinheiro chega no meu BCI/Millennium?"</p>
      <ul>
        <li><strong>Payoneer:</strong> Cria uma conta bancária virtual nos EUA/Europa. Você recebe lá e transfere para o seu banco moçambicano.</li>
        <li><strong>Wise (ex-Transferwise):</strong> Taxas muito baixas.</li>
        <li><strong>Carteiras Digitais:</strong> PayPal (embora tenha limitações em Moçambique para receber).</li>
      </ul>

      <h2>Onde Achar Vagas?</h2>
      <ul>
        <li><strong>LinkedIn:</strong> Use o filtro "Remote" na busca de vagas.</li>
        <li><strong>Upwork / Fiverr:</strong> Para freelancers iniciantes.</li>
        <li><strong>WeWorkRemotely:</strong> Vagas de alta qualidade.</li>
      </ul>

      <div class="mt-8 bg-blue-50 p-6 rounded-xl text-center">
        <p class="mb-4">Seu CV precisa estar em <strong>Inglês</strong> e otimizado para sistemas internacionais (ATS).</p>
        <a href="/app" class="font-bold text-google-blue underline">Criar CV em Inglês &rarr;</a>
      </div>
    `
  },
  {
    id: 108,
    slug: "oportunidades-petroleo-gas",
    title: "Oportunidades no Setor de Petróleo e Gás (Além da Engenharia)",
    excerpt: "Você não precisa ser engenheiro para trabalhar nos megaprojetos. Há vagas para RH, contabilidade, cozinha e mais.",
    date: "2026-02-19",
    author: "Equipe MozVita",
    readTime: "6 min",
    category: "Mercado de Trabalho",
    image: "/blog/gas-oleo.jpg",
    featured: false,
    metaDescription: "Trabalhar em Petróleo e Gás sem ser engenheiro. Vagas em Logística, RH, Catering, Segurança (HST) e Saúde.",
    content: `
      <p class="lead">Quando se fala em "Gás de Cabo Delgado", todos pensam em engenheiros de capacete branco. Mas para cada engenheiro, existem 10 profissionais de suporte. A cidade-acampamento precisa funcionar.</p>

      <h2>Entendendo a "Vida de Acampamento"</h2>
      <p>Os projetos funcionam como ilhas isoladas. Tudo precisa ser gerido lá dentro: comida, limpeza, saúde, transporte, vistos, pagamentos.</p>

      <h3>1. Higiene, Saúde e Segurança no Trabalho (HST/HSE)</h3>
      <p><strong>A Área de Ouro.</strong> Ninguém entra num projeto de gás sem passar por um oficial de segurança.</p>
      <ul>
        <li><strong>O que faz:</strong> Garante que ninguém se magoa. Fiscaliza EPIs, dá palestras matinais (DDS).</li>
        <li><strong>Requisitos:</strong> Certificação NEBOSH IGC é o padrão ouro. Somas (Nacional) também ajuda.</li>
      </ul>

      <h3>2. Catering e Hotelaria (Camp Management)</h3>
      <p>Milhares de trabalhadores precisam comer 3x ao dia e ter quartos limpos.</p>
      <ul>
        <li><strong>Vagas:</strong> Chefs de Cozinha (Industrial), Gestores de Alojamento, Governantas.</li>
        <li><strong>Empresas:</strong> CIS, Tsebo, IFS.</li>
      </ul>

      <h3>3. Logística e Transporte</h3>
      <p>Mover contentores, máquinas gigantes e combustível.</p>
      <ul>
        <li><strong>Vagas:</strong> Oficiais de Logística, Motoristas de Pesados (com carta profissional e direção defensiva), Gestores de Armazém.</li>
      </ul>

      <h3>4. Recursos Humanos e Administração</h3>
      <p>A gestão de rotação (quem entra e quem sai do acampamento) é um pesadelo logístico que precisa de bons administradores.</p>
      <ul>
        <li><strong>Vagas:</strong> Oficiais de RH, Assistentes Administrativos, Gestores de Vistos e Imigração.</li>
      </ul>

      <h3>5. Oficiais de Ligação Comunitária (CLO)</h3>
      <p>A ponte entre a multinacional e as comunidades locais. Precisam falar as línguas locais (Macua, Maconde, Kimwani) e ter muita diplomacia.</p>

      <h2>Dica Final: Certificações</h2>
      <p>Neste setor, os "papéis" contam muito. Um curso de Primeiros Socorros, Direção Defensiva ou Combate a Incêndios pode vale mais que uma licenciatura genérica.</p>
    `
  },
  {
    id: 109,
    slug: "turismo-mocambique-2025",
    title: "O Renascimento do Turismo em 2025: Onde estão as vagas?",
    excerpt: "Com a isenção de vistos para muitos países, o turismo promete bombar. Saiba como se preparar.",
    date: "2026-02-19",
    author: "Equipe MozVita",
    readTime: "5 min",
    category: "Mercado de Trabalho",
    image: "/blog/turismo-2025.jpg",
    featured: false,
    metaDescription: "O turismo em Moçambique está de volta. Vagas em Resorts, Aviação e Gestão Hoteleira em 2025.",
    content: `
      <p class="lead">Depois de anos difíceis, o turismo moçambicano está a renascer com força total. A isenção de vistos para 29 países trouxe uma nova onda de visitantes, e os hotéis estão a contratar.</p>

      <h2>O Novo Mapa do Turismo</h2>
      <p>Não é só Maputo e Tofo. O foco agora é o turismo de experiência e luxo.</p>

      <h3>Áreas Quentes para Vagas</h3>
      <ul>
        <li><strong>Arquipélago de Bazaruto (Vilankulo):</strong> Resorts de luxo como Anantara e Kisawa procuram staff de nível internacional.</li>
        <li><strong>Ponta do Ouro e Maputo Especial:</strong> Com a estrada nova, o turismo de fim de semana explodiu.</li>
        <li><strong>Gorongosa:</strong> O turismo científico e de conservação precisa de guias e biólogos.</li>
      </ul>

      <h2>Perfis Mais Procurados</h2>

      <h3>1. Gestão Hoteleira (Lodge Managers)</h3>
      <p>Gerir um lodge no meio do mato exige ser um pouco de tudo: contabilista, mecânico e diplomata.</p>

      <h3>2. Guias Bilingues (Obrigatório)</h3>
      <p>Inglês é o básico. Se você fala <strong>Francês</strong>, <strong>Mandarin</strong> ou <strong>Italiano</strong>, você escolhe onde quer trabalhar. Os turistas adoram quem consegue explicar a cultura local na língua deles.</p>

      <h3>3. Instrutores de Atividades (Dive Masters)</h3>
      <p>O mergulho é um dos maiores atrativos de Moçambique. Certificações PADI abrem portas imediatas em Tofo e Pemba.</p>

      <h3>4. Chefs de Cozinha e Baristas</h3>
      <p>A gastronomia moçambicana (camarão, matapa) é um produto turístico. Chefs que sabem modernizar pratos locais são muito valorizados.</p>

      <h2>Como Conseguir a Vaga?</h2>
      <p>Enviar CV por email para um lodge em Inhambane raramente funciona (a internet deles é lenta e eles recebem milhares).</p>
      <div class="bg-orange-50 p-4 border-l-4 border-orange-500 my-4">
        <p><strong>A Dica de Ouro:</strong> Vá lá. Se você vive perto de uma zona turística, apresente-se pessoalmente na baixa temporada (Maio/Junho). Peça para falar com o gerente. A atitude conta 90% no turismo.</p>
      </div>
    `
  },
  {
    id: 110,
    slug: "ongs-mocambique-vagas",
    title: "ONGs em Moçambique: Como conseguir emprego no setor humanitário",
    excerpt: "Trabalhar em ONGs oferece bons salários e propósito. Veja como entrar em organizações como UNICEF, Save the Children e outras.",
    date: "2026-02-19",
    author: "Equipe MozVita",
    readTime: "6 min",
    category: "Mercado de Trabalho",
    image: "/blog/ongs-mocambique.jpg",
    featured: false,
    metaDescription: "Guia definitivo para construir carreira em ONGs e na ONU em Moçambique. Salários, requisitos e certificações.",
    content: `
      <p class="lead">Para muitos moçambicanos, trabalhar nas "Nações Unidas" é o auge do sucesso profissional. Salários em dólares, viagens e impacto social. Mas como se entra nesse mundo fechado?</p>

      <h2>Mito vs. Realidade</h2>
      <p><strong>Mito:</strong> Só entra quem tem "cunha".<br><strong>Realidade:</strong> O recrutamento internacional é auditado e extremamente burocrático. Se você não cumprir os requisitos do ToR (Termos de Referência), o sistema elimina-o automaticamente, mesmo que conheça o diretor.</p>

      <h2>As Competências Críticas (O que estudar?)</h2>
      <p>Não basta ser "formado em Serviço Social". Você precisa de hard skills de gestão de projetos.</p>

      <h3>1. Gestão de Projetos (PMD Pro)</h3>
      <p>Tire a certificação <strong>PMD Pro (Project Management for Development)</strong>. É o padrão mundial para ONGs. Mostra que você sabe gerir ciclo de projeto, quadro lógico e orçamento.</p>

      <h3>2. Monitoria e Avaliação (M&E)</h3>
      <p>As ONGs precisam provar aos doadores onde gastaram o dinheiro. O oficial de M&E é quem recolhe dados e faz relatórios. Se você gosta de Excel e Estatística, esta é sua porta de entrada.</p>

      <h3>3. Procurement e Finanças</h3>
      <p>As regras de compliance (conformidade) são rígidas (regras da USAID, UE, Banco Mundial). Especialistas em procurement que conhecem essas regras nunca ficam desempregados.</p>

      <h3>4. Grant Writing (Elaboração de Propostas)</h3>
      <p>Saber escrever um projeto para ganhar financiamento é uma habilidade rara e valiosíssima.</p>

      <h2>Onde procurar?</h2>
      <ul>
        <li><strong>UN Jobs / UN Careers:</strong> O portal oficial.</li>
        <li><strong>ReliefWeb:</strong> Vagas humanitárias globais.</li>
        <li><strong>Sites das Organizações:</strong> Visite as páginas de "Trabalhe Conosco" da World Vision, Save the Children, FGH, CCS, etc.</li>
      </ul>

      <div class="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-200">
        <h3 class="text-lg font-bold text-blue-800">Comece como Voluntário da ONU</h3>
        <p class="text-blue-900 mb-4">O programa <strong>UN Volunteers (UNV)</strong> é a melhor escola. Eles pagam um subsídio (que em Moçambique é equivalente a um bom salário junior) e você ganha experiência dentro do sistema.</p>
        <a href="https://www.unv.org/" target="_blank" class="font-bold text-blue-900 underline">Saiba mais sobre UNV &rarr;</a>
      </div>
    `
  },

  // --- Novos Artigos: Setores Específicos ---
  {
    id: 111,
    slug: "cv-banca-financas",
    title: "Como fazer um CV para Banca e Finanças (Millennium bim, BCI, Standard Bank)",
    excerpt: "O setor bancário é conservador e exigente. Veja como estruturar seu currículo para passar na triagem dos bancos.",
    date: "2026-02-19",
    author: "Equipe MozVita",
    readTime: "6 min",
    category: "Setores",
    image: "/blog/banca-financas.jpg",
    featured: false,
    metaDescription: "Como ser contratado pelo Millennium bim, BCI ou Standard Bank. Guia de CV para setor bancário e financeiro.",
    content: `
      <p class="lead">Trabalhar num banco é o sonho de estabilidade para muitos. Mas com milhares de candidatos para cada vaga de "Caixa" ou "Gestor de Conta", como se destacar?</p>

      <h2>O Perfil do Bancário Moderno</h2>
      <p>Esqueça a ideia de que banco é só contar dinheiro. Hoje, bancos são empresas de tecnologia e vendas.</p>

      <h3>O Que os Bancos Procuram?</h3>
      <ul>
        <li><strong>Integridade Absoluta:</strong> Você vai lidar com o dinheiro dos outros. Qualquer "mancha" no seu passado (registo criminal) elimina-o.</li>
        <li><strong>Vendas Agressivas:</strong> Hoje, todo funcionário bancário tem metas de venda (seguros, cartões, crédito). Se você não gosta de vender, o banco não é para você.</li>
        <li><strong>Atenção aos Detalhes:</strong> Um zero a mais ou a menos pode causar prejuízos milionários.</li>
      </ul>

      <h2>Como Estruturar o CV</h2>

      <h3>1. Resumo Profissional</h3>
      <p>Foque em resultados numéricos. Em vez de "Gerenciei contas", use "Gerenciei uma carteira de 200 clientes com volume total de 50 Milhões de Meticais".</p>

      <h3>2. Certificações (O Grande Diferencial)</h3>
      <p>Ter uma licenciatura em Economia ou Gestão é o básico. Para passar à frente, tenha:</p>
      <ul>
        <li><strong>Certificações Internacionais:</strong> ACCA (Contabilidade), CFA (Finanças).</li>
        <li><strong>Softwares Bancários:</strong> Conhecimento de T24, SAP ou Excel Avançado (VBA).</li>
      </ul>

      <h3>3. Estágio na Agência</h3>
      <p>Se nunca trabalhou, mencione estágios de verão ou trabalhos onde lidou com caixa e atendimento ao público.</p>

      <div class="mt-8 bg-gray-50 p-6 rounded-xl border-l-4 border-gray-800">
        <h3 class="text-lg font-bold text-gray-900">Modelo Recomendado</h3>
        <p class="text-gray-700 mb-4">Para bancos, use o nosso modelo <strong>"Corporativo Clean"</strong>. Sem cores fortes, fonte serifada clássica. Transmite seriedade.</p>
        <a href="/app" class="font-bold text-blue-900 underline">Ver Modelo Corporativo &rarr;</a>
      </div>
    `
  },
  {
    id: 112,
    slug: "cv-hotelaria-turismo",
    title: "CV para Hotelaria e Turismo: Destaque suas Línguas e Simpatia",
    excerpt: "Hotéis e resorts buscam personalidade. Saiba como mostrar que você tem o 'dom de servir' no seu currículo.",
    date: "2026-02-19",
    author: "Equipe MozVita",
    readTime: "5 min",
    category: "Setores",
    image: "/blog/hotelaria-cv.jpg",
    featured: false,
    metaDescription: "Dicas de CV para Hotelaria, Restaurantes e Turismo. Como destacar línguas e experiência prática.",
    content: `
      <p class="lead">A hospitalidade é uma arte. O recrutador de um Hotel 5 Estrelas não quer saber apenas onde você estudou, mas se você tem o "dom de servir".</p>

      <h2>Competências Chave para Hotelaria</h2>

      <h3>1. Idiomas (O Fator Eliminatório)</h3>
      <p>Em turismo, "Português Fluente" não é mérito, é obrigação. O seu CV deve ter uma secção de destaque para Línguas.</p>
      <ul>
        <li><strong>Inglês:</strong> Indispensável.</li>
        <li><strong>Outras Línguas:</strong> Francês, Espanhol, Mandarim, Italiano. Se fala, coloque no topo!</li>
      </ul>

      <h3>2. Disponibilidade e Flexibilidade</h3>
      <p>Hotéis não fecham. Mencione explicitamente no CV: <em>"Disponibilidade total para trabalhar em turnos, fins de semana e feriados"</em>. Isso brilha aos olhos do gerente de RH.</p>

      <h3>3. Aparência e Apresentação (A Foto no CV)</h3>
      <p>Na hotelaria, a imagem conta. Se optar por colocar foto no CV (o que é recomendado neste setor), use uma foto com roupa formal, cabelo arrumado e, mais importante: <strong>um sorriso genuíno</strong>.</p>

      <h2>Experiência Prática</h2>
      <p>Liste todas as experiências de atendimento, mesmo que informais:</p>
      <ul>
        <li>Organização de casamentos.</li>
        <li>Trabalho em restaurantes de familiares.</li>
        <li>Receção em eventos da igreja.</li>
      </ul>
    `
  },
  {
    id: 113,
    slug: "cv-construcao-civil",
    title: "CV para Construção Civil e Obras Públicas",
    excerpt: "De pedreiros a engenheiros civis: como fazer um currículo focado em projetos e obras.",
    date: "2026-02-19",
    author: "Equipe MozVita",
    readTime: "5 min",
    category: "Setores",
    image: "/blog/construcao-civil.jpg",
    featured: false,
    metaDescription: "Modelo de CV para Engenheiros Civis, Arquitetos e Técnicos de Construção em Moçambique.",
    content: `
      <p class="lead">Na construção, papel não constrói prédio. O seu currículo precisa mostrar obra feita, betão, ferro e projetos entregues.</p>

      <h2>O Portfólio de Obras</h2>
      <p>Em vez de apenas listar "Empresa X", liste as OBRAS em que participou.</p>
      <div class="bg-gray-100 p-4 font-mono text-sm mb-4">
        <p><strong>Fiscal de Obra | Construções do Índico</strong></p>
        <p><em>Obra: Reabilitação da Estrada N1 (Troço Inchope-Gorongosa)</em></p>
        <ul class="list-disc pl-4">
          <li>Supervisão de pavimentação de 50km.</li>
          <li>Gestão de equipe de 100 trabalhadores.</li>
          <li>Controle de qualidade do asfalto.</li>
        </ul>
      </div>

      <h2>Segurança no Trabalho (HST)</h2>
      <p>Nenhuma grande construtora contrata sem garantias de segurança. Destaque seus cursos de HST, noções de Primeiros Socorros e uso de EPIs.</p>

      <h2>Softwares (Para Engenheiros e Arquitetos)</h2>
      <p>Não diga apenas "Informatica na óptica do utilizador". Liste:</p>
      <ul>
        <li>AutoCAD (2D e 3D)</li>
        <li>MS Project (para cronogramas)</li>
        <li>Revit / BIM (muito valorizado hoje em dia)</li>
      </ul>

      <h2>Disponibilidade Geográfica</h2>
      <p>Obras acontecem onde o projeto está. Deixe claro se tem disponibilidade para viver em estaleiros em outras províncias (Tete, Cabo Delgado, Niassa).</p>
    `
  },
  {
    id: 114,
    slug: "cv-call-center",
    title: "CV para Call Center e Atendimento ao Cliente: O que colocar?",
    excerpt: "Uma das áreas que mais contrata jovens em Moçambique. Veja como provar que você tem paciência e boa dicção.",
    date: "2026-02-19",
    author: "Equipe MozVita",
    readTime: "4 min",
    category: "Setores",
    image: "/blog/call-center.jpg",
    featured: false,
    metaDescription: "Como passar na entrevista de Call Center da Vodacom, Movitel ou Bancos. Modelo de CV focado em comunicação.",
    content: `
      <p class="lead">Os Call Centers são a "primeira escola" de muitos jovens moçambicanos. É um trabalho duro, mas que ensina muito e paga acima do salário mínimo.</p>

      <h2>O Que o Recrutador Quer Ouvir?</h2>
      <p>A entrevista de call center foca na sua <strong>Voz</strong> e na sua <strong>Paciência</strong>.</p>

      <h3>Competências para Destacar no CV</h3>
      <ul>
        <li><strong>Comunicação Verbal Clara:</strong> Dicção perfeita, sem gírias.</li>
        <li><strong>Resiliência Emocional:</strong> Capacidade de ser insultado por um cliente e continuar sorrindo na voz.</li>
        <li><strong>Agilidade Informática:</strong> Você precisa falar e digitar ao mesmo tempo. Mencione sua velocidade de digitação.</li>
      </ul>

      <h2>A Experiência "Escondida"</h2>
      <p>Nunca trabalhou? Use experiências informais:</p>
      <ul>
        <li>"Fui responsável por fazer chamadas para convidar membros da igreja para eventos." (Mostra proatividade).</li>
        <li>"Ajudei na campanha de censo/recenseamento." (Mostra capacidade de lidar com público).</li>
      </ul>

      <h2>Disponibilidade de Horário</h2>
      <p>Call centers funcionam 24/7. Coloque no CV: <em>"Disponibilidade para turnos rotativos, incluindo noites e feriados".</em> Isso coloca você na frente de 80% dos candidatos que só querem horário de expediente.</p>

      <div class="mt-8">
        <p class="font-bold text-gray-800">Dica de Pro:</p>
        <p>Durante a entrevista (que pode ser por telefone), sorria enquanto fala. O sorriso "ouve-se" na voz e muda o tom da conversa.</p>
      </div>
    `
  },

  // --- Novos Artigos: Empreendedorismo ---
  {
    id: 115,
    slug: "legalizar-empresa-mocambique",
    title: "Como Legalizar sua Pequena Empresa em Moçambique (Passo a Passo)",
    excerpt: "NUIT, Alvará, BR: Entenda a burocracia de forma simples para formalizar seu negócio e evitar multas.",
    date: "2026-02-19",
    author: "Equipe MozVita",
    readTime: "8 min",
    category: "Empreendedorismo",
    image: "/blog/legalizar-empresa.jpg",
    featured: true,
    metaDescription: "Guia passo a passo para legalizar sua empresa em Moçambique: NUIT, Licença Simplificada e Custos.",
    content: `
      <p class="lead">"Para que vou pagar impostos se mal tenho lucro?". Essa é a mentalidade que mantém 80% dos negócios moçambicanos pequenos para sempre. Legalizar não é um custo, é o seu passaporte para o crescimento.</p>

      <h2>Por Que Sair da Informalidade?</h2>
      <ul>
        <li><strong>Acesso a Financiamento:</strong> Nenhum banco empresta dinheiro a quem não tem NUIT e Alvará.</li>
        <li><strong>Fornecer a Grandes Empresas:</strong> A Sasol, Mozal ou mesmo o Estado só compram de empresas com certidão de quitação das Finanças.</li>
        <li><strong>Evitar Multas:</strong> A fiscalização municipal pode fechar sua banca ou loja a qualquer momento.</li>
      </ul>

      <h2>O Passo a Passo Simplificado (Regime Simplificado)</h2>
      <p>Para pequenos negócios, o Governo criou facilidades.</p>

      <h3>1. Obter o NUIT (Número Único de Identificação Tributária)</h3>
      <p>Vá à repartição de finanças do seu bairro. Leve seu BI. É gratuito.</p>

      <h3>2. Reserva de Nome</h3>
      <p>Na Conservatória do Registo de Entidades Legais (CREL). Verifica se o nome da sua empresa (ex: "Oficina do João") já existe.</p>

      <h3>3. Licenciamento Simplificado (Mero Expediente)</h3>
      <p>Para comércios de bairro, salões, oficinas, você não precisa de escrituras complexas no notário. Basta ir ao <strong>Balcão de Atendimento Único (BAU)</strong>.</p>
      <ul>
        <li>Custo estimado: Entre 3.000 a 6.000 MT (varia com o setor).</li>
        <li>Tempo: Em teoria, sai no mesmo dia ou em 48h.</li>
      </ul>

      <h3>4. Início de Atividade nas Finanças e INSS</h3>
      <p>Depois de ter o alvará, volte às Finanças para declarar o início de atividade (Modelo 6). E não esqueça de inscrever seus trabalhadores no INSS (Segurança Social). É lei.</p>

      <div class="mt-8 bg-green-50 p-6 rounded-xl border border-green-200">
        <h3 class="text-lg font-bold text-green-800">Dica: O Regime do ISPC</h3>
        <p class="text-green-900 mb-4">Pequenas empresas podem optar pelo <strong>ISPC (Imposto Simplificado para Pequenos Contribuintes)</strong>. Você paga uma taxa fixa trimestral (ex: 75.000 MT de faturação anual paga muito pouco de imposto) e livra-se da contabilidade complexa e do IVA.</p>
      </div>
    `
  },
  {
    id: 116,
    slug: "ideias-negocio-baixo-custo",
    title: "5 Ideias de Negócios para começar com menos de 10.000 MT",
    excerpt: "Não tem capital? Comece pequeno. Ideias práticas para gerar renda extra hoje mesmo.",
    date: "2026-02-19",
    author: "Equipe MozVita",
    readTime: "6 min",
    category: "Empreendedorismo",
    image: "/blog/negocio-barato.jpg",
    featured: false,
    metaDescription: "Comece seu negócio hoje com menos de 10.000 Meticais. Ideias lucrativas: Comida, Limpeza e Beleza.",
    content: `
      <p class="lead">"Não tenho capital". Essa é a desculpa mais comum. Mas grandes impérios em Moçambique começaram com uma banca no Xipamanine ou vendendo bolos de porta em porta.</p>

      <h2>Regra de Ouro: Venda Serviço, Não Produto</h2>
      <p>Se você tem pouco dinheiro, evite negócios que exigem comprar muito stock (roupas, eletrônicos). Venda o seu TEMPO e HABILIDADE.</p>

      <h3>1. Marmitas e Lanches para Escritórios (Cozinha Fantasma)</h3>
      <p>Os trabalhadores da baixa de Maputo ou Beira não têm onde comer comida caseira e barata.</p>
      <ul>
        <li><strong>Investimento:</strong> Ingredientes do dia (~2.000 MT) + Embalagens.</li>
        <li><strong>Lucro:</strong> Margem de 100% é comum em comida.</li>
        <li><strong>Marketing:</strong> WhatsApp e visita presencial aos escritórios.</li>
      </ul>

      <h3>2. Limpeza de Sofás e Colchões a Seco</h3>
      <p>Com o pó das nossas cidades, sofás sujam muito rápido.</p>
      <ul>
        <li><strong>Investimento:</strong> Aspirador de pó e água (alguns custam 5.000 MT usados na OLX/Facebook) + Produtos químicos básicos.</li>
        <li><strong>Preço do Serviço:</strong> 1.500 a 2.500 MT por sofá. Recupera o investimento em 3 clientes.</li>
      </ul>

      <h3>3. Personal Stylist / Compras no Fardo</h3>
      <p>Muita gente gosta de roupa de fardo (calamidade) mas tem nojo ou preguiça de ir "garimpar" no mercado.</p>
      <ul>
        <li><strong>O Serviço:</strong> Você vai ao Xipamanine, escolhe as melhores peças de marca, lava, passa e vende ao cliente final por 3x o preço.</li>
      </ul>

      <h3>4. Agente imobiliário de Bairro</h3>
      <p>Conecte quem quer alugar "dependências" com quem tem casas vazias.</p>
      <ul>
        <li><strong>Investimento:</strong> Crédito para chamadas e sapatilha para andar.</li>
        <li><strong>Comissão:</strong> Geralmente 50% ou 100% do primeiro aluguel.</li>
      </ul>

      <h3>5. Gestão de Redes Sociais para PMEs</h3>
      <p>A padaria do seu bairro tem Facebook? A oficina mecânica tem Instagram?</p>
      <ul>
        <li><strong>O Serviço:</strong> Ofereça tirar fotos, responder mensagens e postar 3x por semana.</li>
        <li><strong>Preço:</strong> 3.000 a 5.000 MT/mês por cliente. Com 5 clientes, você ganha mais que um gerente de banco júnior.</li>
      </ul>
    `
  },
  {
    id: 117,
    slug: "marketing-digital-whatsapp",
    title: "Marketing no WhatsApp: Como vender mais usando o Status e Grupos",
    excerpt: "O WhatsApp é a maior ferramenta de vendas em Moçambique. Aprenda a usar o WhatsApp Business profissionalmente.",
    date: "2026-02-19",
    author: "Equipe MozVita",
    readTime: "5 min",
    category: "Empreendedorismo",
    image: "/blog/whatsapp-marketing.jpg",
    featured: false,
    metaDescription: "Como usar o WhatsApp Business para vender mais em Moçambique. Catálogos, Etiquetas e Listas de Transmissão.",
    content: `
      <p class="lead">Esqueça o Website (por agora). Em Moçambique, o comércio acontece no WhatsApp. Se você não sabe vender por lá, a sua loja está "fechada".</p>

      <h2>WhatsApp Messenger vs. WhatsApp Business</h2>
      <p>Pare de usar o seu número pessoal. O <strong>WhatsApp Business</strong> é grátis e tem ferramentas poderosas:</p>
      <ul>
        <li><strong>Perfil Comercial:</strong> Morada, horário, email e site.</li>
        <li><strong>Catálogo:</strong> O cliente vê seus produtos e preços sem precisar perguntar "quanto custa?".</li>
        <li><strong>Mensagens Automáticas:</strong> "Olá, bem vindo à Loja X. Nosso horário é das 8h às 17h".</li>
      </ul>

      <h2>A Estratégia dos "Estados" (Status)</h2>
      <p>O moçambicano adora ver Estados. É a TV do povo.</p>
      <ul>
        <li><strong>Frequência:</strong> Poste pelo menos 5 a 10 estados por dia. Mantenha sua bolinha sempre no topo da lista dos clientes.</li>
        <li><strong>Conteúdo:</strong> Não poste só fotos de produtos. Mostre bastidores, clientes satisfeitos, como usar o produto. Crie desejo.</li>
      </ul>

      <h2>O Segredo: Listas de Transmissão (Não Grupos!)</h2>
      <p>Grupos são chatos. As pessoas saem ou silenciam.</p>
      <p><strong>A Solução:</strong> Use Listas de Transmissão.</p>
      <ol>
        <li>Peça ao cliente para salvar o SEU número (isso é obrigatório).</li>
        <li>Crie uma lista (ex: "Clientes VIP").</li>
        <li>Envie uma mensagem e ela chega individualmente para cada um, como se fosse uma conversa pessoal.</li>
      </ol>

      <div class="mt-8 border-l-4 border-green-600 pl-4">
        <p class="font-bold">Roteiro de Venda Rápida:</p>
        <p class="italic">"Olá [Nome], chegaram novidades! Como você comprou [Produto Anterior] mês passado, pensei que ia gostar disto. Veja a foto 👇"</p>
      </div>
    `
  },
  {
    id: 118,
    slug: "gestao-financeira-basica",
    title: "Gestão Financeira para Empreendedores: O Erro do 'Bolso Único'",
    excerpt: "Misturar o dinheiro da empresa com o dinheiro de casa é o que falhe a maioria dos negócios. Aprenda a separar.",
    date: "2026-02-19",
    author: "Equipe MozVita",
    readTime: "6 min",
    category: "Empreendedorismo",
    image: "/blog/financas-basicas.jpg",
    featured: false,
    metaDescription: "Aprenda a separar o dinheiro da empresa do dinheiro pessoal. Dicas de gestão de fluxo de caixa para iniciantes.",
    content: `
      <p class="lead">Este é o motivo #1 da falência de pequenas empresas em Moçambique: a Síndrome do Bolso Único. O dono acha que o dinheiro da caixa é dele.</p>

      <h2>A Regra Sagrada: Separação de Entidades</h2>
      <p>A "Maria Pessoa" e a "Maria Cabeleireira (Empresa)" são pessoas diferentes. Elas não podem partilhar a mesma carteira.</p>

      <h3>O Erro Clássico</h3>
      <p>Você vende um bolo por 1.000 MT. Pega 200 MT para comprar crédito, 300 MT para o jantar e sobram 500 MT. No dia seguinte, não tem dinheiro para comprar farinha.</p>

      <h2>Como Resolver (Método Prático)</h2>

      <h3>1. Defina um Salário (Pró-Labore)</h3>
      <p>Não pegue dinheiro "conforme precisa". Estabeleça um dia de pagamento. Ex: Dia 30, você tira 10.000 MT de salário. O resto do lucro FICA na empresa.</p>

      <h3>2. Duas Contas M-Pesa</h3>
      <p>Não precisa de conta bancária no início. Tenha dois chips:</p>
      <ul>
        <li><strong>Pessoal (84 xxx):</strong> Para suas despesas.</li>
        <li><strong>Empresarial (85 xxx):</strong> Onde os clientes pagam. Você NUNCA gasta deste saldo para coisas pessoais.</li>
      </ul>

      <h3>3. O Caderno de Caixa (Fluxo de Caixa)</h3>
      <p>Anote tudo. Absolutamente tudo.</p>
      <table class="w-full text-sm border-collapse border border-gray-300 my-4">
        <tr class="bg-gray-100">
          <th class="border p-2">Data</th>
          <th class="border p-2">Descrição</th>
          <th class="border p-2">Entrada</th>
          <th class="border p-2">Saída</th>
          <th class="border p-2">Saldo</th>
        </tr>
        <tr>
          <td class="border p-2">01/Fev</td>
          <td class="border p-2">Venda 2 camisas</td>
          <td class="border p-2 text-green-600">+2.000</td>
          <td class="border p-2"></td>
          <td class="border p-2">2.000</td>
        </tr>
        <tr>
          <td class="border p-2">02/Fev</td>
          <td class="border p-2">Compra Tecido</td>
          <td class="border p-2"></td>
          <td class="border p-2 text-red-600">-1.500</td>
          <td class="border p-2 font-bold">500</td>
        </tr>
      </table>
    `
  },
  {
    id: 119,
    slug: "mulheres-empreendedorismo",
    title: "Mulheres no Empreendedorismo Moçambicano: Desafios e Sucesso",
    excerpt: "Histórias inspiradoras e dicas específicas para mulheres que querem abrir seu próprio negócio.",
    date: "2026-02-19",
    author: "Equipe MozVita",
    readTime: "6 min",
    category: "Empreendedorismo",
    image: "/blog/mulheres-negocios.jpg",
    featured: true,
    metaDescription: "Dicas para mulheres empreendedoras em Moçambique. Como superar desafios e encontrar redes de apoio (networking).",
    content: `
      <p class="lead">As mulheres moçambicanas são empreendedoras por natureza. Elas sustentam mercados informais inteiros. Mas como saltar da banca do mercado para a gestão de uma grande empresa?</p>

      <h2>Os Desafios Únicos</h2>
      <ul>
        <li><strong>Dupla Jornada:</strong> Cuidar da casa/filhos e do negócio.</li>
        <li><strong>Acesso ao Crédito:</strong> Tradicionalmente, bancos exigem garantias (terrenos, casas) que muitas vezes estão em nome dos maridos.</li>
      </ul>

      <h2>A Vantagem Feminina</h2>
      <p>Estudos mostram que mulheres são melhores pagadoras e gerem riscos com mais cautela. Bancos e ONGs sabem disso.</p>

      <h3>Onde Buscar Apoio?</h3>
      <p>Existem programas específicos para financiar mulheres em Moçambique:</p>
      <ul>
        <li><strong>Muva (MUVA Tech, MUVA Assist):</strong> Programas de empoderamento econômico.</li>
        <li><strong>Linhas de Crédito Femininas:</strong> Bancos como BCI e Standard Bank têm linhas com juros bonificados para "Mulheres Empreendedoras". Pergunte ao seu gestor.</li>
        <li><strong>ANJE (Associação Nacional de Jovens Empresários):</strong> Tem núcleos fortes de liderança feminina.</li>
      </ul>

      <h2>Sororidade nos Negócios (Mulheres compram de Mulheres)</h2>
      <p>Use isso a seu favor. Crie parcerias com outras empresárias.</p>
      <p><em>Exemplo: Você faz bolos? Faça parceria com a decoradora de festas. Uma indica a outra.</em></p>

      <div class="mt-8 text-center bg-pink-50 p-6 rounded-xl border border-pink-200">
        <h3 class="text-lg font-bold text-pink-800">Você Merece Brilhar</h3>
        <p class="text-pink-900 mb-4">O primeiro passo para o sucesso é acreditar que o lugar da mulher é ONDE ELA QUISER (inclusive na cadeira de CEO).</p>
      </div>
    `
  },

  // --- Novos Artigos: Dicas de Carreira ---
  {
    id: 120,
    slug: "pedir-aumento-salario",
    title: "Como pedir aumento de salário sem medo (e conseguir)",
    excerpt: "Não peça aumento porque 'precisa'. Peça porque 'merece'. Veja como preparar argumentos irrefutáveis.",
    date: "2026-02-19",
    author: "Equipe MozVita",
    readTime: "5 min",
    category: "Dicas de Carreira",
    image: "/blog/pedir-aumento.jpg",
    featured: false,
    metaDescription: "Guia prático para negociar salário em Moçambique. O que dizer e o que não dizer ao seu chefe.",
    content: `
      <p class="lead">Pedir aumento é tabu. Temos medo de parecer ingratos ou ambiciosos demais. Mas a inflação não espera. Se você entregou resultados, merece ser recompensado.</p>

      <h2>O Momento Certo (Timing é Tudo)</h2>
      <p>Não peça aumento na segunda-feira de manhã ou quando a empresa acabou de perder um cliente.</p>
      <ul>
        <li><strong>Melhor Momento:</strong> Logo após você entregar um grande projeto ou receber um elogio formal.</li>
        <li><strong>Época do Ano:</strong> Antes de fechar o orçamento anual (Geralmente Outubro/Novembro em grandes empresas).</li>
      </ul>

      <h2>A Preparação (O Dossiê de Evidências)</h2>
      <p>Não entre na sala de mãos a abanar. Leve um papel com:</p>
      <ol>
        <li><strong>Resultados Quantitativos:</strong> "Aumentei as vendas em 15%". "Reduzi os custos de papel em 20%".</li>
        <li><strong>Novas Responsabilidades:</strong> Liste o que você faz hoje que NÃO estava na sua descrição de funções original.</li>
        <li><strong>Pesquisa Salarial:</strong> "Empresas do setor pagam X para esta função". (Seja realista).</li>
      </ol>

      <h2>O Que Dizer (Script)</h2>
      <div class="bg-gray-100 p-4 border-l-4 border-blue-500 my-4 italic">
        "Chefe, nos últimos 12 meses, assumi a liderança do projeto X e os resultados foram Y. Gosto muito de trabalhar aqui, mas sinto que o meu salário atual não reflete mais o nível de responsabilidade que tenho. Gostaria de propor um ajuste para [Valor]."
      </div>

      <h2>E se a resposta for NÃO?</h2>
      <p>Não ameace sair (a menos que tenha outra proposta na mão). Pergunte:</p>
      <p><em>"Compreendo. O que precisaria acontecer nos próximos 6 meses para que esse aumento fosse possível?"</em></p>
      <p>Saia da reunião com metas claras.</p>
    `
  },
  {
    id: 121,
    slug: "networking-maputo",
    title: "Networking em Maputo: Onde ir e como se conectar",
    excerpt: "Em Moçambique, o 'quem indica' conta muito. Saiba como expandir sua rede de contactos profissionais.",
    date: "2026-02-19",
    author: "Equipe MozVita",
    readTime: "4 min",
    category: "Dicas de Carreira",
    image: "/blog/networking-maputo.jpg",
    featured: false,
    metaDescription: "Os melhores eventos e lugares para fazer networking profissional em Maputo e criar conexões de valor.",
    content: `
      <p class="lead">Dizem que "Maputo é um ovo". Todo mundo conhece todo mundo. Isso pode ser bom ou mau. Profissionalmente, é uma mina de ouro se você souber navegar.</p>

      <h2>Networking Não é Pedir Emprego</h2>
      <p>O maior erro dos jovens é adicionar um Diretor no LinkedIn e mandar logo o CV no inbox. Isso é chato e ineficaz.</p>
      <p><strong>Networking é:</strong> Criar relações ANTES de precisar delas.</p>

      <h2>Onde "Acontecem" as Coisas em Maputo?</h2>
      
      <h3>1. Eventos Corporativos</h3>
      <ul>
        <li><strong>FACIM:</strong> Não vá só para passear. Leve cartões de visita. Fale com os expositores.</li>
        <li><strong>MozTech:</strong> O ponto de encontro da tecnologia.</li>
        <li><strong>Feiras de Emprego:</strong> Da UEM ou ISCTEM.</li>
      </ul>

      <h3>2. Lugares Informais (After-Work)</h3>
      <p>Muitos negócios fecham-se em cafés e happy hours na zona da Polana ou Baixa.</p>
      <ul>
        <li><strong>Cafés de Negócios:</strong> Acacia, Southern Sun. Se você trabalha remoto, vá trabalhar lá de vez em quando. Você nunca sabe quem está na mesa ao lado.</li>
      </ul>

      <h3>3. LinkedIn (O Networking Digital)</h3>
      <p>Comente nas publicações de pessoas que admira. Faça perguntas inteligentes. Seja visível.</p>

      <h2>A Regra dos 30 Segundos (Elevator Pitch)</h2>
      <p>Se encontrar o CEO da empresa dos seus sonhos, o que você diz?</p>
      <p><em>"Olá, sou o Paulo, sou especialista em Marketing Digital e ajudo empresas a venderem mais no Facebook."</em></p>
      <p>Curto. Claro. Interessante.</p>
    `
  },
  {
    id: 122,
    slug: "equilibrio-vida-trabalho",
    title: "Equilíbrio Vida Pessoal e Trabalho: Evitando o Burnout",
    excerpt: "Trabalhar muito é bom, adoecer por trabalho não. Sinais de que você está no limite e como colocar limites.",
    date: "2026-02-19",
    author: "Equipe MozVita",
    readTime: "5 min",
    category: "Dicas de Carreira",
    image: "/blog/burnout-prevencao.jpg",
    featured: false,
    metaDescription: "Sinais de Burnout e como evitar o esgotamento profissional. Dicas de saúde mental no trabalho.",
    content: `
      <p class="lead">"Vou dormir quando morrer". Essa frase pode levar você ao hospital antes do tempo. O excesso de trabalho (Burnout) já é considerado doença ocupacional.</p>

      <h2>Sinais de que Você Está a "Queimar"</h2>
      <ul>
        <li><strong>Domingo à noite é um pesadelo:</strong> Você sente ansiedade física só de pensar na segunda-feira.</li>
        <li><strong>Cinismo:</strong> Começa a achar que o trabalho não serve para nada e trata mal colegas ou clientes.</li>
        <li><strong>Fadiga Crônica:</strong> Dorme 10 horas e acorda cansado.</li>
      </ul>

      <h2>Estratégias de Proteção Mental</h2>

      <h3>1. Aprenda a Dizer NÃO</h3>
      <p>Se já está cheio de trabalho e o chefe pede mais, diga: <em>"Posso fazer isso, mas terei de adiar a entrega do projeto Y. Qual é a prioridade?"</em>.</p>

      <h3>2. Desconexão Radical</h3>
      <p>Não tenha o email da empresa no celular se não for obrigado. Silencie grupos de WhatsApp do trabalho depois das 18h.</p>

      <h3>3. Férias são Sagradas</h3>
      <p>Não venda os seus dias. Viaje, vá à praia, fique em casa a ver Netflix. Mas <strong>desligue</strong> o cérebro do modo "produtividade".</p>

      <div class="mt-8 bg-red-50 p-6 rounded-xl border border-red-200">
        <h3 class="text-lg font-bold text-red-800">Ajuda Profissional</h3>
        <p class="text-red-900 mb-4">Se estiver a sentir sintomas de depressão ou ansiedade severa, procure um psicólogo. Não é frescura, é saúde.</p>
      </div>
    `
  },
  {
    id: 12,
    slug: "soft-skills-mocambique",
    title: "As 5 Competências (Soft Skills) que Garantem Emprego",
    excerpt: "Inteligência emocional, comunicação e adaptabilidade: saiba quais são as habilidades comportamentais mais procuradas pelos recrutadores em 2025.",
    date: "2026-02-18",
    author: "Equipe MozVita",
    readTime: "6 min",
    category: "Dicas de Carreira",
    image: "/blog/soft-skills-moz.jpg",
    featured: true,
    metaDescription: "Saiba quais são as soft skills mais valorizadas em Moçambique e como desenvolvê-las.",
    content: `
      <!-- Conteúdo migrado de SoftSkillsMoz.tsx seria inserido aqui -->
      <p>O mercado de trabalho mudou. Hoje, as empresas contratam pelo currículo técnico (Hard Skills), mas demitem pelo comportamento (Soft Skills). Em Moçambique, num mercado saturado de licenciados, quem tem boas competências comportamentais destaca-se.</p>
      <!-- ... (restante do conteúdo simplificado para este exemplo) -->
    `
  },
  {
    id: 13,
    slug: "linkedin-mocambique",
    title: "LinkedIn Moçambique: Como Ser Recrutado Sem Enviar CV",
    excerpt: "Transforme seu perfil do LinkedIn em um ímã de recrutadores. Dicas de foto, título e networking estratégico.",
    date: "2026-02-18",
    author: "Equipe MozVita",
    readTime: "9 min",
    category: "Dicas de Carreira",
    image: "/blog/linkedin-moz.jpg",
    featured: true,
    metaDescription: "Guia completo para usar o LinkedIn em Moçambique e conseguir emprego.",
    content: `
      <!-- Conteúdo migrado -->
      <p>O LinkedIn não é apenas um CV online. É sua reputação digital 24 horas por dia. Em Moçambique, recrutadores de grandes empresas (banca, petróleos, telecomunicações) usam a plataforma diariamente para caçar talentos.</p>
    `
  },
  // Mais artigos existentes seriam adicionados aqui...
];
