DROP DATABASE IF EXISTS dataryzer;
CREATE DATABASE dataryzer;
/* Script para criação do banco de dados DataRyzer atualizada com a relação de grupos */
/* A ordem da criação das tabelas foi alterada para facilitar o relacionamento entre elas */

USE dataryzer;

CREATE TABLE distribuidora (
    id_distribuidora            INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    cnpj                        VARCHAR(50) NOT NULL,
    nome                        VARCHAR(100) NOT NULL,
    sigla                       VARCHAR(10) NOT NULL,
    codigo_associacao_master    VARCHAR(10)
);

SELECT * FROM distribuidora;

CREATE TABLE grupo (
    id_grupo    INT PRIMARY KEY AUTO_INCREMENT,
    nome        VARCHAR(20) NOT NULL
);

CREATE TABLE unidade_consumidora (
    id_unidade_consumidora  INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome                    VARCHAR(50) NOT NULL,
    fk_distribuidora        INT,
    fk_grupo                INT,
    CONSTRAINT fk_distribuidora_unidade_consumidora FOREIGN KEY (fk_distribuidora) REFERENCES distribuidora(id_distribuidora),
    CONSTRAINT fk_grupo_unidade_consumidora FOREIGN KEY (fk_grupo) REFERENCES grupo(id_grupo)
);

SELECT * FROM unidade_consumidora;

CREATE TABLE filtro (
    id_filtro       INT PRIMARY KEY AUTO_INCREMENT,
    nome            VARCHAR(10) NOT NULL,
    data_inicio     DATE NOT NULL,
    data_fim        DATE NOT NULL
);

CREATE TABLE usuario (
    id_usuario              INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome                    VARCHAR(50) NOT NULL,
    tipo_usuario            VARCHAR(50) NOT NULL,
    telefone                VARCHAR(15) NOT NULL,
    email                   VARCHAR(50) NOT NULL,
    senha                   VARCHAR(50) NOT NULL,
    fk_unidade_consumidora  INT,
    fk_distribuidora        INT NOT NULL,
    fk_filtro               INT,
    CONSTRAINT fk_unidade_consumidora_usuario FOREIGN KEY (fk_unidade_consumidora) REFERENCES unidade_consumidora(id_unidade_consumidora),
    CONSTRAINT fk_distribuidora_usuario FOREIGN KEY (fk_distribuidora) REFERENCES distribuidora(id_distribuidora),
    CONSTRAINT fk_filtro_usuario FOREIGN KEY (fk_filtro) REFERENCES filtro(id_filtro)
);

SELECT * FROM usuario;

ALTER TABLE grupo ADD COLUMN fk_usuario INT;
ALTER TABLE grupo ADD CONSTRAINT fk_usuario_grupo FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario);
select * FROM grupo;

CREATE TABLE motivo (
    id_motivo   INT PRIMARY KEY AUTO_INCREMENT,
    nome        VARCHAR(100)
);

SELECT * FROM motivo;

CREATE TABLE interrupcao (
    id_interrupcao          INT NOT NULL,
    dt_inicio               DATETIME NOT NULL,
    dt_fim                  DATETIME NOT NULL,
    duracao                 INT GENERATED ALWAYS AS (TIMESTAMPDIFF(MINUTE, dt_inicio, dt_fim)) STORED,
    fk_unidade_consumidora  INT NOT NULL,
    fk_motivo               INT NOT NULL,
    CONSTRAINT pk_interrupcao PRIMARY KEY(id_interrupcao, fk_unidade_consumidora, fk_motivo),
    CONSTRAINT fk_unidade_consumidora_interrupcao FOREIGN KEY (fk_unidade_consumidora) REFERENCES unidade_consumidora(id_unidade_consumidora),
    CONSTRAINT fk_motivo_interrupcao FOREIGN KEY (fk_motivo) REFERENCES motivo(id_motivo)
);

SELECT * FROM interrupcao;

CREATE TABLE log (
    id_log          INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    data_hora       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    nivel           VARCHAR(15) NOT NULL,
    mensagem        VARCHAR(255) NOT NULL,
    mensagem_log    VARCHAR(255) NOT NULL
);


select * from distribuidora;

update distribuidora
set codigo_associacao_master = 123
where id_distribuidora =1;

select * from usuario;

CREATE TABLE parametrizacao(
	id INT PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(200),
    receber_notificacao BOOLEAN,
    frequencia_notificacao VARCHAR(45),
    proxima_notificaco DATE,
    fk_distribuidora INT,
    CONSTRAINT fk_distribuidora_parametrizacao FOREIGN KEY (fk_distribuidora) REFERENCES distribuidora(id_distribuidora)
    );
    