
use dataryzer;

-- MODELAGEM BASICA, SEM RELACIONAMENTO COM AS TABELAS 
create table distribuidora (
id_distribuidora	int primary key auto_increment not null,
cnpj				varchar(50) not null,
nome				varchar(50) not null,
sigla				char(2) not null,
codigo_associacao_master 	varchar(10) 
);

INSERT INTO distribuidora (cnpj, nome, sigla, codigo_associacao_master)
VALUES ('11111', 'ieba', 'tl', '123');

create table grupo (
id_grupo            int primary key auto_increment,
nome                varchar (10) not null
);


create table cidade(
id_cidade			int primary key auto_increment not null,
nome				varchar(50) not null,
fk_distribuidora    int not null,
fk_grupo            int,
constraint fk_distribuidora_cidade foreign key (fk_distribuidora) references distribuidora(id_distribuidora),
constraint fk_grupo_cidade foreign key (fk_grupo) references grupo(id_grupo)
);


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
fk_cidade 			int,
fk_distribuidora 	int not null,
fk_filtro           int,
constraint fk_cidade_usuario foreign key (fk_cidade) references cidade(id_cidade),
constraint fk_distribuidora_usuario foreign key (fk_distribuidora) references distribuidora(id_distribuidora),
constraint fk_filtro_usuario foreign key (fk_filtro) references filtro(id_filtro)
);


create table motivo(
id_motivo			int primary key auto_increment,
nome				varchar(50),
numero				int 
);

create table interrupcao(
id_interrupcao		int auto_increment not null,
dt_inicio			datetime not null,
dt_fim				datetime not null,
descricao			varchar(45),
duracao_minuto		int not null,
fk_cidade 			int not null,
fk_motivo 			int not null,
constraint pk_interrupcao primary key(id_interrupcao, fk_cidade, fk_motivo),
constraint fk_cidade_interrupcao foreign key (fk_cidade) references cidade(id_cidade),
constraint fk_motivo_interrupcao foreign key (fk_motivo) references motivo(id_motivo)
);



create table notificacao(
id_notificacao		int not null,
data_hora 			datetime not null,
tipo 				varchar(45) not null,
mensagem			varchar(45) not null,
fk_cidade			int not null,
fk_distribuidora	int not null,
constraint pk_notificacao primary key(id_notificacao, fk_cidade, fk_distribuidora),
constraint fk_cidade_notificacao foreign key (fk_cidade) references cidade(id_cidade),
constraint fk_distribuidora_cidade_notificacao foreign key (fk_distribuidora) references distribuidora(id_distribuidora)
);


create table log(
idLog 				int primary key auto_increment not null,
mensagem			varchar(100),
data_hora 			datetime not null,
tipo_processo		varchar(45) not null
);


