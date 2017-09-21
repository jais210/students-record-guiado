'use strict';

class App {

    constructor() {
        this.estudiantes = [];
    }

    agregarEstudiante(nombre, puntosTecnicos, puntosHSE) {
        let estudiante = {
            nombre: nombre,
            puntosTecnicos: puntosTecnicos,
            puntosHSE: puntosHSE
        }
        this.estudiantes.push(estudiante);
        return estudiante;
    }

    mostrar(estudiante) {
        let fichaEstudiante = `
            <div class = "estudiante">
                <h3 class="text-uppercase">${estudiante.nombre}</h3>
                <strong>Tech Skills:</strong> ${estudiante.puntosTecnicos}%<br>
                <strong>Life Skills:</strong> ${estudiante.puntosHSE}%<br>
                <strong>Status:</strong> Active<br>
            </div>
        `
        return fichaEstudiante;
    }
    mostrarLista(estudiantes) {
        return estudiantes.map(this.mostrar);
    }

    estudiantesPromedioalto() {
        return this.estudiantes.filter(a => ((a.puntosTecnicos + a.puntosHSE) / 2) >= 70);
    }

    reiniciar() {
        $('#puntosTecnicos').val('');
        $('#puntosHSE').val('');
        $("#nombre").val('');
        $("#nombre").next().css('visibility', 'hidden');
        $('#range').html(50);
        $('#range2').html(50);
        $('#agregar').removeAttr('data-dismiss');
    }

    eventoMostrar() {
        $("#fichas").html(this.mostrarLista(this.estudiantes));
    }
    eventoMostrarEmpleables() {
        let empleables = this.estudiantesPromedioalto();
        $('#fichas').html(this.mostrarLista(empleables));
    }

    eventoEliminar() {
        this.estudiantes = this.estudiantesPromedioalto();
        $('#fichas').html(this.mostrarLista(this.estudiantes));
    }

    eventoAgregar() {
        let nombre = $('#nombre').val();
        let puntosTecnicos = parseInt($("#puntosTecnicos").val());
        let puntosHSE = parseInt($("#puntosHSE").val());
        if (nombre == '') {
            $("#nombre").next().css('visibility', 'visible');
        } else {
            $('#agregar').attr('data-dismiss', "modal");
            let estudiante = this.agregarEstudiante(nombre, puntosTecnicos, puntosHSE);
            $("#fichas").html(this.mostrar(estudiante));
        }
    }


    iniciar() {
        $("#agregar").click(() => this.eventoAgregar());

        $('#agregando').click(() => this.reiniciar());
        $('#mostrar').click(() => this.eventoMostrar());
        $('#empleables').click(() => this.eventoMostrarEmpleables());
        $('#eliminadas').click(() => this.eventoEliminar());
    }
}
$(document).ready(() => {

    var app = new App();
    app.iniciar();
})

// cumplido