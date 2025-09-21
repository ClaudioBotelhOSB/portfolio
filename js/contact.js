const processStepsData = [
    { step: 1, title: 'Diagnóstico', color: '#0ea5e9', description: 'Realizamos uma imersão profunda no seu negócio e na sua tecnologia atual. Analisamos a arquitetura, os processos e os dados para identificar os principais desafios e oportunidades de melhoria.' },
    { step: 2, title: 'Planeamento', color: '#4c89f1', description: 'Com base no diagnóstico, desenhamos uma solução técnica sob medida e um roadmap estratégico. Esta fase é colaborativa, garantindo o alinhamento total entre a solução técnica e os objetivos de negócio.' },
    { step: 3, title: 'Adaptação', color: '#7d68f6', description: 'Nesta fase, focamo-nos em preparar a sua aplicação para a nuvem. Isto pode incluir a refatoração do código, a conteinerização (Docker) e a adaptação de bases de dados para garantir a máxima performance e escalabilidade.' },
    { step: 4, title: 'Implementação', color: '#a155fa', description: 'Criamos a infraestrutura cloud como código (IaC) utilizando ferramentas como Terraform. Automatizamos todo o processo de deploy com pipelines de CI/CD robustos, garantindo entregas rápidas e seguras.' },
    { step: 5, title: 'Segurança', color: '#b94ffc', description: 'A segurança é integrada em todas as etapas, desde a análise estática do código (SAST) até ao monitoramento em tempo real (Runtime Security). Implementamos uma abordagem Zero Trust para proteger a sua infraestrutura de ponta a ponta.' },
    { step: 6, title: 'Otimização', color: '#d04dfd', description: 'Após o deploy, implementamos uma stack de observabilidade completa (métricas, logs, traces) e utilizamos IA (AIOps) para monitorar a performance, otimizar custos e garantir a evolução contínua do sistema.' }
];

export function initContactForm() {
    initProcessTimeline();
    initFormSubmission();
}


function initProcessTimeline() {
    const processTimeline = document.getElementById('process-timeline');
    if (!processTimeline) return;

    processTimeline.innerHTML = ''; // Clear existing
    processStepsData.forEach(stepData => {
        const container = document.createElement('div');
        container.className = 'process-step-container lg:col-span-1 md:col-span-1';
        container.innerHTML = `
            <div class="process-step flex flex-col items-center" data-step="${stepData.step}">
                <div class="step-circle w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mb-2" style="background-color:${stepData.color}1A; border:1px solid ${stepData.color}4D; color:${stepData.color}; --glow-color: ${stepData.color}80;">
                    ${stepData.step}
                </div>
                <h4 class="font-semibold">${stepData.title}</h4>
            </div>
            <div class="process-description lg:hidden">
                <div class="glass-effect p-4 rounded-xl text-sm text-gray-300">
                    ${stepData.description}
                </div>
            </div>
        `;
        processTimeline.appendChild(container);
    });

    let activeStepContainer = null;
    processTimeline.addEventListener('click', (e) => {
        const stepContainer = e.target.closest('.process-step-container');
        if (!stepContainer) return;

        if (activeStepContainer && activeStepContainer !== stepContainer) {
            activeStepContainer.classList.remove('active');
        }

        stepContainer.classList.toggle('active');
        activeStepContainer = stepContainer.classList.contains('active') ? stepContainer : null;
    });

    // Set initial state
    const firstStep = document.querySelector('.process-step-container');
    if (firstStep) {
        firstStep.classList.add('active');
        activeStepContainer = firstStep;
    }
}

function initFormSubmission() {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return;

    const buttonText = document.getElementById("button-text");
    const buttonSpinner = document.getElementById("button-spinner");

    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        if(buttonText) buttonText.classList.add("hidden");
        if(buttonSpinner) buttonSpinner.classList.remove("hidden");

        // Simulate a delay for form submission
        setTimeout(() => {
            // Here you would typically send the form data to a server.
            // For this demo, we just show a success state.
            console.log("Form submitted (simulated).");

            if(buttonText) buttonText.textContent = "Mensagem Enviada!";
            if(buttonText) buttonText.classList.remove("hidden");
            if(buttonSpinner) buttonSpinner.classList.add("hidden");

            // Reset form after a few seconds
            setTimeout(() => {
                 if(buttonText) buttonText.textContent = "Enviar Mensagem";
                 contactForm.reset();
            }, 3000);

        }, 1000);
    });
}
