const express = require('express');
const dados = require('./dados.json'); // Importa JSON 
const path = require('path');

const app = express();
const port = 3000;

//Exércicio 5
app.use(express.static(path.join(__dirname)));

// Rota para servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//Exercício 3
app.get('/faturamento', (req, res) => {
   
    const faturamentoDia = dados.filter(item => item.valor > 0);//receber primeiro valor maior que 0

    
    const menorValor = Math.min(...faturamentoDia.map(item => item.valor)); //... = usado pois foi usado  as funções min e max
    const maiorValor = Math.max(...faturamentoDia.map(item => item.valor));//cria novo array = .map

    
    const soma = faturamentoDia.reduce((total, item) => total + item.valor, 0);//cria novo array com função acumuladora
    const mediaMensal = soma / faturamentoDia.length;//tamanho total do meu array

 
    const diasAcimaMedia = faturamentoDia.filter(item => item.valor > mediaMensal).length; //filtrar dia , e armazenar em item, o dia , em todo o array, que ultrapassou a media mensal

    res.json({
        menorValor: menorValor,
        maiorValor: maiorValor,
        diasAcimaMedia: diasAcimaMedia
    });
});
//Exercício 4
app.get('/porcentagem', (req, res) => {
    const faturamentoPorEstado = {
        SP: 67836.43,
        RJ: 36678.66,
        MG: 29229.88,
        ES: 27165.48,
        Outros: 19849.53
    };

    const totalFaturamento = Object.values(faturamentoPorEstado).reduce((total, valor) => total + valor, 0);//retorna array com o valor do obj, REDUCE (soma valores)

    //for ... in
    const percentualPorEstado = {};
    for(const estado in faturamentoPorEstado) {
        const valor = faturamentoPorEstado[estado];
        const porcentagem = (valor / totalFaturamento) * 100;
        percentualPorEstado[estado] = `${porcentagem.toFixed(2)}%`;
    }
    res.json({
        porcentagem : percentualPorEstado
    })
})




app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
