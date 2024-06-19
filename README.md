# mspr-projet


## INSTALLATION DES DÉPENDANCES
npm install 


## MIGRATION DE LA BASE DE DONNÉE (CRÉATION DES TABLES)
cd express-backend
npx sequelize-cli db:migrate

CREATE TABLE Utilisateur (
   id_utl INTEGER AUTO_INCREMENT,
   nom_utl VARCHAR(100) NOT NULL,
   pre_ult VARCHAR(100) NOT NULL,
   age_utl INTEGER NOT NULL,
   num_utl VARCHAR(15) NOT NULL UNIQUE,
   eml_utl VARCHAR(100) NOT NULL UNIQUE,
   adr_utl VARCHAR(200) NOT NULL,
   psd_utl VARCHAR(50) NOT NULL UNIQUE,
   mdp_utl VARCHAR(100) NOT NULL,
   PRIMARY KEY(id_utl)
);

CREATE TABLE Conseil (
   id_cns INTEGER AUTO_INCREMENT,
   dsc_csn TEXT NOT NULL,
   PRIMARY KEY(id_cns)
);

CREATE TABLE Role (
   id_role INTEGER AUTO_INCREMENT,
   role_name VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_role)
);

CREATE TABLE UtilisateurRole (
   id_utl INTEGER,
   id_role INTEGER,
   PRIMARY KEY(id_utl, id_role),
   FOREIGN KEY(id_utl) REFERENCES Utilisateur(id_utl),
   FOREIGN KEY(id_role) REFERENCES Role(id_role)
);

CREATE TABLE Plante (
   id_plt INTEGER AUTO_INCREMENT,
   esp_plt VARCHAR(100) NOT NULL,
   dsc_plt TEXT NOT NULL,
   nom_plt VARCHAR(100) NOT NULL,
   adr_plt VARCHAR(200) NOT NULL,
   id_proprietaire INTEGER NOT NULL,
   id_gardien INTEGER NOT NULL,
   date_added DATETIME DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY(id_plt),
   FOREIGN KEY(id_proprietaire) REFERENCES Utilisateur(id_utl),
   FOREIGN KEY(id_gardien) REFERENCES Utilisateur(id_utl)
);

CREATE TABLE Image (
   id_img INTEGER AUTO_INCREMENT,
   dat_img DATETIME NOT NULL,
   url_img TEXT NOT NULL UNIQUE,
   id_utl INTEGER NOT NULL,
   id_plt INTEGER NOT NULL,
   PRIMARY KEY(id_img),
   FOREIGN KEY(id_utl) REFERENCES Utilisateur(id_utl),
   FOREIGN KEY(id_plt) REFERENCES Plante(id_plt)
);

CREATE TABLE Conseiller (
   id_cns INTEGER,
   id_utl INTEGER,
   PRIMARY KEY(id_cns, id_utl),
   FOREIGN KEY(id_cns) REFERENCES Conseil(id_cns),
   FOREIGN KEY(id_utl) REFERENCES Utilisateur(id_utl)
);

CREATE TABLE Donner (
   id_plt INTEGER,
   id_cns INTEGER,
   PRIMARY KEY(id_plt, id_cns),
   FOREIGN KEY(id_plt) REFERENCES Plante(id_plt),
   FOREIGN KEY(id_cns) REFERENCES Conseil(id_cns)
);

CREATE TABLE Conversation (
   id_conv INTEGER AUTO_INCREMENT,
   id_plt INTEGER NOT NULL,
   id_utl1 INTEGER NOT NULL,
   id_utl2 INTEGER NOT NULL,
   type ENUM('chat', 'email') NOT NULL,
   PRIMARY KEY(id_conv),
   FOREIGN KEY(id_plt) REFERENCES Plante(id_plt),
   FOREIGN KEY(id_utl1) REFERENCES Utilisateur(id_utl),
   FOREIGN KEY(id_utl2) REFERENCES Utilisateur(id_utl)
);

CREATE TABLE MessageConversation (
   id_msg INTEGER AUTO_INCREMENT,
   id_conv INTEGER NOT NULL,
   dat_msg DATETIME NOT NULL,
   txt_msg TEXT NOT NULL,
   id_sender INTEGER NOT NULL,
   status VARCHAR(20) DEFAULT 'unread',
   PRIMARY KEY(id_msg),
   FOREIGN KEY(id_conv) REFERENCES Conversation(id_conv),
   FOREIGN KEY(id_sender) REFERENCES Utilisateur(id_utl)
);


CREATE DEFINER=`root`@`localhost` EVENT `delete_old_messages_event` ON SCHEDULE EVERY 1 DAY STARTS '2024-06-19 11:04:08' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM messageconversations
    WHERE dat_msg < NOW() - INTERVAL 3 YEAR



    
# TEST 


