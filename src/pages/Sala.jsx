import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import Swal from "sweetalert2";

function Sala() {
  const { socket } = Context();
  const navigate = useNavigate();
  const codigos = localStorage.getItem("codigo");
  const [nick, setNick] = useState([]);
  const [id, setid] = useState([]);
  let { sala } = useParams();

  useEffect(() => {
    socket.on("unido-juegos", (data) => {
      console.log(data);
    });

    socket.on("nick", (nombre, id) => {
      setNick(nombre);
      setid(id);
    });

    socket.on("iniciar-juego", () => {
      navigate(`/juego/${sala}`);
    });

    
  }, [socket]);

  const handleJuego = () => {
    socket.emit("iniciar", codigos);

    socket.on("validacionjugador", () => {
      Swal.fire({
        icon: "error",
        text: "se necesitan 2 jugadores para poder iniciar el juego",
      });
    });
  };

  return (
    <div
      className="container-fluid bg-dark justify-content-center"
      style={{ height: "100vh" }}
    >
      {codigos ? (
        <div className="d-flex justify-content-center pt-4">
          <h1 className="text-white mx-5 ">
            Numero de Sala :{" "}
            <span className="text-danger mx-4"> {codigos}</span>
          </h1>
        </div>
      ) : (
        <span className="pt-2 d-flex justify-content-center ">
          <h1 className="text-white">
            Numero de Sala <span className="text-danger">: {sala}</span>
          </h1>
        </span>
      )}

      <div className="row mt-5 mx-5  ">
        <div className="d-flex justify-content-center w-100 mt-5">
          {nick.map((jugador, index) => {
            if (id[index] === socket.id) {
              return (
                <div className="col-md-2 flex-wrap mx-4" key={index}>
                  <span className="text-white w-100 btn btn-danger">
                    {jugador}🎮
                  </span>
                </div>
              );
            } else {
              return (
                <div className="col-md-2 flex-wrap mx-3" key={index}>
                  <p className="  btn bg-white  w-100  text-dark">
                    {jugador}🎮
                  </p>
                </div>
              );
            }
          })}
        </div>
      </div>

      {codigos ? (
        <div className="d-flex justify-content-center">
          <div className="mt-5">
            <button
              onClick={handleJuego}
              className={"btn btn-danger mt-5 p-2 fs-6"}
            >
              Iniciar Juego🪙
            </button>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <h3 className="text-white text-text-center mt-5">
            Esperando Jugadores...
          </h3>
        </div>
      )}
    </div>
  );
}

export default Sala;
