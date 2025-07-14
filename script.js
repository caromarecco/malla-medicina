const materias = [
  { codigo: 'MIBCM', nombre: 'Biología Celular y Molecular', anio: 1, previas: [] },
  { codigo: 'MIBES', nombre: 'Bioestadística', anio: 1, previas: [] },
  { codigo: 'MSPHB', nombre: 'Salud y Humanidades', anio: 1, previas: [] },
  { codigo: 'MAT1', nombre: 'Aprendizaje en Territorio 1', anio: 1, previas: [] },

  { codigo: 'MBCM', nombre: 'Biología Celular y Molecular 2', anio: 2, previas: ['MIBCM'] },
  { codigo: 'MAT2', nombre: 'Aprendizaje en Territorio 2', anio: 2, previas: ['MAT1'] },

  { codigo: 'MANAT', nombre: 'Anatomía (CBCC2)', anio: 3, previas: ['MSPHB'] },
  { codigo: 'MHBIO', nombre: 'Histología y Biofísica', anio: 3, previas: ['MBCM'] },

  { codigo: 'HIST', nombre: 'Histología Neuro/Cardio', anio: 4, previas: ['MBCM'] },
  { codigo: 'BCC3N', nombre: 'Neurociencias', anio: 4, previas: ['MBCM'] },
  { codigo: 'BCC4C', nombre: 'Cardio y Respiratorio', anio: 4, previas: ['MBCM'] },

  { codigo: 'BCC5', nombre: 'Digestivo y Endocrino', anio: 5, previas: ['MBCM', 'MANAT'] },
  { codigo: 'BCC6', nombre: 'Hematología e Inmunobio', anio: 5, previas: ['MBCM'] },

  { codigo: 'MC1', nombre: 'Metodología Científica 1', anio: 6, previas: ['MIBES', 'BCC5'] },
  { codigo: 'M4PNA', nombre: 'Medicina 1er Nivel Atención', anio: 6, previas: ['BCC5', 'BCC6'] },
  { codigo: 'M4BCP', nombre: 'Bases Científicas Patología', anio: 6, previas: ['BCC5', 'BCC6'] },

  { codigo: 'M4PED', nombre: 'Pediatría', anio: 7, previas: ['M4PNA', 'M4BCP'] },
  { codigo: 'M4GYN', nombre: 'Ginecología y Neonatología', anio: 7, previas: ['M4PNA', 'M4BCP'] },

  { codigo: 'MCM', nombre: 'Clínica Médica', anio: 8, previas: ['M4PED', 'M4GYN'] },
  { codigo: 'MPMT', nombre: 'Patología Médica y Terapéutica', anio: 8, previas: ['M4BCP'] },

  { codigo: 'M6CQ', nombre: 'Clínica Quirúrgica', anio: 9, previas: ['MCM', 'M4BCP', 'M4PNA'] },
  { codigo: 'M6PQ', nombre: 'Patología Quirúrgica', anio: 9, previas: ['M4BCP'] },
  { codigo: 'M6MFC', nombre: 'Salud Mental y Psicología Médica', anio: 9, previas: ['M4PNA'] },
  { codigo: 'MC2', nombre: 'Metodología Científica 2', anio: 9, previas: ['MC1', 'M4BCP', 'M4PNA'] },

  { codigo: 'INTO', nombre: 'Internado Obligatorio', anio: 10, previas: ['M6CQ', 'M6PQ', 'M6MFC', 'MC2'] }
];

const malla = document.getElementById('malla');

function estaDesbloqueada(materia) {
  return materia.previas.every(cod => {
    const el = document.querySelector(`[data-codigo='${cod}']`);
    return el && el.classList.contains('aprobada');
  });
}

function actualizarEstado() {
  materias.forEach(m => {
    const el = document.querySelector(`[data-codigo='${m.codigo}']`);
    if (!el.classList.contains('aprobada')) {
      if (estaDesbloqueada(m)) {
        el.classList.remove('bloqueada');
      } else {
        el.classList.add('bloqueada');
      }
    }
  });
}

function crearMalla() {
  materias.forEach(m => {
    const div = document.createElement('div');
    div.className = 'materia';
    div.setAttribute('data-codigo', m.codigo);
    div.setAttribute('data-ano', m.anio);
    div.innerHTML = `<strong>${m.codigo}</strong><br>${m.nombre}`;

    if (m.previas.length > 0) {
      div.classList.add('bloqueada');
    }

    div.addEventListener('click', () => {
      if (div.classList.contains('bloqueada')) return;
      div.classList.toggle('aprobada');
      actualizarEstado();
    });

    malla.appendChild(div);
  });
}

crearMalla();
