import React from 'react'

export default function GuideList({ guide }) {
    return (
        <div>
          <h1>Guía de Estudio</h1>
          <h2>{guide["Guia de estudio"]}</h2>
          <h3>Pasos:</h3>
          <ul>
            {guide.Pasos.map((step, index) => (
              <p key={index}>{step}</p>
            ))}
          </ul>
        </div>
      );
}
