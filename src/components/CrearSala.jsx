import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context}  from "../context/Context";

function CrearSala() {
  const navigate = useNavigate();
  const { socket } = Context();
  const [nombre, setnombre] = useState("");

  const handleOnsumbit = (e) => {
    e.preventDefault();
    console.log(nombre);
    socket.emit("join-server", nombre),
      socket.on("user", (data) => {
        console.log(data);
      });
    socket.emit("crear-juego", nombre);
    socket.on("juego-creado", (data) => {
      console.log(data);
      const { username, id, codigo } = data;
      localStorage.setItem("nombre", username);
      localStorage.setItem("id", id);
      localStorage.setItem("codigo", codigo);

      navigate(`/sala/${codigo}`);
    });
  };
  return (
    <div>
      <div>
        <div
          className="modal fade bg-dark-90"
          id="modalId"
          tabIndex="-1"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="modalTitleId"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md"
            role="document"
          >
            <div className="modal-content mb-5">
              <div className="modal-header">
                <h5 className="modal-title" id="modalTitleId">
                  Creando Sala 🕹️
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form className="modal-body w-100" onSubmit={handleOnsumbit}>
                <div className=" ">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Ingrese su nickname"
                    onChange={(e) => setnombre(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-dark w-100 p-2"
                    data-bs-dismiss="modal"
                  >
                    Creando Sala
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearSala;
