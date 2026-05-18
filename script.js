const configuracion = {
        vf: { maxErrores: 12, puntosPorError: 3, total: 36 },
        multiple: { maxErrores: 8, puntosPorError: 4, total: 32 },
        completar: { maxErrores: 6, puntosPorError: 3, total: 18 },
        casos: { maxErrores: 4, puntosPorError: 3.5, total: 14 },
      };

      function obtenerErrores(id, maximo) {
        const input = document.getElementById(id);
        let valor = parseInt(input.value, 10);

        if (isNaN(valor) || valor < 0) valor = 0;
        if (valor > maximo) valor = maximo;

        input.value = valor;
        return valor;
      }

      function calcularSeccion(errores, puntosPorError, total) {
        const descuento = errores * puntosPorError;
        const puntaje = Math.max(total - descuento, 0);
        return { descuento, puntaje };
      }

      function definirCalificacion(puntaje) {
        if (puntaje >= 90) return { texto: "Excelente", clase: "excelente" };
        if (puntaje >= 80) return { texto: "Muy bueno", clase: "muy-bueno" };
        if (puntaje >= 70) return { texto: "Bueno", clase: "bueno" };
        if (puntaje >= 60) return { texto: "Aprobado", clase: "aprobado" };
        return { texto: "Desaprobado", clase: "desaprobado" };
      }

      function mostrarNumero(valor) {
        return Math.round(valor).toString();
      }

      function calcularNota() {
        const erroresVF = obtenerErrores(
          "erroresVF",
          configuracion.vf.maxErrores,
        );
        const erroresMultiple = obtenerErrores(
          "erroresMultiple",
          configuracion.multiple.maxErrores,
        );
        const erroresCompletar = obtenerErrores(
          "erroresCompletar",
          configuracion.completar.maxErrores,
        );
        const erroresCasos = obtenerErrores(
          "erroresCasos",
          configuracion.casos.maxErrores,
        );

        const vf = calcularSeccion(
          erroresVF,
          configuracion.vf.puntosPorError,
          configuracion.vf.total,
        );
        const multiple = calcularSeccion(
          erroresMultiple,
          configuracion.multiple.puntosPorError,
          configuracion.multiple.total,
        );
        const completar = calcularSeccion(
          erroresCompletar,
          configuracion.completar.puntosPorError,
          configuracion.completar.total,
        );
        const casos = calcularSeccion(
          erroresCasos,
          configuracion.casos.puntosPorError,
          configuracion.casos.total,
        );

        const puntajeExacto =
          vf.puntaje + multiple.puntaje + completar.puntaje + casos.puntaje;
        const puntajeRedondeado = Math.round(puntajeExacto);
        const calificacion = definirCalificacion(puntajeRedondeado);

        document.getElementById("puntaje").textContent =
          mostrarNumero(puntajeExacto);
        document.getElementById("notaFinal").textContent = puntajeRedondeado;

        const calificacionElemento = document.getElementById("calificacion");
        calificacionElemento.textContent = calificacion.texto;
        calificacionElemento.className = "estado " + calificacion.clase;

        document.getElementById("dErroresVF").textContent = erroresVF;
        document.getElementById("dDescVF").textContent = mostrarNumero(
          vf.descuento,
        );
        document.getElementById("dPuntosVF").textContent = mostrarNumero(
          vf.puntaje,
        );

        document.getElementById("dErroresMultiple").textContent =
          erroresMultiple;
        document.getElementById("dDescMultiple").textContent = mostrarNumero(
          multiple.descuento,
        );
        document.getElementById("dPuntosMultiple").textContent = mostrarNumero(
          multiple.puntaje,
        );

        document.getElementById("dErroresCompletar").textContent =
          erroresCompletar;
        document.getElementById("dDescCompletar").textContent = mostrarNumero(
          completar.descuento,
        );
        document.getElementById("dPuntosCompletar").textContent = mostrarNumero(
          completar.puntaje,
        );

        document.getElementById("dErroresCasos").textContent = erroresCasos;
        document.getElementById("dDescCasos").textContent = mostrarNumero(
          casos.descuento,
        );
        document.getElementById("dPuntosCasos").textContent = mostrarNumero(
          casos.puntaje,
        );
      }

      function limpiar() {
        document.getElementById("erroresVF").value = 0;
        document.getElementById("erroresMultiple").value = 0;
        document.getElementById("erroresCompletar").value = 0;
        document.getElementById("erroresCasos").value = 0;
        calcularNota();
      }

      calcularNota();
