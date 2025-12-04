import "./BarraPesquisa.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function BarraPesquisa() {
    const [palavra, setPalavra] = useState("");
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Cria uma função assíncrona dentro do useEffect
        const buscarEventos = async () => {
            if (palavra.length < 3) {
                return;
            }

            if (palavra.trim() === "") {
                setResultados([]);
                return;
            }

            setLoading(true);
            try {
                const encodedSearch = encodeURI(palavra)
                console.log('buscando no axios', encodedSearch)
                const response = await axios.get(`http://localhost:3000/api/eventos/search?q=${encodedSearch}`);
                setResultados(response.data);
            } catch (error) {
                console.error("Erro ao buscar eventos:", error);
                setResultados([]);
            } finally {
                setLoading(false);
            }
        };

        // Debounce: só executa após 1s sem digitação
        const timer = setTimeout(() => {
            buscarEventos();
        }, 2000);

        // cancela a busca se o usuário continuar digitando
        return () => clearTimeout(timer);
    }, [palavra]);

    return (
        <div>
            <input 
                type="text" 
                id="img-lupa" 
                onChange={(e) => setPalavra(e.target.value)}
                className='HomeConv-PesquisaEvento' 
                placeholder="Buscar evento" 
                value={palavra}
            />
            
            {loading && <p>Carregando...</p>}
            
            <ul>
                {Array.isArray(resultados) && resultados.length > 0
                    && resultados.map((evento) => (
                    <li key={evento.id}>{evento.nome}</li>
                    ))}
            </ul>
        </div>
    );
}

export default BarraPesquisa;