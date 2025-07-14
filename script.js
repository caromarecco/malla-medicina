const materias = [
  {
    anio: "Primero", semestres: [
      {
        numero: "1º semestre", materias: [
          { id: "mibcm", nombre: "Introducción a la Biología Celular y Molecular", tipo: "basicas" },
          { id: "mibes", nombre: "Introducción a la Bioestadística", tipo: "basicas" },
          { id: "msphb", nombre: "Salud y Humanidades y Bioética", tipo: "comunidad" },
          { id: "mat1", nombre: "Aprendizaje en Territorio 1", tipo: "comunidad" }
        ]
      },
      {
        numero: "2º semestre", materias: [
          { id: "mbcm", nombre: "Biología Celular y Molecular", previas: ["mibcm"], tipo: "basicas" },
          { id: "mat2", nombre: "Aprendizaje en Territorio 2", previas: ["mat1"], tipo: "comunidad" }
        ]
      }
    ]
  },
  {
    anio: "Segundo", semestres: [
      {
        numero: "3º semestre", materias: [
          { id: "mhbio", nombre: "Histología y Biofísica (CBCC2)", previas: ["mbcm"], tipo: "basicas" },
          { id: "manat", nombre: "Anatomía (CBCC2)", previas: ["msphb"], tipo: "basicas" }
        ]
      },
      {
        numero: "4º semestre", materias: [
          { id: "hist", nombre: "Histología (Neuro y Cardio)", previas: ["mbcm"], tipo: "basicas" },
          { id: "bcc3n", nombre: "Neurociencias", previas: ["mbcm"], tipo: "basicas" },
          { id: "bcc4c", nombre: "Cardiovascular y Respiratorio", previas: ["mbcm"], tipo: "basicas" }
        ]
      }
    ]
  },
  {
    anio: "Tercero", semestres: [
      {
        numero: "5º semestre", materias: [
          { id: "bcc5", nombre: "Digestivo, Renal, Endocrino y Reproductivo", previas: ["mbcm", "manat"], tipo: "basicas" }
        ]
      },
      {
        numero: "6º semestre", materias: [
          { id: "bcc6", nombre: "Hematología e Inmunobiología", previas: ["mbcm"], tipo: "basicas" },
          { id: "mc1", nombre: "Metodología Científica 1", previas: ["mibes", "bcc5"], tipo: "investigacion" }
        ]
      }
    ]
  },
  {
    anio: "Cuarto", semestres: [
      {
        numero: "7º semestre", materias: [
          { id: "m4pna", nombre: "Medicina en el Primer Nivel de Atención", previas: ["bcc5", "bcc6"], tipo: "comunidad" },
          { id: "m4bcp", nombre: "Bases Científicas de la Patología", previas: ["bcc5", "bcc6"], tipo: "clinicas" }
        ]
      },
      {
        numero: "8º semestre", materias: [
          { id: "m4ped", nombre: "Pediatría", previas: ["m4pna", "m4bcp"], tipo: "clinicas" },
          { id: "m4gyn", nombre: "Ginecología y Neonatología", previas: ["m4pna", "m4bcp"], tipo: "clinicas" }
        ]
      }
    ]
  },
  {
    anio: "Quinto", semestres: [
      {
        numero: "9º y 10º semestre", materias: [
          { id: "mcm", nombre: "Clínica Médica", previas: ["m4ped", "m4gyn"], tipo: "clinicas" },
          { id: "mpmt", nombre: "Patología Médica y Terapéutica", previas: ["m4bcp"], tipo: "clinicas" }
        ]
      }
    ]
  },
  {
    anio: "Sexto", semestres: [
      {
        numero: "11º y 12º semestre", materias: [
          { id: "m6cq", nombre: "Clínica Quirúrgica", previas: ["mcm", "m4bcp", "m4pna"], tipo: "clinicas" },
          { id: "m6pq", nombre: "Patología Quirúrgica", previas: ["m4bcp"], tipo: "clinicas" },
          { id: "m6mfc", nombre: "Salud Mental en Comunidad / Psicología Médica", previas: ["m4pna"], tipo: "clinicas" },
          { id: "mc2", nombre: "Metodología Científica 2", previas: ["mc1", "m4pna", "m4bcp"], tipo: "investigacion" }
        ]
      }
    ]
  },
  {
    anio: "Séptimo", semestres: [
      {
        numero: "13º y 14º semestre", materias: [
          { id: "into", nombre: "Internado Obligatorio", previas: ["m6cq", "m6pq", "m6mfc", "mc2"], tipo: "final" }
        ]
      }
    ]
  }
];

const estadoMaterias = JSON.parse(localStorage.getItem("estadoMaterias") || "{}");

function crearMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  materias.forEach(anio => {
    const divAnio = document.createElement("div");
    divAnio.className = "year";

    const h2 = document.createElement("h2");
    h2.textContent = anio.anio;
    divAnio.appendChild(h2);

    anio.semestres.forEach(sem => {
      const divSem = document.createElement("div");
      divSem.className = "semestre";

      const h3 = document.createElement("h3");
      h3.textContent = sem.numero;
      divSem.appendChild(h3);

      sem.materias.forEach(materia => {
        const divMat = document.createElement("div");
        divMat.textContent = materia.nombre;
        divMat.className = "materia " + (materia.tipo || "");
        divMat.dataset.id = materia.id;

        if (estadoMaterias[materia.id]) {
          divMat.classList.add("tachada");
        }

        if (materia.previas && materia.previas.some(p => !estadoMaterias[p])) {
          divMat.classList.add("bloqueada");
        }

        divMat.addEventListener("click", () => {
          if (divMat.classList.contains("bloqueada")) return;
          divMat.classList.toggle("tachada");
          estadoMaterias[materia.id] = divMat.classList.contains("tachada");
          localStorage.setItem("estadoMaterias", JSON.stringify(estadoMaterias));
          crearMalla();
        });

        divSem.appendChild(divMat);
      });

      divAnio.appendChild(divSem);
    });

    contenedor.appendChild(divAnio);
  });
}

crearMalla();
