
	drop database if exists dataryzer;
    create database dataryzer;
    
	use dataryzer;

	-- MODELAGEM BASICA, SEM RELACIONAMENTO COM AS TABELAS 
	create table distribuidora (
	id_distribuidora	int primary key auto_increment not null,
	cnpj				varchar(50) not null,
	nome				varchar(100) not null,
	sigla				varchar(10) not null,
	codigo_associacao_master 	varchar(10) 
	);


	select * from distribuidora;

	create table grupo (
	id_grupo            int primary key auto_increment,
	nome                varchar (10) not null
	);


	create table unidade_consumidora(
		id_unidade_consumidora	int primary key auto_increment not null,
		nome				varchar(50) not null,
		fk_distribuidora    int,
		fk_grupo            int,
		constraint fk_distribuidora_unidade_consumidora foreign key (fk_distribuidora) references distribuidora(id_distribuidora),
		constraint fk_grupo_unidade_consumidora foreign key (fk_grupo) references grupo(id_grupo)
	);

	select * from unidade_consumidora;

	create table filtro(
	id_filtro           int primary key auto_increment,
	nome                varchar (10) not null,
	data_inicio         date not null,
	data_fim            date not null
	);

	create table usuario(
	id_usuario			int primary key auto_increment not null,
	nome 				varchar(50) not null,
	tipo_usuario		varchar(50) not null, 
	telefone			varchar(15) not null,
	email				varchar(50) not null,
	senha				varchar(50) not null,
	fk_unidade_consumidora int,
	fk_distribuidora 	int not null,
	fk_filtro           int,
	constraint fk_unidade_consumidora_usuario foreign key (fk_unidade_consumidora) references unidade_consumidora(id_unidade_consumidora),
	constraint fk_distribuidora_usuario foreign key (fk_distribuidora) references distribuidora(id_distribuidora),
	constraint fk_filtro_usuario foreign key (fk_filtro) references filtro(id_filtro)
	);

	select * from usuario;
    delete from usuario where id_usuario = 1;
    update usuario set nome = '${nome}',
		email = '${email}',
		telefone = '${telefone}'
        where id_usuario = 1;
    select id_usuario, usuario.nome as diretor,
    distribuidora.nome as distribuidora,
    unidade_consumidora.nome as unidade_consumidora
    from usuario join distribuidora
    on fk_distribuidora = id_distribuidora
    join unidade_consumidora
    on fk_unidade_consumidora = id_unidade_consumidora 
    where id_usuario like '%1%' order by id_usuario;

	create table motivo(
	id_motivo			int primary key auto_increment,
	nome				varchar(100)
	);

	select * from motivo;

	create table interrupcao(
	id_interrupcao		int not null,
	dt_inicio			datetime not null,
	dt_fim				datetime not null,
	duracao INT GENERATED ALWAYS AS (TIMESTAMPDIFF(MINUTE, dt_inicio, dt_fim)) STORED,
	fk_unidade_consumidora int not null,
	fk_motivo 			int not null,
	constraint pk_interrupcao primary key(id_interrupcao, fk_unidade_consumidora, fk_motivo),
	constraint fk_unidade_consumidora_interrupcao foreign key (fk_unidade_consumidora) references unidade_consumidora(id_unidade_consumidora),
	constraint fk_motivo_interrupcao foreign key (fk_motivo) references motivo(id_motivo)
	);

	select * from interrupcao;

	create table notificacao(
	id_notificacao		int not null,
	data_hora 			datetime not null,
	tipo 				varchar(45) not null,
	mensagem			varchar(45) not null,
	fk_unidade_consumidora int not null,
	fk_distribuidora	int not null,
	constraint pk_notificacao primary key(id_notificacao, fk_unidade_consumidora, fk_distribuidora),
	constraint fk_unidade_consumidora_notificacao foreign key (fk_unidade_consumidora) references unidade_consumidora(id_unidade_consumidora),
	constraint fk_distribuidora_notificacao foreign key (fk_distribuidora) references distribuidora(id_distribuidora)
	);


