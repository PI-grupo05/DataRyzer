create database dataryzer;
use dataryzer;

-- MODELAGEM BASICA, SEM RELACIONAMENTO COM AS TABELAS 
create table distribuidora (
id_distribuidora	int primary key auto_increment not null,
cnpj				varchar(50) not null,
nome				varchar(50) not null,
sigla				char(2) not null,
numero				varchar(15) not null,
codigo_associacao_master 	varchar(10) default (substring(replace(uuid(), '-', ''), 1, 10)) -- gera um codigo aleatorio de ate 10 caracteres para que seja a senha para o usuario criar sua conta no nosso site.
);

create table cidade(
id_cidade			int primary key auto_increment not null,
nome				varchar(50) not null,
fk_distribuidora    int not null,
constraint fk_distribuidora_cidade foreign key (fk_distribuidora) references distribuidora(id_distribuidora)
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
constraint fk_cidade_usuario foreign key (fk_cidade) references cidade(id_cidade),
constraint fk_distribuidora_usuario foreign key (fk_distribuidora) references distribuidora(id_distribuidora)
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


create table fixacao(
id_fixacao 			int not null,
anotacao			varchar(200),
fk_notificacao 		int not null,
fk_cidade			int not null,
fk_distribuidora	int not null,
constraint pk_fixacao primary key(id_fixacao, fk_notificacao, fk_cidade, fk_distribuidora),
constraint fk_notificacao_fixacao foreign key (fk_notificacao) references notificacao(id_notificacao),
constraint fk_cidade_notificacao_fixacao foreign key (fk_cidade) references cidade(id_cidade),
constraint fk_distribuidora_cidade_interrupcao_fixacao foreign key (fk_distribuidora) references distribuidora(id_distribuidora)
);


create table log(
idLog 				int primary key auto_increment not null,
mensagem			varchar(100),
data_hora 			datetime not null,
tipo_processo		varchar(45) not null
);





-- CODIGO ABAIXO É TODA A ESTRUTURA DA MODELAGEM QUE FOI PASSADA NO GRUPO

/*

create table distribuidora (
id_distribuidora 			int primary key auto_increment,
cnpj						varchar(50),
nome						varchar(50),
sigla						char(2),
numero 						varchar(15),
codigo_associacao_master 	varchar(10) default (substring(replace(uuid(), '-', ''), 1, 10))
);


create table cidade (
id_cidade 					int primary key auto_increment,
nome 						varchar(50),
fk_distribuidora 			int,
foreign key (fk_distribuidora) references distribuidora(id_distribuidora)
);

create table usuario (
id_usuario 					int primary key auto_increment,
nome 						varchar(50),
tipo_usuario 				varchar(50),
telefone 					varchar(15),
email 						varchar(50),
senha 						varchar(50),
fk_cidade 					int,
fk_distribuidora 			int,
foreign key (fk_cidade) references cidade(id_cidade),
foreign key (fk_distribuidora) references distribuidora(id_distribuidora)
);

create table motivo (
id_motivo 					int primary key auto_increment,
nome 						varchar(50),
descricao 					varchar(255)
);

create table interrupcao (
id_interrupcao 				int primary key auto_increment,
dt_inicio 					datetime,
dt_fim 						datetime,
duracao_minuto 				int,
fk_cidade 					int,
fk_motivo 					int,
foreign key (fk_cidade) references cidade(id_cidade),
foreign key (fk_motivo) references motivo(id_motivo)
);

select * from distribuidora;

insert into distribuidora (cnpj, nome, sigla, numero)
values ('12.345.678/0001-90', 'Distribuidora Enel', 'DE', '12345');


*/