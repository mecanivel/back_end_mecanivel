const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./database');  
const customersRoutes = require('./routers/customer_routes');
const MechanicB2BRoutes = require('./routers/mechanic_b2b_router');
const OrdesRoutes = require('./routers/orders_routers');
const CompanyRoutes = require('./routers/company_router');
const auth = require('./routers/router_auth');
const ServicesRouter = require('./routers/service_router');
const authenticateToken = require('./middleware_auth/middleware_auth');

const server = express();
const PORT = 3000; 


server.use(cors());  
server.use(bodyParser.json()); 
server.use('/mecanivel/customers',customersRoutes);
server.use('/mecanivel/mechanics_b2b',MechanicB2BRoutes);
server.use('/mecanivel/company',CompanyRoutes);
server.use('/mecanivel/orders',OrdesRoutes);
server.use('/mecanivel/services',ServicesRouter);
server.use('/auth', auth);

sequelize.authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso ao PostgreSQL.');
  })
  .catch(err => {
    console.error('Erro ao conectar ao PostgreSQL:', err);
  });


sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso.');
  })
  .catch(err => {
    console.error('Erro ao sincronizar as tabelas:', err);
  });

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
