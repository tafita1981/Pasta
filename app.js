// app.js - Código principal da aplicação
document.addEventListener('DOMContentLoaded', () => {
  // Elementos da interface
  const mainContent = document.querySelector('main');
  const navLinks = document.querySelectorAll('.nav-item');
  const configButton = document.querySelector('.config-button');

  // Dados simulados da IA
  const sampleQuestions = [
    "Tell me about a challenging data analysis project you worked on recently.",
    "How do you handle missing data in a dataset?",
    "Explain a time you optimized a SQL query for better performance."
  ];

  const sampleAnswers = [
    "In my recent project at [Company], I implemented a machine learning pipeline that reduced processing time by 40% using Python and Spark.",
    "For missing data, I typically use a combination of interpolation and domain-specific imputation methods, carefully documenting all decisions.",
    "I optimized a complex JOIN operation by adding proper indexes and restructuring the query, reducing execution time from 15 minutes to under 30 seconds."
  ];

  // Função para mostrar a tela principal
  function showHomeScreen() {
    mainContent.innerHTML = `
      <p>
        O Copiloto de Entrevista usa IA para fornecer suporte em tempo real durante suas entrevistas. 
        Ele captura áudio, transcreve perguntas, analisa o contexto e fornece respostas personalizadas 
        baseadas no seu currículo de Data Analyst/Developer. Com suporte multilíngue e análise contextual avançada.
      </p>
      <button class="config-button">Configurar</button>
      <div class="demo-screen">
        <p class="demo-text">Entrevistador:</p>
        <p class="demo-question">${sampleQuestions[0]}</p>
        <p class="demo-response">Resposta Sugerida:</p>
        <p class="demo-answer">${sampleAnswers[0]}</p>
        <button class="new-question">Nova Pergunta</button>
      </div>
    `;

    // Adiciona evento para nova pergunta
    document.querySelector('.new-question')?.addEventListener('click', generateNewQuestion);
  }

  // Função para mostrar configurações
  function showSettings() {
    mainContent.innerHTML = `
      <div class="settings-screen">
        <h3>Configurações</h3>
        <div class="setting-item">
          <label>Idioma:</label>
          <select id="language">
            <option value="pt">Português</option>
            <option value="en">Inglês</option>
            <option value="es">Espanhol</option>
          </select>
        </div>
        <div class="setting-item">
          <label>Área de Atuação:</label>
          <select id="role">
            <option value="data-analyst">Data Analyst</option>
            <option value="developer">Developer</option>
            <option value="data-engineer">Data Engineer</option>
          </select>
        </div>
      </div>
    `;
  }

  // Gerar nova pergunta aleatória
  function generateNewQuestion() {
    const randomIndex = Math.floor(Math.random() * sampleQuestions.length);
    document.querySelector('.demo-question').textContent = sampleQuestions[randomIndex];
    document.querySelector('.demo-answer').textContent = sampleAnswers[randomIndex];
  }

  // Navegação entre telas
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target.closest('a').getAttribute('href');

      if (target === '/settings') {
        showSettings();
      } else {
        showHomeScreen();
      }
    });
  });

  // Evento do botão Configurar
  configButton?.addEventListener('click', () => {
    showSettings();
  });

  // Inicialização
  showHomeScreen();

  // Simular funcionalidade de IA
  let isListening = false;
  
  // Simular início/fim da entrevista
  document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('demo-question')) {
      if (!isListening) {
        console.log('Iniciando gravação...');
        isListening = true;
      } else {
        console.log('Parando gravação...');
        isListening = false;
      }
    }
  });

  // Service Worker para offline support
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registrado com sucesso:', registration);
        })
        .catch(error => {
          console.log('Falha no registro do ServiceWorker:', error);
        });
    });
  }
});