class Carta {
    constructor(palo, nombre) {
        this._palo = palo;
        this._nombre = nombre;
    }

    get palo() {
        return this._palo;
    }

    set palo(palo) {
        this._palo = nuevoPalo;
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(nombre) {
        this._nombre = nuevoNombre;
    }

    toString() {
        return this._nombre + '-' + this._palo;
    }
}

class Baraja {
    constructor() {
        this.cartas = [];
        this.palos = ['PICAS', 'CORAZONES', 'TRÉBOLES', 'DIAMANTES'];
        this.nombres = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K'];

        this.inicializarBaraja();
    }

    inicializarBaraja() {
        for (const palo of this.palos) {
            for (const nombre of this.nombres) {
                const carta = new Carta(palo, nombre);
                this.cartas.push(carta);
            }
        }
    }

    generaCarta() {
        if (this.cartas.length == 0) {
            console.log('La baraja está vacía.');
            return null;
        }

        const randomIndex = Math.floor(Math.random() * this.cartas.length);
        const cartaAleatoria = this.cartas.splice(randomIndex, 1)[0];
        return cartaAleatoria;
    }
}

class Partida {
    constructor(filas, columnas) {
        if (!this.esNumeroPar(filas * columnas)) {
            console.log("El número de fila y columnas ha de ser par.");
        }

        this.filas = filas;
        this.columnas = columnas;
        this.baraja = new Baraja();
        this.cartasSeleccionadas = [];
        this.mazo = this.inicializarMazo(); //array bidimensional
        this.cartaVolteada = null;
        this.aciertos = 0;
        this.numeroIntentos = 0;
    }

    selecciona() {
        while (this.cartasSeleccionadas.length < this.filas * this.columnas) {
            const carta = this.baraja.extraerCarta();
            if (!this._cartaEnMazo(carta)) {
                this.cartasSeleccionadas.push(carta);
            }
        }
    }

    baraja() {
        this.cartasSeleccionadas.sort(() => Math.random() - 0.5);
    }

    reparte() {
        for (let i = 0; i < this.filas; i++) {
            this.mazo[i] = [];
            for (let j = 0; j < this.columnas; j++) {
                const carta = this.cartasSeleccionadas[i * this.columnas + j];
                this.mazo[i][j] = new Carta(carta);
            }
        }
    }

    voltea(fila, columna) {
        const carta = this.mazo[fila][columna];
        carta.voltear();
        if (!this.cartaVolteada) {
            this.cartaVolteada = carta;
        } else {
            this.numeroIntentos++;
            if (this.compruebaAcierto(fila, columna)) {
                this.aciertos++;
                this.cartaVolteada = null;
            } else {
                setTimeout(() => {
                    this.cartaVolteada.voltear();
                    carta.voltear();
                    this.cartaVolteada = null;
                }, 1000);
            }
        }
    }

    compruebaAcierto(fila, columna) {
        const cartaSeleccionada = this.mazo[fila][columna];
        if (this.cartaVolteada && this.cartaVolteada.equals(cartaSeleccionada)) {
            this.aciertos++;
            return true;
        }
        return false;
    }


    haFinalizado() {
        var Boolean = false;
        if (this.aciertos === this.filas * this.columnas / 2) {
            Boolean = true;
        }
        return Boolean;
    }

    _cartaEnMazo(carta) {
        return this.cartasSeleccionadas.some((c) => c.equals(carta));
    }

    inicializarMazo() {
        const mazo = [];
        for (let i = 0; i < this.filas; i++) {
            mazo.push(new Array(this.columnas));
        }
        return mazo;
    }

    functionMostrarTabla() {
        var codigoHTML = "<table border=1>"
        for (var i = 0; i < partida._mazo.length; i++) {
            codigoHTML += "<tr>"
            for (var j = 0; j < partida._mazo[i].length; j++) {
                if (partida._mazo[i][j] == null)
                    codigoHTML = "<td></td>"
                else
                    codigoHTML += "<td><br>" + partida._mazo[i][j] + "<br></td>";
            }
            codigoHTML += "</tr>"
        }
        codigoHTML += "</table>"
        document.getElementById("mazo").innerHTML = codigoHTML;
    }

    functionPedirCartas() {
        if (partida.haFinalizado()) {
            console.log("PARTIDA FINALIZADA!!");
        }
        else
            setTimeout(pedirCartas(), 5000)
    }
}