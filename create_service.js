// Importações necessárias
const fs = require('fs');
const { Sequelize } = require('sequelize');
const Service = require('./models/service'); // Substitua pelo caminho correto do seu model

// Função para carregar a imagem do sistema de arquivos
function loadImage(filePath) {
    return fs.readFileSync(filePath);  // Lê a imagem e retorna um buffer binário
}

// Função para criar uma nova empresa (Company) com uma imagem
async function createCompany() {
    try {
        // Carregar a imagem como um buffer binário
        const imageBuffer = loadImage('./alinhamento.png');  // Substitua pelo caminho correto da imagem
        console.log(imageBuffer);
        
        // Dados da empresa que será criada
        const serviceData = {
          description:"Alinhamento e Balanceamento",
          image:imageBuffer   // Passa a imagem como binário (buffer)
        };

        // Criação do registro no banco de dados
        const service = await Service.create(serviceData);

        console.log('Empresa criada com sucesso:', service);
    } catch (error) {
        console.error('Erro ao criar empresa:', error);
    } finally {
        process.exit();
    }
}

// Executa a função para criar a empresa
createCompany();
