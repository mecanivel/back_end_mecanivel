// Importações necessárias
const fs = require('fs');
const { Sequelize } = require('sequelize');
const Company = require('./models/company'); // Substitua pelo caminho correto do seu model

// Função para carregar a imagem do sistema de arquivos
function loadImage(filePath) {
    return fs.readFileSync(filePath);  // Lê a imagem e retorna um buffer binário
}

// Função para criar uma nova empresa (Company) com uma imagem
async function createCompany() {
    try {
        // Carregar a imagem como um buffer binário
        const imageBuffer = loadImage('./Screenshot 2024-10-22 113547.png');  // Substitua pelo caminho correto da imagem

        // Dados da empresa que será criada
        const companyData = {
            name: "mecanica fastcar",       // Nome da empresa
            cnpj: "12345678000190",        // CNPJ da empresa
            image: imageBuffer,
            phone:"+5545999036871",
            address:"Rua otelo celestino de castilhos 1123 parque verde cascavel pr"       // Passa a imagem como binário (buffer)
        };

        // Criação do registro no banco de dados
        const company = await Company.create(companyData);

        console.log('Empresa criada com sucesso:', company);
    } catch (error) {
        console.error('Erro ao criar empresa:', error);
    } finally {
        process.exit();
    }
}

// Executa a função para criar a empresa
createCompany();
