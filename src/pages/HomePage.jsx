import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CrearSala from "../components/CrearSala";
import Swal from "sweetalert2";
import fondo from "../assets/fondo1.avif";
import { Context } from "../context/Context";

function HomePage() {
  const { socket } = Context();
  const navigate = useNavigate();
  const [room, setrooom] = useState("");
  const [nombre, setnombre] = useState("");

  const handleOnsumbit = (e) => {
    e.preventDefault();

    socket.emit("unirse-juego", room, nombre);
    socket.on("unido-juegos", (data) => {
      navigate(`/sala/${data}`);
    });

    socket.on("usuario-conectado", (message) => {
      Swal.fire({
        icon: "success",
        title: message,
        timer: 1500,
      });
    });
    socket.on("max-jugadores", (message) => {
      Swal.fire({
        icon: "error",
        title: message,
        timer: 1500,
      });
    });
    socket.on("codigo-invalido", (message) => {
      Swal.fire({
        icon: "error",
        title: message,
        timer: 1500,
      });
    });
  };
  return (
    <div>
      <>
        <div className="container-fluid  p-0">
          <div className="row hv-100" style={{ height: "700px" }}>
            <div className="col-12 d-flex justify-content-center">
              <img src={fondo} className="p-0 w-100 " alt="" />
              <div className="d-flex justify-content-start mt-5  position-absolute">
                <div className=" bg-dark rounded p-5  mt-5 text-white">
                  <h1 className="mb-4">Siigo Match Battle🕹️</h1>
                  <div className="d-flex justify-content-center w-100   ">
                    <form className="w-100" onSubmit={handleOnsumbit}>
                      <input
                        type="text"
                        className="form-control p-2  w-100  "
                        onChange={(e) => setrooom(e.target.value)}
                        placeholder="ingrese id de sala"
                      />
                      <input
                        type="text"
                        className="form-control p-2 mt-3  w-100  "
                        onChange={(e) => setnombre(e.target.value)}
                        placeholder="ingrese su nombre"
                      />

                      <button className="btn btn-success p-2 mt-4 w-100 ">
                        Unirse a Partida
                      </button>
                    </form>
                  </div>
                  <button
                    className="btn btn-primary mt-2 w-100 p-2"
                    data-bs-toggle="modal"
                    data-bs-target="#modalId"
                  >
                    Crear Partida
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CrearSala />
      </>
    </div>
  );
}

export default HomePage;
