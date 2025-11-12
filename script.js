 (function(){
      const listEl = document.getElementById('list');
      const emptyEl = document.getElementById('empty');
      const cardTpl = document.getElementById('cardTpl');
      const stepTpl = document.getElementById('stepTpl');
      const btnNew = document.getElementById('btnNewScenario');
      const floatAdd = document.getElementById('floatAdd');
      const btnExport = document.getElementById('btnExport');
      const btnEmptyAdd = document.getElementById('btnEmptyAdd');

      let nextId = 1;

      function updateEmpty() {
        const has = listEl.querySelectorAll('.card[data-id]').length > 0;
        emptyEl.style.display = has ? 'none' : 'block';
      }

      function createScenario(title) {
        const id = nextId++;
        const node = cardTpl.content.cloneNode(true);
        const col = node.querySelector('div');
        const art = node.querySelector('.card');
        col.querySelector('.card').dataset.id = id;
        art.dataset.id = id;
        art.querySelector('[data-role="title"]').textContent = title || `Cenário ${id}`;
        art.querySelector('[data-role="subtitle"]').textContent = 'Sem steps';
        art.querySelector('[data-role="steps"]').innerHTML = '';
        listEl.appendChild(col);
        updateEmpty();
      }

      function promptText(title, placeholder, initial){
        // Use a modal-like prompt using built-in prompt (simple) — keeps the behavior similar
        const single = confirm(title + 'OK = prompt simples / Cancel = prompt multi-linha');
        if(single) {
          const res = prompt(placeholder, initial || '');
          return res === null ? null : res.trim();
        } else {
          const val = window.prompt(placeholder + " (use \n para novas linhas)", initial || '');
          return val === null ? null : val.trim();
        }
      }

      function addStepToCard(cardEl, text) {
        const stepNode = stepTpl.content.cloneNode(true);
        const stepDiv = stepNode.querySelector('.card');
        const sid = Date.now() + Math.floor(Math.random()*999);
        stepDiv.dataset.stepId = sid;
        stepDiv.querySelector('[data-role="text"]').textContent = text;
        cardEl.querySelector('[data-role="steps"]').appendChild(stepDiv);
        refreshSubtitle(cardEl);
      }

      function refreshSubtitle(cardEl){
        const count = cardEl.querySelectorAll('.card[data-step-id]').length;
        const sub = cardEl.querySelector('[data-role="subtitle"]');
        sub.textContent = count === 0 ? 'Sem steps' : `${count} step(s)`;
      }

      btnNew.addEventListener('click', ()=>{
        const title = promptText('Novo cenário — informe o título', 'Título do cenário');
        if(title !== null && title !== '') createScenario(title);
      });
      floatAdd.addEventListener('click', ()=> btnNew.click());
      btnEmptyAdd.addEventListener('click', ()=> btnNew.click());

      // Delegation
      listEl.addEventListener('click', (ev)=>{
        const btn = ev.target.closest('button');
        if(!btn) return;
        const action = btn.dataset.action;
        const card = btn.closest('.card[data-id]');
        if(!action) return;

        if(action === 'add-step'){
          const targetCard = btn.closest('.card[data-id]');
          const text = promptText('Novo Step — digite o texto do step', 'Ex: Dado que ...');
          if(text !== null && text !== '') addStepToCard(targetCard, text);
        }
        if(action === 'edit-title'){
          const targetCard = btn.closest('.card[data-id]');
          const cur = targetCard.querySelector('[data-role="title"]').textContent;
          const updated = promptText('Editar título do cenário', 'Título do cenário', cur);
          if(updated !== null && updated !== '') targetCard.querySelector('[data-role="title"]').textContent = updated;
        }
        if(action === 'delete-scenario'){
          const targetCol = btn.closest('.col-12');
          if(confirm('Remover este cenário?')){ targetCol.remove(); updateEmpty(); }
        }
        if(action === 'edit-step'){
          const step = btn.closest('.card[data-step-id]');
          const cur = step.querySelector('[data-role="text"]').textContent;
          const updated = promptText('Editar step', 'Texto do step', cur);
          if(updated !== null && updated !== '') step.querySelector('[data-role="text"]').textContent = updated;
        }
        if(action === 'delete-step'){
          const step = btn.closest('.card[data-step-id]');
          const parentCard = btn.closest('.card[data-id]');
          if(confirm('Remover step?')){ step.remove(); refreshSubtitle(parentCard); }
        }
      });

      // Export simple text (pseud .feature)
      btnExport.addEventListener('click', ()=>{
        const cards = Array.from(listEl.querySelectorAll('.card[data-id]'));
        if(cards.length === 0){ alert('Nenhum cenário para exportar'); return; }
        let out = '';
        cards.forEach((c, idx)=>{
          const title = c.querySelector('[data-role="title"]').textContent;
          out += `Cenário: ${title}`;
          const steps = Array.from(c.querySelectorAll('.card[data-step-id]')).map(s => s.querySelector('[data-role="text"]').textContent);
          if(steps.length === 0) out += '  (sem steps)';
          else steps.forEach(s => out += `  - ${s}`);
          out += '';
        });
        const w = window.open('', '_blank');
        w.document.write('<div class="container py-4">');
        w.document.write('<h5>Export - cenários</h5>');
        w.document.write('<pre class="export-area p-3 bg-light border rounded">' + escapeHtml(out) + '</pre>');
        w.document.write('</div>');
        w.document.title = 'Export - cenários';
      });

      function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

      // Initialize
      updateEmpty();

      // keyboard shortcut: Ctrl/Cmd + N
      window.addEventListener('keydown', (e)=>{
        if(e.key.toLowerCase() === 'n' && (e.ctrlKey || e.metaKey)){
          e.preventDefault(); btnNew.click();
        }
      });

    })();