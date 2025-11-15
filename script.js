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
            { id: geraId(), text: 'Dado que tenha permissão' },
            { id: geraId(), text: 'Quando editar um aluno' },
            { id: geraId(), text: 'Então retornará sucesso' }
        ]
    },
    {
        id: geraId(), title: 'Excluir aluno', steps: [
            { id: geraId(), text: 'Dado que tenha permissão' },
            { id: geraId(), text: 'Quando excluir um aluno' },
            { id: geraId(), text: 'Então retornará sucesso' }
        ]
    }
];


/* ---------- Render (método separado) ---------- */

function renderScenarios() {

    scenarioList.innerHTML = '';
    let htmlContent = '';

    console.log(scenarios);

    for (const s of scenarios) {
        htmlContent += getScenarioByTemplate(s);
        scenarioList.innerHTML = htmlContent;
    }

}

function createScenario() {
    const newTitle = prompt('Titulo do cenário:');
    const id = geraId();
    const scenario = { id, title: newTitle || `Cenário ${id}`, steps: [] };
    scenarios.push(scenario);
    renderScenarios();
    scrollToEnd();
}

function editStep(scId, stId) {
    const scen = scenarios.find(s => String(s.id) === String(scId));
    if (!scen) return;
    const st = scen.steps.find(x => String(x.id) === String(stId));
    if (!st) return;
    const newText = prompt('Texto do step:', st.text);
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

function editScenario(scId) {
    const scen = scenarios.find(s => String(s.id) === String(scId));
    if (!scen) return;
    const newTitle = prompt('Título do cenário:', scen.title);
    scen.title = newTitle;
    renderScenarios();
}

function newStep(scId) {
    const scen = scenarios.find(s => String(s.id) === String(scId));
    if (!scen) return;
    const newText = prompt('Texto do step:');
    scen.steps.push({ id: geraId(), text: newText });
    renderScenarios();
}

function geraId() {
    return crypto.randomUUID().split('-')[0];
}

function gerarFeature() {
    let feature = `Funcionalidade: funcionalidade de teste\n\n`;

    for (const sc of scenarios) {
        feature += `  Cenário: ${sc.title}\n`;
        for (const st of sc.steps) {
            feature += `    ${st.text}\n`;
        }
        feature += "\n";
    }

    console.log(feature.trim())

    return feature.trim();
}

function downloadFeature() {
    const conteudo = gerarFeature();
    const blob = new Blob([conteudo], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "cenarios.feature"; // nome do arquivo
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}

/*-- html helpers --*/

function getScenarioByTemplate(scenario) {

    let qtdSteps = scenario.steps?.length;
    if (!qtdSteps) {
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
    let stepsContent = '';
    if (Array.isArray(steps)) {
        for (let st of steps) {
            let actualStepContent = document.getElementById('step-template').innerHTML;
            stepsContent += actualStepContent
                .replaceAll("stepText", st.text)
                .replaceAll("stepId", st.id)
                .replace("stepDuplicity", st.duplicity)
                .replaceAll("scenarioId", scenarioId);
        }
    }
    return stepsContent;
}

/*--efects--*/

function scrollToEnd() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
}
