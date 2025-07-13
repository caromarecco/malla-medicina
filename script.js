const materias = [
  { codigo: 'MIBCM', nombre: 'Biología Celular y Molecular', previas: [] },
  { codigo: 'MIBES', nombre: 'Bioestadística', previas: [] },
  { codigo: 'MSPHB', nombre: 'Salud y Humanidades', previas: [] },
  { codigo: 'MAT1', nombre: 'Aprendizaje en Territorio 1', previas: [] },

  { codigo: 'MBCM', nombre: 'Biología Celular y Molecular 2', previas: ['MIBCM'] },
  { codigo: 'MAT2', nombre: 'Aprendizaje en Territorio 2', previas: ['MAT1'] },

  { codigo: 'MANAT', nombre: 'Anatomía (CBCC2)', previas: ['MBCM'] },
  { codigo: 'MHBIO', nombre: 'Histología y Biofísica', previas: ['MBCM'] },

  { codigo: 'HIST', nombre: 'Histología (Neuro/Cardio)', previas: ['MBCM'] },
  { codigo: 'BCC3N', nombre: 'Neurociencias', previas: ['MBCM'] },
  { codigo: 'BCC4C', nombre: 'Cardiovascular y Respiratorio', previas: ['MBCM'] },

  { codigo: 'BCC5', nombre: 'Digestivo, Renal, Endocrino y Reproductivo', previas: ['MBCM', 'MANAT'] },

  { codigo: 'BCC6', nombre: 'Hematología e Inmunobio.', previas: ['MBCM'] },
  { codigo: 'MC1', nombre: 'Metodología Científica 1', previas: ['MIBES', 'BCC5'] },

  { codigo: 'M4PNA', nombre: 'Medicina 1er Nivel Atención', previas: ['BCC5', 'BCC6'] },
  { codigo: 'M4BCP', nombre: 'Bases Científicas de la Patología', previas: ['BCC5', 'BCC6'] },

  { codigo: 'M4PED', nombre: 'Pediatría', previas: ['M4PNA', 'M4BCP'] },
  { codigo: 'M4GYN', nombre: 'Ginecología y Neonatología', previas: ['M4PNA', 'M4BCP'] },

  { codigo: 'MCM', nombre: 'Clínica Médica', previas: ['M4PED', 'M4GYN'] },
  { codigo: 'MPMT', nombre: 'Patología Médica y Terapéutica', previas: ['M4BCP'] },

  { codigo: 'M6CQ', nombre: 'Clínica Quirúrgica', previas: ['MCM'] },
  { codigo: 'M6PQ', nombre: 'Patología Quirúrgica', previas: ['M4BCP'] },
  { codigo: 'M6MFC', nombre: 'Salud Mental / Psicología Médica', previas: ['M4PNA'] },
  { codigo: 'MC2', nombre: 'Metodología Científica 2', previas: ['MC1', 'M4BCP', 'M4PNA'] },

  { codigo: 'INTO', nombre: 'Internado Obligatorio', previas: ['M6CQ', 'M6PQ', 'M6MFC', 'MC2'] }
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
