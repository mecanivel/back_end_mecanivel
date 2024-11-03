// Importações necessárias
const fs = require('fs');
const { Sequelize } = require('sequelize');
const Cars = require('./models/cars'); // Substitua pelo caminho correto do seu model

// Função para carregar a imagem do sistema de arquivos
function loadImage(filePath) {
    return fs.readFileSync(filePath);  // Lê a imagem e retorna um buffer binário
}

// Função para criar uma nova empresa (Company) com uma imagem
async function createCompany() {
    try {
        // Carregar a imagem como um buffer binário
        const imageBuffer = loadImage('./Volkswagen_Jetta_VII_IMG_2964.jpg');  // Substitua pelo caminho correto da imagem

        // Dados da empresa que será criada
        const carData = {
            car_name: "carro 2 do cliente 2",       // Nome da empresa
            kms_driven:"40.000",        // CNPJ da empresa
            image: imageBuffer,
            pneu_status:"BOM",
            oil_status:"BOM",
            brake_pads_status:"BOM",
            customer_id:"bdc9752d-596d-4df2-bc8f-5d2ca5559b89"       
        };

        // Criação do registro no banco de dados
        const car = await Cars.create(carData);

        console.log('Empresa criada com sucesso:', car);
    } catch (error) {
        console.error('Erro ao criar empresa:', error);
    } finally {
        process.exit();
    }
}

// Executa a função para criar a empresa
createCompany();
