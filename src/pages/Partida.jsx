import React, { useEffect, useState } from "react";
import Cartas from "../components/Cartas";

import { useParams } from "react-router-dom";

import { Context } from "../context/Context";
import Mesa from "../components/Mesa";

function Partida() {
  const { socket, CartasMesa } = Context();
  const [datas, setGlobalPokemons] = useState([]);
  const [nombre, setnombre] = useState([]);
  const [getid, setid] = useState([]);
  const [numeracion, setnumeracion] = useState([]);
  const [cartaSeleccionada, setCartaSeleccionada] = useState(null);
  const [contador, setcontador] = useState(0);
  const [ronda, setronda] = useState(1);
  const { juego } = useParams();

  useEffect(() => {
    socket.emit("jugadoresjuego", juego);
    socket.on("jugadoresId", (nombre, id) => {
      setnombre(nombre);
      setid(id);
    });

    socket.emit("iniciar", juego);
    socket.on("cartass", async (cartasJugador, numeracion) => {
      setnumeracion(numeracion);
      setGlobalPokemons([]);
      const results = await Promise.all(
        cartasJugador.map(async (pokemon) => {
          const res = await fetch(pokemon);
          return res.json();
        })
      );
      setGlobalPokemons(results);
    });
    
  }, [socket]);

  const handlecont = (e) => {
    e.preventDefault();
    setronda(ronda + 1);
  };

  // const handleCambiarCarta = () => {
  //   for(let i=0; i < contador ; i++){
  //     setCartaSeleccionada(datas[i]);
  //   }

  const handleCambiarCarta = () => {
    if (contador < datas.length) {
      setCartaSeleccionada(datas[contador]);
      setcontador(contador + 1);
      // if (cartaSeleccionada) {
      //   const cartaSecuencia = secuencia[posicion];
      //   if (
      //     cartaSeleccionada.numero + cartaSeleccionada.tipo ===
      //     cartaSecuencia
      //   ) {
      //     setPosicion(posicion + 1);
      //     console.log("Posición actual:", posicion);
      //   } else {
      //     console.log("El jugador ha perdido");
      //   }
      // }
    }
  };

  return (
    <div className="bg-dark">
      <div className=" container bg-dark " style={{ height: "120vh" }}>
        <div className="row">
          <h1 className="mx-2 mt-2 text-danger">
            Jugador:{" "}
            {nombre.map((jugador, index) => {
              if (getid[index] === socket.id) {
                return (
                  <span className="text-white" key={index}>
                    {jugador}
                  </span>
                );
              }
            })}
          </h1>

          <div className="col-4   ">
            <div className=" gap-2  flex-wrap">
              <Cartas
                cartaSeleccionada={cartaSeleccionada}
                numeracion={numeracion}
                contador={contador}
                juego={juego}
                ronda={ronda}
              />
            </div>
            <button
              className="btn btn-primary w-75 mt-2"
              onClick={handleCambiarCarta}
            >
              Cambiar Carta
            </button>
          </div>
          <div className="col-8 bg-danger ">
            <Mesa />

            {/* sdasd */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Partida;
