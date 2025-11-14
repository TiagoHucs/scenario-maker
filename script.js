const btnNew = document.getElementById('btnNewScenario');
const btnExport = document.getElementById('btnExport');

const scenarioList = document.getElementById('scenarioList');

//mock de scenarios
let scenarios = [
    {
        id: geraId(), title: 'Cadastrar aluno', steps: [
            { id: geraId(), text: 'Dado que tenha permissão' },
            { id: geraId(), text: 'Quando cadastrar um aluno' },
            { id: geraId(), text: 'Então retornará sucesso' }
        ]
    },
    {
        id: geraId(), title: 'Editar aluno', steps: [
            { id: geraId(), text: 'Dado que tenha permissão' }
        ]
    },
    { id: geraId(), title: 'Excluir aluno' }
];


/* ---------- Render (método separado) ---------- */

function renderScenarios() {

    stepDuplicityAnalysis();

    scenarioList.innerHTML = '';
    htmlContent = '';

    console.log(scenarios);

    scenarios.forEach(s => {
        htmlContent += getScenarioByTemplate(s);
        scenarioList.innerHTML = htmlContent;
    });

}

function stepDuplicityAnalysis(){
    scenarios.forEach(scenario => {
        scenario.steps?.forEach(step => {
            //step.duplicity = 10+'%'
            qtd = step.text.length;
            step.duplicity = qtd+'% de duplicidade'
        });
    });
}

function createScenario(title) {
    const id = geraId();
    const scenario = { id, title: title || `Cenário ${id}`, steps: [] };
    scenarios.push(scenario);
    renderScenarios();
}

function addStepToScenarioById(scenId, text) {
    const scen = scenarios.find(s => Number(s.id) === Number(scenId));
    if (!scen) return;
    scen.steps.push({ id: geraId(), text: text, scenId: scenId });
    renderScenarios();
}

function editStepInScenario(id, id, newText) {
    const scen = scenarios.find(s => Number(s.id) === Number(id));
    if (!scen) return;
    const st = scen.steps.find(x => String(x.id) === String(id));
    if (!st) return;
    st.text = newText;
    renderScenarios();
}

function deleteStep(scenarioId, stepId) {
    if (confirm(`Remover step ${stepId}?`)) {
        const scen = scenarios.find(sc => sc.id === scenarioId);
        scen.steps = scen.steps.filter(st => st.id !== stepId);
        renderScenarios();
    }
}

function deleteScenario(scenarioId) {
    if (confirm(`Remover cenário ${scenarioId}?`)) {
        scenarios = scenarios.filter(s => s.id !== scenarioId);
        console.log(scenarios.filter(s => s.id !== scenarioId))
        renderScenarios();
    }
}

function geraId() {
    //return crypto.randomUUID(); // completo
    return crypto.randomUUID().split('-')[0];
}

/*-- html helpers --*/

function getScenarioByTemplate(scenario) {

    let qtdSteps = scenario.steps?.length;
    if(!qtdSteps){
        qtdSteps = 0;
    }

    let actualScenarioContent = document.getElementById('scenario-template').innerHTML;
    return actualScenarioContent
        .replaceAll('scenarioTitle', scenario.title)
        .replaceAll('scenarioId', scenario.id)
        .replaceAll('qtdSteps', qtdSteps + ' Steps')
        
        .replace('stepList', getStepsByTemplate(scenario.id, scenario.steps));
}

function getStepsByTemplate(scenarioId, steps) {
    stepsContent = '';
    if (Array.isArray(steps)) {
        steps.forEach(st => {
            let actualStepContent = document.getElementById('step-template').innerHTML;
            stepsContent += actualStepContent
                .replaceAll("stepText", st.text)
                .replaceAll("stepId", st.id)
                .replace("stepDuplicity",st.duplicity)
                .replaceAll("scenarioId", scenarioId);
        });
    }
    return stepsContent;
}

renderScenarios();

