const materias = [
  ['MIBCM','Biología Celular y Molecular',1,[]],
  ['MIBES','Bioestadística',1,[]],
  ['MSPHB','Salud y Humanidades',1,[]],
  ['MAT1','Aprendizaje en Territorio 1',1,[]],
  ['MBCM','Biología Celular y Molecular 2',2,['MIBCM']],
  ['MAT2','Aprendizaje en Territorio 2',2,['MAT1']],
  ['MANAT','Anatomía (CBCC2)',3,['MSPHB']],
  ['MHBIO','Histología y Biofísica',3,['MBCM']],
  ['HIST','Histología Neuro/Cardio',4,['MBCM']],
  ['BCC3N','Neurociencias',4,['MBCM']],
  ['BCC4C','Cardio‑Respiratorio',4,['MBCM']],
  ['BCC5','Digestivo‑Endocrino',5,['MBCM','MANAT']],
  ['BCC6','Hematología e Inmunobio',5,['MBCM']],
  ['MC1','Metodología Científica 1',6,['MIBES','BCC5']],
  ['M4PNA','Medicina 1er Nivel Atención',6,['BCC5','BCC6']],
  ['M4BCP','Bases Científicas Patología',6,['BCC5','BCC6']],
  ['M4PED','Pediatría',7,['M4PNA','M4BCP']],
  ['M4GYN','Ginecología y Neonatología',7,['M4PNA','M4BCP']],
  ['MCM','Clínica Médica',8,['M4PED','M4GYN']],
  ['MPMT','Patología Médica y Terapéutica',8,['M4BCP']],
  ['M6CQ','Clínica Quirúrgica',9,['MCM','M4BCP','M4PNA']],
  ['M6PQ','Patología Quirúrgica',9,['M4BCP']],
  ['M6MFC','Salud Mental / Psicología Médica',9,['M4PNA']],
  ['MC2','Metodología Científica 2',9,['MC1','M4BCP','M4PNA']],
  ['INTO','Internado Obligatorio',10,['M6CQ','M6PQ','M6MFC','MC2']],
];

const malla = document.getElementById('malla');

function estaDesbloqueada(previas) {
  return previas.every(codigo => {
    const el = document.querySelector(`[data-codigo="${codigo}"]`);
    return el && el.classList.contains('aprobada');
  });
}

function actualizar() {
  materias.forEach(m => {
    const el = document.querySelector(`[data-codigo="${m[0]}"]`);
    if (!el.classList.contains('aprobada')) {
      estaDesbloqueada(m[3]) ? el.classList.remove('bloqueada') : el.classList.add('bloqueada');
    }
  });
}

materias.forEach(([codigo, nombre, anio, previas]) => {
  const div = document.createElement('div');
  div.className = 'materia bloqueada';
  div.dataset.codigo = codigo;
  div.dataset.ano = anio;
  div.innerHTML = `<strong>${codigo}</strong><br>${nombre}`;
  if (previas.length === 0) div.classList.remove('bloqueada');
  div.addEventListener('click', () => {
    if (div.classList.contains('bloqueada')) return;
    div.classList.toggle('aprobada');
    actualizar();
  });
  malla.appendChild(div);
});
