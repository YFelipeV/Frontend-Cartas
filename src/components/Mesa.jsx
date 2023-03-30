import React from "react";
import { Context } from "../context/Context";

function Mesa() {
    const{cartapokemones}=Context()
  return (
    <>
     <h2 className="text-white">Mesa de juego 🪙</h2>
    {cartapokemones.lenght === 0 ? <p className="alert alert-info text-white"> No hay Cartas en Juego </p>:(
        <div className="d-flex flex-wrap gap-4 ">
        {cartapokemones.map((poder, index) => (
          <div
            key={index}
            className="card  bg-dark border-danger text-white"
            style={{ width: "12rem" }}
          >
            <div className="card-body bg-primary">
                <h3>{poder.numeracion}</h3>
              <div className="d-flex justify-content-center ">
                <img
                  src={poder.imagen}
                  className="card-img-top bg-dark w-75 rounded-circle"
                  alt="..."
                />
              </div>
             
            </div>
            <h5 className="text-center mt-2">{poder.carta}</h5>
            <div className="card-footer gap-3 d-flex justify-content-around">
              <div className="card-footer-social  text-center">
                <h5 className="text-center">{poder.poder}A</h5>
                <p className=" opacity-50">Ataque</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
        
    
     
      
    </>
  );
}

export default Mesa;
