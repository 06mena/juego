const consultar = "preguntas.json"
fetch(consultar)
    .then(x => x.json())
    .then(data => {
        const swalInicio = () => {
            Swal.fire (
                '¿Jugamos?',
                'Acierta las preguntas y gana',
                'question'
            )
        }
        swalInicio()

        let preguntas = data;
        let contPreguntas = 0
        let pregunta = document.querySelector('.pregunta')
        let opcion = document.querySelector('.opciones') 
        let puntaje = document.querySelector('.puntaje-correcto p') 
        let contPuntaje = 0

        function mostrarPreguntas() {
          const preguntaActual = preguntas[contPreguntas];
          pregunta.textContent = preguntaActual.pregunta;

          opcion.innerHTML = '';

          preguntaActual.opciones.forEach(x => {
            const boton = document.createElement('button')
            boton.textContent = x; 
            boton.addEventListener('click', respuestaCorrecta);
            opcion.appendChild(boton); 
          });
        }

        function respuestaCorrecta(check) {
          const usuario = check.target.textContent;
          const preguntaActual = preguntas[contPreguntas];

            if (usuario === preguntaActual.respuesta_correcta) { 
                Swal.fire("¡Correcto!", "Respuesta correcta.", "success");
                contPuntaje++
                puntaje.textContent = contPuntaje
            }else{
                Swal.fire("¡Incorrecto!", "Respuesta incorrecta.", "error");    
            }
        
            contPreguntas++
        
            if (contPreguntas < preguntas.length) {
              mostrarPreguntas()
            } else {
              finJuego()
            }
        }

        function finJuego() {
            opcion.innerHTML = '';
            Swal.fire("¡Juego terminado!", `Puntaje final: ${contPuntaje}`, "info");
        }

        mostrarPreguntas();
    })
    .catch(error => console.error('Error al cargar las preguntas:', error));