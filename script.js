const materias = [
  ['MIBCM','Introducción a la Biología Celular y Molecular',1,1,[]],
  ['MIBES','Introducción a la Bioestadística',1,1,[]],
  ['MSPHB','Salud y Humanidades y Bioética',1,1,[]],
  ['MAT1','Aprendizaje en Territorio 1',1,2,[]],
  ['MBCM','Biología Celular y Molecular',2,3,['MIBCM']],
  ['MAT2','Aprendizaje en Territorio 2',2,4,['MAT1']],
  ['MANAT','Anatomía (CBCC2)',3,5,['MSPHB']],
  ['MHBIO','Histología y Biofísica (CBCC2)',3,5,['MBCM']],
  ['HIST','Histología (Neuro y Cardio)',4,7,['MBCM']],
  ['BCC3N','Neurociencias',4,7,['MBCM']],
  ['BCC4C','Cardiovascular y Respiratorio',4,7,['MBCM']],
  ['BCC5','Digestivo Renal Endocrino y Reproductivo (CBCC5)',5,9,['MBCM','MANAT']],
  ['BCC6','Hematología e Inmunobiología (BCC6)',5,9,['MBCM']],
  ['MC1','Metodología Científica 1',6,11,['MIBES','BCC5']],
  ['M4PNA','Medicina en el Primer Nivel de Atención',6,11,['BCC5','BCC6']],
  ['M4BCP','Bases Científicas de la Patología',6,12,['BCC5','BCC6']],
  ['M4PED','Pediatría',7,13,['M4PNA','M4BCP']],
  ['M4GYN','Ginecología y Neonatología',7,13,['M4PNA','M4BCP']],
  ['MCM','Clínica Médica (5to año)',8,15,['M4PED','M4GYN']],
  ['MPMT','Patología Médica y Terapéutica (5to año)',8,15,['M4BCP']],
  ['M6CQ','Clínica Quirúrgica',9,17,['MCM','M4BCP','M4PNA']],
  ['M6PQ','Patología Quirúrgica',9,17,['M4BCP']],
  ['M6MFC','MFC – Salud Mental en Comunidad – Psicología Médica',9,17,['M4PNA']],
  ['MC2','Metodología Científica 2',9,18,['MC1','M4BCP','M4PNA']],
  ['INTO','Internado Obligatorio',10,19,['M6CQ','M6PQ','M6MFC','MC2']]
];

const malla = document.getElementById('malla');
const estructura = {};

// agrupa por año y semestre
materias.forEach(([codigo, nombre, anio, semestre, previas]) => {
  if (!estructura[anio]) estructura[anio] = {};
  if (!estructura[anio][semestre]) estructura[anio][semestre] = [];
  estructura[anio][semestre].push({ codigo, nombre, previas });
});

function estaDesbloqueada(previas) {
  return previas.every(codigo => {
    const el = document.querySelector(`[data-codigo="${codigo}"]`);
    return el && el.classList.contains('aprobada');
  });
}

function actualizar() {
  document.querySelectorAll('.materia').forEach(el => {
    if (!el.classList.contains('aprobada')) {
      const reqs = JSON.parse(el.dataset.previas);
      if (estaDesbloqueada(reqs)) {
        el.classList.remove('bloqueada');
      } else {
        el.classList.add('bloqueada');
      }
    }
  });
}

// arma la malla por columna de año y dentro bloques de semestre
Object.entries(estructura).forEach(([anio, semestres]) => {
  const col = document.createElement('div');
  col.className = 'columna';
  col.innerHTML = `<h2>Año ${anio}</h2>`;

  Object.entries(semestres).forEach(([sem, lista]) => {
    const cont = document.createElement('div');
    cont.className = 'semestre';
    cont.innerHTML = `<h3>Semestre ${sem}</h3>`;

    lista.forEach(({ codigo, nombre, previas }) => {
      const div = document.createElement('div');
      div.className = 'materia';
      div.setAttribute('data-codigo', codigo);
      div.setAttribute('data-previas', JSON.stringify(previas));
      div.innerHTML = `<div class="nombre">${nombre}</div><div class="codigo">${codigo}</div>`;
      if (previas.length > 0) div.classList.add('bloqueada');
      div.addEventListener('click', () => {
        if (div.classList.contains('bloqueada')) return;
        div.classList.toggle('aprobada');
        actualizar();
      });
      cont.appendChild(div);
    });

    col.appendChild(cont);
  });

  malla.appendChild(col);
});
