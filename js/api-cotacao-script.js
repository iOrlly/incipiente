// Este script deve ser criado na pasta 'js' e linkado na página api-cotacao.html
document.addEventListener('DOMContentLoaded', () => {
    // Lógica para destacar o link da página atual na navegação (copiado de script.js)
    const highlightActiveLink = () => {
        const currentPath = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.sidebar nav ul li a');

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };
    highlightActiveLink();

    // Lógica da demonstração da API de cotação
    const moedaBaseSelect = document.getElementById('moeda-base');
    const moedaDestinoSelect = document.getElementById('moeda-destino');
    const getCotacaoBtn = document.getElementById('get-cotacao-btn');
    const cotacaoValorSpan = document.getElementById('cotacao-valor');
    const ultimaAtualizacaoSpan = document.getElementById('ultima-atualizacao');
    const jsonResponseCode = document.getElementById('json-response-code');

    // URL base da sua API Python (ajuste quando ela estiver no ar)
    // Durante o desenvolvimento local, será algo como: http://127.0.0.1:8000
    const API_BASE_URL = 'http://127.0.0.1:8000'; // ALtere para a URL da sua API depois de deploy!

    const fetchCotacao = async () => {
        const moedaBase = moedaBaseSelect.value;
        const moedaDestino = moedaDestinoSelect.value;
        const url = `<span class="math-inline">\{API\_BASE\_URL\}/cotacao/</span>{moedaBase}-${moedaDestino}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }
            const data = await response.json();

            // Atualiza a interface
            cotacaoValorSpan.textContent = data.valor_cotacao ? data.valor_cotacao.toFixed(4) : 'N/A';
            ultimaAtualizacaoSpan.textContent = data.data_hora || 'N/A';
            jsonResponseCode.textContent = JSON.stringify(data, null, 4); // Exibe JSON formatado

        } catch (error) {
            console.error('Erro ao buscar cotação:', error);
            cotacaoValorSpan.textContent = 'Erro';
            ultimaAtualizacaoSpan.textContent = 'Verifique o console';
            jsonResponseCode.textContent = JSON.stringify({ error: error.message }, null, 4);
        }
    };

    // Adiciona evento ao botão
    getCotacaoBtn.addEventListener('click', fetchCotacao);

    // Opcional: Carrega uma cotação inicial ao carregar a página
    fetchCotacao();
});