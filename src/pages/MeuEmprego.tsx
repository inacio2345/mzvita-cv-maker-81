
import React, { useState } from 'react';

const MeuEmprego = () => {
  const [cidade, setCidade] = useState('');
  const [tipo, setTipo] = useState('');
  const [resultados, setResultados] = useState('');

  const buscarEmpresas = async () => {
    const cidadeValue = cidade.trim();
    const tipoValue = tipo.trim();
    setResultados("Buscando empresas...");

    if (!cidadeValue || !tipoValue) {
      setResultados("Por favor, preencha a cidade e o tipo de empresa.");
      return;
    }

    const apiKey = "3c94218522294e3a9b2e04a4dd2291b3";

    try {
      // 1. Geocodificar a cidade
      const geoResp = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(cidadeValue)}&apiKey=${apiKey}`);
      const geoData = await geoResp.json();

      if (!geoData.features.length) {
        setResultados("Cidade não encontrada.");
        return;
      }

      const { coordinates } = geoData.features[0].geometry;
      const [lon, lat] = coordinates;

      // 2. Buscar empresas próximas
      const categorias = "commercial";
      const radius = 5000; // raio em metros
      const placesURL = `https://api.geoapify.com/v2/places?categories=${categorias}&filter=circle:${lon},${lat},${radius}&limit=20&apiKey=${apiKey}`;
      const placesResp = await fetch(placesURL);
      const placesData = await placesResp.json();

      if (!placesData.features.length) {
        setResultados("Nenhuma empresa encontrada.");
        return;
      }

      // 3. Filtrar por tipo digitado (ex: supermercado)
      const filtrados = placesData.features.filter((place: any) => {
        const nome = (place.properties.name || "").toLowerCase();
        return nome.includes(tipoValue.toLowerCase());
      });

      if (!filtrados.length) {
        setResultados("Nenhuma empresa encontrada com esse tipo.");
        return;
      }

      const resultadosHTML = filtrados.map((place: any) => {
        const nome = place.properties.name || "Nome não disponível";
        const endereco = place.properties.address_line1 || "Endereço não disponível";
        const link = `https://www.openstreetmap.org/?mlat=${place.geometry.coordinates[1]}&mlon=${place.geometry.coordinates[0]}#map=18`;

        return `<div style="border: 1px solid #ccc; padding: 10px; margin-top: 10px; border-radius: 8px;">
          <strong>${nome}</strong><br>${endereco}<br>
          <a href="${link}" target="_blank">Ver no mapa</a>
        </div>`;
      }).join('');

      setResultados(resultadosHTML);

    } catch (error) {
      console.error(error);
      setResultados("Erro ao buscar empresas.");
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Encontre Empresas Perto de Você</h1>

      <label htmlFor="cidade">Cidade:</label>
      <input 
        type="text" 
        id="cidade" 
        placeholder="Ex: Maputo" 
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        style={{ padding: '10px', margin: '5px 0', width: '100%', maxWidth: '400px' }}
      />

      <label htmlFor="tipo">Tipo de empresa:</label>
      <input 
        type="text" 
        id="tipo" 
        placeholder="Ex: supermercado, farmácia, escola..." 
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        style={{ padding: '10px', margin: '5px 0', width: '100%', maxWidth: '400px' }}
      />

      <button 
        onClick={buscarEmpresas}
        style={{ padding: '10px', margin: '5px 0', width: '100%', maxWidth: '400px' }}
      >
        Buscar
      </button>

      <div dangerouslySetInnerHTML={{ __html: resultados }} />
    </div>
  );
};

export default MeuEmprego;
