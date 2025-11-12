const btnNew = document.getElementById('btnNewScenario');
const btnExport = document.getElementById('btnExport');

const scenarioList = document.getElementById('scenarioList');

const cardTpl = document.getElementById('cardTpl');
const stepTpl = document.getElementById('stepTpl');

let scenarios = [
    {id: geraId(), title: 'Cadastrar aluno', steps: [
        {id: geraId(), text: 'Dado que tenha permissão'},
        {id: geraId(), text: 'Quando cadastrar um aluno'},
        {id: geraId(), text: 'Então retornará sucesso'}
    ]},
    {id: geraId(), title: 'Editar aluno', steps: [
        {id: geraId(), text: 'Dado que tenha permissão'}
    ]},
    {id: geraId(), title: 'Excluir aluno'}
];


/* ---------- Render (método separado) ---------- */

function renderScenarios() {
    // limpa lista
    scenarioList.innerHTML = '';
    htmlContent = '';

    console.log(scenarios);
    // para cada cenário no array 'scenarios', clona o template e popula
    scenarios.forEach(s => {

        stepsContent = '';

        // render steps do cenário
        if (Array.isArray(s.steps)) {
            s.steps.forEach(st => {
                stepsContent += stepHtml(st);
            });
        }

        htmlContent += scenarioHtml(s);

        // append ao list
        scenarioList.innerHTML = htmlContent;
    });

 
}

function createScenario(title) {
    const id = geraId();
    const scenario = { id, title: title || `Cenário ${id}`, steps: [] };
    scenarios.push(scenario);
    renderScenarios(); 
}

function addStepToScenarioById(scenarioId, text) {
    const scen = scenarios.find(s => Number(s.id) === Number(scenarioId));
    if (!scen) return;
    const sid = Date.now() + Math.floor(Math.random() * 999);
    scen.steps.push({ stepId: sid, text });
    renderScenarios();
}

function editStepInScenario(scenarioId, stepId, newText) {
    const scen = scenarios.find(s => Number(s.id) === Number(scenarioId));
    if (!scen) return;
    const st = scen.steps.find(x => String(x.stepId) === String(stepId));
    if (!st) return;
    st.text = newText;
    renderScenarios();
}

function deleteStepInScenario(scenarioId, stepId) {
    const scen = scenarios.find(s => Number(s.id) === Number(scenarioId));
    if (!scen) return;
    scen.steps = scen.steps.filter(x => String(x.stepId) !== String(stepId));
    renderScenarios();
}

function deleteScenarioById(scenarioId) {
    scenarios = scenarios.filter(s => Number(s.id) !== Number(scenarioId));
    renderScenarios();
}

/* ---------- Events (delegation) ---------- */

btnNew.addEventListener('click', () => {
    const title = prompt('Novo cenário, informe o título', '');
    if (title !== null && title !== '') createScenario(title);
});

// Delegation para actions dentro da lista
scenarioList.addEventListener('click', (ev) => {
    const btn = ev.target.closest('button');
    if (!btn) return;
    const action = btn.dataset.action;
    if (!action) return;

    // Algumas ações precisam do card pai (cenário)
    const card = btn.closest('.card[data-id]');
    const cardId = card ? card.dataset.id : null;

    if (action === 'add-step') {
        if (!cardId) return;
        const text = promptText('Novo Step — digite o texto do step', 'Ex: Dado que ...');
        if (text !== null && text !== '') addStepToScenarioById(cardId, text);
    }

    if (action === 'edit-title') {
        if (!cardId) return;
        const cur = card.querySelector('[data-role="title"]').textContent;
        const updated = promptText('Editar título do cenário', 'Título do cenário', cur);
        if (updated !== null && updated !== '') {
            // altera modelo e re-renderiza
            const scen = scenarios.find(s => String(s.id) === String(cardId));
            if (scen) {
                scen.title = updated;
                renderScenarios();
            }
        }
    }

    if (action === 'delete-scenario') {
        if (!cardId) return;
        if (confirm('Remover este cenário?')) {
            deleteScenarioById(cardId);
        }
    }

    if (action === 'edit-step') {
        // localizar step e seu card/pai
        const step = btn.closest('.card[data-step-id]');
        if (!step) return;
        const stepId = step.dataset.stepId;
        const parentCard = btn.closest('.card[data-id]');
        if (!parentCard) return;
        const parentId = parentCard.dataset.id;
        const cur = step.querySelector('[data-role="text"]').textContent;
        const updated = promptText('Editar step', 'Texto do step', cur);
        if (updated !== null && updated !== '') {
            editStepInScenario(parentId, stepId, updated);
        }
    }

    if (action === 'delete-step') {
        const step = btn.closest('.card[data-step-id]');
        if (!step) return;
        const stepId = step.dataset.stepId;
        const parentCard = btn.closest('.card[data-id]');
        if (!parentCard) return;
        const parentId = parentCard.dataset.id;
        if (confirm('Remover step?')) {
            deleteStepInScenario(parentId, stepId);
        }
    }
});

// Export simples (mantive comportamento original: alerta)
btnExport.addEventListener('click', () => {
    alert('Não implementado!');
});

// Inicializa (render vazio)
renderScenarios();

// keyboard shortcut: Ctrl/Cmd + N
window.addEventListener('keydown', (e) => {
    if (e.key && e.key.toLowerCase() === 'n' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault(); btnNew.click();
    }
});