-- TAbela log atualizada
	create table log(
    id_log 				int primary key auto_increment not null,
    data_hora 			timestamp default current_timestamp,
    nivel				varchar(15) not null,
    mensagem			varchar(255) not null,
    mensagem_log		varchar(255) not null
    );
     -- fim tabela log

-- Inserir grupos para possibilitar chave estrangeira em unidade_consumidora
-- 1. Distribuidora
INSERT INTO distribuidora (cnpj, nome, sigla, codigo_associacao_master)
VALUES 
('11111111111111', 'IEBA Energia', 'IEBA', '123');

-- 2. Grupo
INSERT INTO grupo (nome)
VALUES 
('Grupo A'), ('Grupo B');

-- 3. Unidade Consumidora
INSERT INTO unidade_consumidora (nome, fk_distribuidora, fk_grupo)
VALUES 
('UC1', 1, 1),
('UC2', 1, 1),
('UC3', 1, 2);

-- 4. Filtro
INSERT INTO filtro (nome, data_inicio, data_fim)
VALUES 
('Filtro1', '2025-01-01', '2025-12-31'),
('Filtro2', '2025-02-01', '2025-12-31');

-- 5. Usuário
INSERT INTO usuario (nome, tipo_usuario, telefone, email, senha, fk_unidade_consumidora, fk_distribuidora, fk_filtro)
VALUES 
('João Silva', 'REGIONAL', '11999999999', 'joao@email.com', 'senha123', 1, 1, 1),
('Maria Costa', 'REGIONAL', '11988888888', 'maria@email.com', 'senha456', 2, 1, 1);


-- 6. Motivo
INSERT INTO motivo (nome)
VALUES 
('Manutenção programada'),
('Falha na rede'),
('Evento climático');

-- 7. Interrupção
INSERT INTO interrupcao (id_interrupcao, dt_inicio, dt_fim, fk_unidade_consumidora, fk_motivo)
VALUES 
(976637, '2025-01-09 16:50:43', '2025-01-09 18:21:52', 1, 1),
(976638, '2025-02-21 15:57:47', '2025-02-21 18:59:57', 2, 1),
(976639, '2025-02-27 11:55:33', '2025-02-27 18:26:36', 3, 2),
(976640, '2025-03-10 08:30:00', '2025-03-10 09:15:00', 1, 3);

-- 8. Notificação
INSERT INTO notificacao (id_notificacao, data_hora, tipo, mensagem, fk_unidade_consumidora, fk_distribuidora)
VALUES 
(1, '2025-01-09 16:51:00', 'Aviso', 'Interrupção iniciada.', 1, 1),
(2, '2025-01-09 18:22:00', 'Info', 'Interrupção finalizada.', 1, 1),
(3, '2025-02-21 15:58:00', 'Aviso', 'Falha na rede detectada.', 2, 1),
(4, '2025-02-21 19:00:00', 'Info', 'Serviço restabelecido.', 2, 1);

-- 9. Log
INSERT INTO log (nivel, mensagem, mensagem_log)
VALUES 
('INFO', 'Sistema iniciado', 'Sistema operacional normal'),
('WARN', 'Tentativa de login inválido', 'Usuário: maria@email.com'),
('ERROR', 'Falha ao salvar notificação', 'ID UC inexistente');


SELECT
            d.id_distribuidora AS idDistribuidora,
            d.nome AS distribuidora,
            uc.nome AS unidade_consumidora,
            i.dt_inicio AS data_inicio,
            i.dt_fim AS data_fim,
            i.duracao,
            m.nome AS motivo
        FROM
            interrupcao i
        JOIN unidade_consumidora uc ON i.fk_unidade_consumidora = uc.id_unidade_consumidora
        JOIN distribuidora d ON uc.fk_distribuidora = d.id_distribuidora
        JOIN motivo m ON i.fk_motivo = m.id_motivo
        ORDER BY
            i.dt_inicio DESC
        LIMIT 50;
        
