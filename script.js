const materias = [
  {
    anio: "Primero", semestres: [
      {
        numero: "1º semestre", materias: [
          { id: "bio_intro", nombre: "Introducción a la Biología Celular y Molecular", tipo: "basicas" },
          { id: "bioest", nombre: "Introducción a la Bioestadística", tipo: "basicas" },
          { id: "bioetica", nombre: "Salud y Humanidades y Bioética", tipo: "comunidad" },
          { id: "at1", nombre: "Aprendizaje en Territorio 1", tipo: "comunidad" }
        ]
      },
      {
        numero: "2º semestre", materias: [
          { id: "bio", nombre: "Biología Celular y Molecular", previas: ["bio_intro"], tipo: "basicas" },
          { id: "at2", nombre: "Aprendizaje en Territorio 2", previas: ["at1"], tipo: "comunidad" }
        ]
      }
    ]
  },
  {
    anio: "Segundo", semestres: [
      {
        numero: "3º semestre", materias: [
          { id: "anatomia", nombre: "Anatomía (CBCC2)", previas: ["bioetica"], tipo: "basicas" },
          { id: "histobiof", nombre: "Histología y Biofísica (CBCC2)", previas: ["bio"], tipo: "basicas" }
        ]
      },
      {
        numero: "4º semestre", materias: [
          { id: "histoneuro", nombre: "Histología (Neuro y Cardio)", previas: ["bio"], tipo: "basicas" },
          { id: "neuro", nombre: "Neurociencias", previas: ["bio"], tipo: "basicas" },
          { id: "cardioresp", nombre: "Cardiovascular y Respiratorio", previas: ["bio"], tipo: "basicas" }
        ]
      }
    ]
  },
  {
    anio: "Tercero", semestres: [
      {
        numero: "5º semestre", materias: [
          { id: "cbcc5", nombre: "Digestivo, Renal, Endocrino, Metabólico y Reproductor", previas: ["bio", "anatomia"], tipo: "basicas" }
        ]
      },
      {
        numero: "6º semestre", materias: [
          { id: "b6", nombre: "Hematología e Inmunobiología", previas: ["bio"], tipo: "basicas" },
          { id: "met1", nombre: "Metodología Científica 1", previas: ["bioest", "cbcc5"], tipo: "investigacion" }
        ]
      }
    ]
  },
  {
    anio: "Cuarto", semestres: [
      {
        numero: "7º semestre", materias: [
          { id: "m4pna", nombre: "Medicina en el Primer Nivel de Atención", previas: ["cbcc5", "b6"], tipo: "comunidad" },
          { id: "m4bcp", nombre: "Bases Científicas de la Patología", previas: ["cbcc5", "b6"], tipo: "clinicas" }
        ]
      },
      {
        numero: "8º semestre", materias: [
          { id: "pediatria", nombre: "Pediatría", previas: ["m4pna", "m4bcp"], tipo: "clinicas" },
          { id: "gineco", nombre: "Ginecología y Neonatología", previas: ["m4pna", "m4bcp"], tipo: "clinicas" }
        ]
      }
    ]
  },
  {
    anio: "Quinto", semestres: [
      {
        numero: "9º y 10º semestre", materias: [
          { id: "clinica", nombre: "Clínica Médica", previas: ["pediatria", "gineco"], tipo: "clinicas" },
          { id: "patomed", nombre: "Patología Médica y Terapéutica", previas: ["m4bcp"], tipo: "clinicas" }
        ]
      }
    ]
  },
  {
    anio: "Sexto", semestres: [
      {
        numero: "11º y 12º semestre", materias: [
          { id: "clinicaq", nombre: "Clínica Quirúrgica", previas: ["clinica", "m4bcp", "m4pna"], tipo: "clinicas" },
          { id: "patoquir", nombre: "Patología Quirúrgica", previas: ["m4bcp"], tipo: "clinicas" },
          { id: "mfc", nombre: "MFC – Salud Mental en Comunidad – Psicología Médica", previas: ["m4pna"], tipo: "clinicas" },
          { id: "met2", nombre: "Metodología Científica 2", previas: ["met1", "m4pna", "m4bcp"], tipo: "investigacion" }
        ]
      }
    ]
  },
  {
    anio: "Séptimo", semestres: [
      {
        numero: "13º y 14º semestre", materias: [
