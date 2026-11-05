// Prototype behaviour: children table, Trail / Comments tabs. All data is sample data.

const STAGES = [
  { name: 'Draft', date: '24 Oct 2026' },
  { name: 'Submitted', date: '28 Oct 2026' },
  { name: 'Area Recommended', date: '31 Oct 2026' },
  { name: 'State Recommended', date: '4 Nov 2026' },
  { name: 'Zone Recommended', date: '7 Nov 2026' },
  { name: 'SCI Recommended', date: '11 Nov 2026' },
  { name: 'Approved', date: '14 Nov 2026' }
];

const COMMENTS = [
  { author: '[Centre Secretary]', role: 'AHMEDABAD-I (MEDRA)', when: '24 Oct 2026, 10:42', text: 'Form created. Awaiting photo ID upload before submission.' },
  { author: '[Data Entry Sewadar]', role: 'AHMEDABAD-I (MEDRA)', when: '25 Oct 2026, 16:05', text: 'Aadhaar copy added under Documents.' },
  { author: '[Centre Secretary]', role: 'AHMEDABAD-I (MEDRA)', when: '2 Nov 2026, 09:18', text: 'Please confirm Beas department and sewa dates.' }
];

// Preview a later stage with ?stage=State%20Recommended in the URL.
const stageParam = new URLSearchParams(window.location.search).get('stage');
const currentStage = Math.max(0, STAGES.findIndex((s) => s.name === stageParam));

const state = {
  tab: 'trail',
  hasKids: false,
  kids: [{ id: 1, name: 'Sdfadasfsaf', age: '90', married: 'Alksdjf' }],
  nextId: 2
};

