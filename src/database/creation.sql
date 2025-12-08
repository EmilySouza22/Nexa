-- Banco: nexa
CREATE DATABASE nexa;
USE nexa;

-- Tabela: tipo_conta
CREATE TABLE tipo_conta (
  idtipo_conta INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL
);

-- Pra popular os tipos, se não o cadastro não vai
INSERT INTO tipo_conta 
(idtipo_conta, nome) 
VALUES 
(1, 'Usuario'),
(2, 'Organizador');

-- Tabela: conta
CREATE TABLE conta (
  idconta INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  cpf_cnpj VARCHAR(14) NOT NULL UNIQUE,
  telefone VARCHAR(11),
  senha VARCHAR(255) NOT NULL,
  descricao TEXT,
  tipo_contaid INT,
  FOREIGN KEY (tipo_contaid) REFERENCES tipo_conta(idtipo_conta)
);

-- Tabela: categoria_evento
CREATE TABLE categoria_evento (
  idcategoria_evento INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL
);


-- Tabela: endereco_evento
CREATE TABLE endereco_evento (
  idendereco_evento INT PRIMARY KEY AUTO_INCREMENT,
  local VARCHAR(255),
  rua VARCHAR(255),
  complemento VARCHAR(255),
  bairro VARCHAR(255),
  cidade VARCHAR(255),
  estado VARCHAR(255),
  cep VARCHAR(8),
  numero VARCHAR(10)
);


-- Tabela: evento
CREATE TABLE evento (
  idevento INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  assunto_principal VARCHAR(255),
  classificacao VARCHAR(255),
  data_inicio DATETIME,
  data_termino DATETIME,
  evento_ativo BOOLEAN DEFAULT TRUE,
  conta_id INT,
  categoria_eventoid INT,
  endereco_eventoid INT,
  FOREIGN KEY (conta_id) REFERENCES conta(idconta),
  FOREIGN KEY (categoria_eventoid) REFERENCES categoria_evento(idcategoria_evento),
  FOREIGN KEY (endereco_eventoid) REFERENCES endereco_evento(idendereco_evento)
);


-- Tabela: tipo ingresso
CREATE TABLE tipo_ingresso (
  idtipo_ingresso INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL
);


-- Tabela: ingresso
CREATE TABLE ingresso (
  idingresso INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(255) NOT NULL,
  quantidade INT,
  vendidos INT DEFAULT 0,
  valor_unitario DECIMAL(8,2),
  data_inicio DATETIME,
  data_termino DATETIME,
  max_qtd_por_compra INT,
  tipo_ingressoid INT,
  evento_id INT,
  FOREIGN KEY (tipo_ingressoid) REFERENCES tipo_ingresso(idtipo_ingresso),
  FOREIGN KEY (evento_id) REFERENCES evento(idevento)
);


-- Tabela: venda_ingresso
CREATE TABLE venda_ingresso (
  idvenda_ingresso INT PRIMARY KEY AUTO_INCREMENT,
  quantidade INT,
  valor_total DECIMAL(8,2),
  data_venda DATETIME DEFAULT CURRENT_TIMESTAMP,
  conta_id INT,
  ingresso_id INT,
  FOREIGN KEY (conta_id) REFERENCES conta(idconta),
  FOREIGN KEY (ingresso_id) REFERENCES ingresso(idingresso)
);


-- Tabela: pagamento
CREATE TABLE pagamento (
  idpagamento INT PRIMARY KEY AUTO_INCREMENT,
  valor_a_receber DECIMAL(8,2),
  forma_pagamento ENUM('Cartão', 'Pix', 'Boleto') NOT NULL,
  status_pagamento ENUM('Pendente', 'Pago', 'Cancelado') DEFAULT 'Pendente',
  data_pagamento DATETIME,
  venda_ingressoid INT,
  FOREIGN KEY (venda_ingressoid) REFERENCES venda_ingresso(idvenda_ingresso)
);

SELECT * FROM conta;