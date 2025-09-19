import React, { useState } from 'react';
import jsPDF from 'jspdf';

export default function App() {
  const [notas, setNotas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');

  const adicionarNota = () => {
    if (!titulo.trim() || !texto.trim()) return;

    const novaNota = {
      id: notas.length + 1,
      titulo,
      texto,
    };
    setNotas([...notas, novaNota]);
    setTitulo('');
    setTexto('');
  };

  const excluirNota = (id) => {
    setNotas(notas.filter((nota) => nota.id !== id));
  };

  const cores = [
    '#ff3cb4ff',
    '#FF5E3A',
    '#5b12d0ff',
    '#4CAF50',
    '#00BCD4',
    '#ca491bff',
    '#607D8B',
    '#a03ab7ff',
    '#cbe91eff',
  ];

  const baixarPDF = () => {
    const doc = new jsPDF();

    notas.forEach((nota, i) => {
      doc.setTextColor(cores[i % cores.length]);
      doc.setFontSize(16);
      doc.text(`${i + 1}. ${nota.titulo}`, 10, 10 + i * 30);
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(nota.texto, 10, 20 + i * 30);
    });

    doc.save('notas.pdf');
  };

  return (
    <div
      style={{
        background: `linear-gradient(135deg, #3B0E5E 0%, #D52487 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'right',
        minHeight: '100vh',
        padding: '100px',
        color: '#ddd',
        fontFamily: "'Roboto Mono', monospace",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #3B0E5E 0%, #D52487 100%)',
          padding: '90px',
          borderRadius: '15px',
          maxWidth: '600px',
          width: '100%',
          boxShadow: '0 0 20px rgba(255, 0, 150, 0.5)',
          textAlign: 'center',
          position: 'relative', 
        }}
      >
        
        <button
          onClick={baixarPDF}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '8px 14px',
            fontSize: '14px',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(90deg, #7D4BFF 0%, #D62487 100%)',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(214, 36, 135, 0.5)',
          }}
        >
          Baixar PDF
        </button>

        <h1 style={{ marginBottom: '20px', fontWeight: 'bold' }}>Notas Post-it</h1>

        <input
          type="text"
          placeholder="Título..."
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={{
            width: '90%',
            padding: '12px 15px',
            marginBottom: '15px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '16px',
            marginLeft: '0',
          }}
        />

        <textarea
          placeholder="Digite sua nota..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows={4}
          style={{
            width: '90%',
            padding: '12px 15px',
            marginBottom: '20px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '16px',
            resize: 'none',
            fontFamily: "'Roboto Mono', monospace",
            marginLeft: '0',
          }}
        />

        <button
          onClick={adicionarNota}
          style={{
            background: 'linear-gradient(90deg, #824DFF 0%, #D62487 100%)',
            border: 'none',
            padding: '12px 25px',
            borderRadius: '10px',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '25px',
            boxShadow: '0 5px 15px rgba(214, 36, 135, 0.6)',
          }}
        >
          Adicionar Nota
        </button>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '20px',
            justifyItems: 'start',
          }}
        >
          {notas.map((nota, idx) => (
            <div
              key={nota.id}
              style={{
                background: '#fff',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                padding: '20px',
                position: 'relative',
                width: '180px',
                boxSizing: 'border-box',
                color: '#333',
                fontFamily: "'Roboto Mono', monospace",
              }}
            >
            
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '10px',
                  borderTopLeftRadius: '15px',
                  borderBottomLeftRadius: '15px',
                  background: cores[idx % cores.length],
                }}
              />

            
              <div
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '10px',
                  fontWeight: 'bold',
                  color: cores[idx % cores.length],
                  fontSize: '18px',
                  userSelect: 'none',
                }}
              >
                {nota.id}
              </div>

              <h3 style={{ margin: '25px 0 10px 20px' }}>{nota.titulo}</h3>
              <p style={{ marginLeft: '20px', fontSize: '14px' }}>{nota.texto}</p>

              <button
                onClick={() => excluirNota(nota.id)}
                style={{
                  marginTop: '15px',
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(90deg, #FF2171 0%, #8115BB 100%)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  boxShadow: '0 4px 8px rgba(255,33,113,0.5)',
                }}
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