function esc(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ---- Children table ----

function kidRow(kid) {
  return `
    <div class="kt" data-kid="${kid.id}">
      <div class="tc"><input class="in" data-field="name" value="${esc(kid.name)}" aria-label="Child name"></div>
      <div class="tc"><input class="in" data-field="age" value="${esc(kid.age)}" aria-label="Child age"><span style="font-size: 12px; color: #6A6A6A">yrs</span></div>
      <div class="tc"><input class="in" data-field="married" value="${esc(kid.married)}" aria-label="Married / Settled"><button data-action="remove-kid" aria-label="Remove child" style="width: 20px; height: 20px; flex: none; border-radius: 50%; background: #D32F2F; border: 0; padding: 0; display: flex; align-items: center; justify-content: center; cursor: pointer"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#fff" stroke-width="2" aria-hidden="true"><path d="M2 2l6 6M8 2l-6 6"/></svg></button></div>
    </div>`;
}

function renderKids() {
  const slot = document.getElementById('children-table');
  if (!state.hasKids) {
    slot.innerHTML = '';
    return;
  }
  slot.innerHTML = `
    <div class="s3" style="display: flex; flex-direction: column; gap: 1px">
      <div class="kt" style="font-size: 12px; font-weight: 500; color: #5C4A44">
        <span class="tc" style="background: #F5F0EE; min-height: 28px">Child Name</span>
        <span class="tc" style="background: #F5F0EE; min-height: 28px">Age</span>
        <span class="tc" style="background: #F5F0EE; min-height: 28px; justify-content: space-between">Married / Settled
          <button data-action="add-kid" aria-label="Add child" style="width: 20px; height: 20px; flex: none; border-radius: 50%; background: #2E9E44; border: 0; padding: 0; display: flex; align-items: center; justify-content: center; cursor: pointer"><svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#fff" stroke-width="2" aria-hidden="true"><path d="M6 1v10M1 6h10"/></svg></button>
        </span>
      </div>
      ${state.kids.map(kidRow).join('')}
    </div>`;
}

// ---- Trail / Comments panel ----

function stageRow(stage, i) {
  const done = i < currentStage;
  const current = i === currentStage;
  const last = i === STAGES.length - 1;
  const dot = done
    ? 'background: #2F6FC6; width: 18px; height: 18px;'
    : current
      ? 'background: #fff; border: 4px solid #2F6FC6; box-sizing: border-box; width: 18px; height: 18px; box-shadow: 0 0 0 4px #E6F0FB;'
      : 'background: #D6D6D6; width: 14px; height: 14px; margin-top: 2px;';
  const line = last ? 'display: none' : `flex: 1; width: 0; margin: 4px 0; border-left: 2px ${done ? 'solid #2F6FC6' : 'dashed #D6D6D6'}`;
  const date = done ? `Completed ${stage.date}` : current ? `${i === 0 ? 'Created' : 'Since'} ${stage.date}` : 'Pending';
  return `
    <div style="display: flex; gap: 16px; opacity: ${done || current ? 1 : 0.4}">
      <div style="display: flex; flex-direction: column; align-items: center; width: 20px; flex: none">
        <div style="${dot} border-radius: 50%; display: flex; align-items: center; justify-content: center; flex: none">
          ${done ? '<svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#fff" stroke-width="2.2" aria-hidden="true"><path d="M2.5 6.2l2.4 2.3L9.5 3.8"/></svg>' : ''}
        </div>
        <div style="${line}"></div>
      </div>
      <div style="padding-bottom: 20px; min-width: 0">
        <div style="font-size: 14px; line-height: 18px; font-weight: ${current ? 700 : 500}; color: ${done || current ? '#2F6FC6' : '#4A86D9'}">${esc(stage.name)}</div>
        <div style="font-size: 12px; color: #757575; margin-top: 4px">${esc(date)}</div>
        ${current ? '<div style="display: inline-block; margin-top: 6px; font-size: 11px; font-weight: 500; color: #2F6FC6; background: #E6F0FB; border-radius: 10px; padding: 2px 8px">Current stage</div>' : ''}
      </div>
    </div>`;
}

function commentRow(c) {
  const initials = c.author.replace(/[^A-Z]/g, '').slice(0, 2);
  return `
    <div style="padding: 14px 0; border-bottom: 1px solid #EFE8E6; display: flex; gap: 10px">
      <div style="width: 30px; height: 30px; flex: none; border-radius: 50%; background: #EADFDC; color: #5C4A44; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center">${esc(initials)}</div>
      <div style="min-width: 0; flex: 1">
        <div style="display: flex; justify-content: space-between; gap: 8px; align-items: baseline; flex-wrap: wrap">
          <span style="font-size: 13px; font-weight: 700; color: #222">${esc(c.author)}</span>
          <span style="font-size: 11px; color: #757575">${esc(c.when)}</span>
        </div>
        <div style="font-size: 12px; color: #6A6A6A; margin-top: 1px">${esc(c.role)}</div>
        <div style="font-size: 14px; color: #333; margin-top: 6px; line-height: 1.4">${esc(c.text)}</div>
      </div>
    </div>`;
}

function tabStyle(on) {
  return `flex: 1; font: inherit; font-size: 14px; font-weight: 700; cursor: pointer; border: 0; background: ${on ? '#fff' : 'transparent'}; color: ${on ? '#222' : '#5F5F5F'}; border-bottom: 2px solid ${on ? '#7A4A3A' : 'transparent'}; margin-bottom: -1px`;
}

function renderPanel() {
  const trailOn = state.tab === 'trail';
  document.getElementById('panel-tabs').innerHTML = `
    <button role="tab" data-tab="trail" aria-selected="${trailOn}" style="${tabStyle(trailOn)}">Trail</button>
    <button role="tab" data-tab="comments" aria-selected="${!trailOn}" style="${tabStyle(!trailOn)}">Comments <span style="font-weight: 500; font-size: 11px; background: #7A4A3A; color: #fff; border-radius: 9px; padding: 1px 6px; margin-left: 4px">${COMMENTS.length}</span></button>`;

  document.getElementById('panel-content').innerHTML = trailOn
    ? `<div style="padding: 20px 20px 24px">
        <div style="font-size: 12px; font-weight: 700; letter-spacing: .04em; color: #444; margin-bottom: 16px">APPROVAL TRAIL</div>
        ${STAGES.map(stageRow).join('')}
      </div>`
    : `<div style="flex: 1; padding: 8px 16px; display: flex; flex-direction: column">
        ${COMMENTS.map(commentRow).join('')}
      </div>
      <div style="border-top: 1px solid #E2DAD7; padding: 12px 16px; display: flex; flex-direction: column; gap: 8px">
        <label for="newComment" style="font-size: 12px; color: #5F5F5F">Add a comment</label>
        <textarea id="newComment" class="in" rows="2" placeholder="Write a comment…" style="border: 1px solid #D5D5D5; padding: 6px 8px; resize: vertical"></textarea>
        <button style="align-self: flex-end; font: inherit; font-size: 14px; background: #BFEAF2; color: #2A2A2A; border: 0; padding: 0 18px; height: 32px; cursor: pointer">Post</button>
      </div>`;
}

// ---- Events ----

document.getElementById('children-select').addEventListener('change', (e) => {
  state.hasKids = e.target.value === 'Yes';
  renderKids();
});

const kidsSlot = document.getElementById('children-table');

kidsSlot.addEventListener('input', (e) => {
  const row = e.target.closest('[data-kid]');
  if (!row) return;
  const kid = state.kids.find((k) => k.id === Number(row.dataset.kid));
  kid[e.target.dataset.field] = e.target.value;
});

kidsSlot.addEventListener('click', (e) => {
  const button = e.target.closest('[data-action]');
  if (!button) return;
  if (button.dataset.action === 'add-kid') {
    state.kids.push({ id: state.nextId++, name: '', age: '', married: '' });
  } else {
    const id = Number(button.closest('[data-kid]').dataset.kid);
    state.kids = state.kids.filter((k) => k.id !== id);
  }
  renderKids();
});

document.getElementById('panel-tabs').addEventListener('click', (e) => {
  const tab = e.target.closest('[data-tab]');
  if (!tab) return;
  state.tab = tab.dataset.tab;
  renderPanel();
});

renderKids();
renderPanel();
