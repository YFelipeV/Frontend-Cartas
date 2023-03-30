import React, { useState } from "react";

import { Context } from "../context/Context";

function Cartas(props) {
  const { CartasMesa, setCartasMesa, socket,setcartapokemones } = Context();
  const { cartaSeleccionada, numeracion, contador, juego, ronda } = props;
  const [poder, setpoder] = useState(null);

  const handlePoderes = (e) => {
    e.preventDefault();
    const poderSeleccionado = {
      carta: cartaSeleccionada.name,
      poder: poder,
      numeracion: numeracion[contador - 1],
      imagen: `https://robohash.org/${contador}`,
      ronda: ronda,
    };

    socket.emit("carta-mesa", juego, poderSeleccionado);
    socket.on("cartas-mesa", (data) => {
        setcartapokemones(data);
      });
  };
  return (
    <>
      {cartaSeleccionada && (
        <>
          <div
            className="card mb-3 bg-dark border-danger text-white mt-5 "
            style={{ width: "16rem" }}
          >
            <div className="card-body bg-primary ">
              <h5>{numeracion[contador - 1]}</h5>
              <div className="d-flex justify-content-center ">
                <img
                  src={`https://robohash.org/${contador}`}
                  className="card-img-top bg-dark w-75 rounded-circle"
                  alt="..."
                />
              </div>
            </div>
            <h5 className="text-center mt-2">{cartaSeleccionada.name}</h5>
            <div className="card-footer gap-3 d-flex justify-content-around">
              <div className="card-footer-social  text-center">
                <h5 className="text-center">
                  {cartaSeleccionada.stats[1].base_stat}A
                </h5>
                <p className=" opacity-50">Ataque</p>
              </div>

              <div className="card-footer-social  ">
                <h5 className="text-center">
                  {cartaSeleccionada.stats[2].base_stat}A
                </h5>
                <p className=" opacity-50">Defensa</p>
              </div>
              <div className="card-footer-social ">
                <h5 className="text-center">
                  {cartaSeleccionada.stats[3].base_stat}A
                </h5>
                <p className=" opacity-50">Ataque E</p>
              </div>
            </div>
          </div>
          <form onSubmit={handlePoderes}>
            <select
              className="form-select w-75"
              onChange={(e) => setpoder(e.target.value)}
            >
              <option value={cartaSeleccionada.stats[1].base_stat}>
                Ataque
              </option>
              <option value={cartaSeleccionada.stats[2].base_stat}>
                Defensa
              </option>
              <option value={cartaSeleccionada.stats[3].base_stat}>
                Ataque Especial
              </option>
            </select>
            <button className="btn btn-danger w-75 mt-2">Enviar</button>
          </form>
        </>
      )}
    </>
  );
}

export default Cartas;
