function geraId(){
    //return crypto.randomUUID(); // completo
    return crypto.randomUUID().split('-')[0];
}

function tag(tag, classes, content){
    return '<'+tag+' class="'+classes+'">'+content+'</'+tag+'>';
}

function div(classes, content){
    return '<div class="'+classes+'">'+content+'</div>';
}

function buttonEdit(){
    return '<button class="btn btn-sm btn-outline-secondary" data-action="edit-step">Editar</button>'
}

function stepHtml(step){
    return `<div class="card mb-2" data-step-id="">
      <div class="card-body p-2 d-flex justify-content-between align-items-center">
        <div data-role="text" class="small">${step.text}</div>
        <div class="btn-group" role="group">
          <button class="btn btn-sm btn-outline-secondary" data-action="edit-step">Editar</button>
          <button class="btn btn-sm btn-outline-danger" data-action="delete-step">Apagar</button>
        </div>
      </div>
    </div>`
}

function scenarioHtml(scenario){

return `<div class="col-12 col-md-12 col-lg-12">
      <div class="card h-100" data-id="">
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h5 class="card-title mb-0" data-role="title">${scenario.title}</h5>
              <small class="text-muted" data-role="subtitle">Sem steps</small>
            </div>
            <div class="btn-group" role="group">
              <button class="btn btn-sm btn-outline-primary" data-action="add-step">+ Novo Step</button>
              <button class="btn btn-sm btn-outline-secondary" data-action="edit-title">Editar</button>
              <button class="btn btn-sm btn-outline-danger" data-action="delete-scenario">Deletar</button>
            </div>
          </div>

          ${scenario.steps}

        </div>
      </div>
    </div>`
}