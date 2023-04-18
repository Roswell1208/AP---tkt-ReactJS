-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 18 avr. 2023 à 22:42
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bdd-cerza`
--

-- --------------------------------------------------------

--
-- Structure de la table `animal`
--

CREATE TABLE `animal` (
  `codeAnimal` varchar(16) NOT NULL,
  `nomAnimal` varchar(45) DEFAULT NULL,
  `taille` decimal(10,0) DEFAULT NULL,
  `poids` decimal(10,0) DEFAULT NULL,
  `age` varchar(45) DEFAULT NULL,
  `etatSante_idEtatSante` int(11) NOT NULL,
  `commentaireEtatSante` longtext DEFAULT NULL,
  `race_idRace` int(11) NOT NULL,
  `enclos_codeEnclos` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `animal`
--

INSERT INTO `animal` (`codeAnimal`, `nomAnimal`, `taille`, `poids`, `age`, `etatSante_idEtatSante`, `commentaireEtatSante`, `race_idRace`, `enclos_codeEnclos`) VALUES
('TIG1', 'Tigrou', '92', '250', '7', 1, NULL, 1, 'A');

-- --------------------------------------------------------

--
-- Structure de la table `avertissement`
--

CREATE TABLE `avertissement` (
  `idAvertissement` int(11) NOT NULL,
  `descriptionAvertissement` longtext DEFAULT NULL,
  `niveauAlerte_idNiveauAlerte` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `avertissement`
--

INSERT INTO `avertissement` (`idAvertissement`, `descriptionAvertissement`, `niveauAlerte_idNiveauAlerte`) VALUES
(1, 'Jérémy a perdu son doudou', 1),
(2, 'Une marmotte a prit un rhinocéros en otage', 4);

-- --------------------------------------------------------

--
-- Structure de la table `enclos`
--

CREATE TABLE `enclos` (
  `codeEnclos` varchar(16) NOT NULL,
  `emplacement` varchar(45) DEFAULT NULL,
  `capacite` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `enclos`
--

INSERT INTO `enclos` (`codeEnclos`, `emplacement`, `capacite`) VALUES
('A', '45', 10);

-- --------------------------------------------------------

--
-- Structure de la table `etatsante`
--

CREATE TABLE `etatsante` (
  `idEtatSante` int(11) NOT NULL,
  `libelleEtatSante` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `etatsante`
--

INSERT INTO `etatsante` (`idEtatSante`, `libelleEtatSante`) VALUES
(1, 'Bon'),
(2, 'Mauvais (Maladie - Blessure légère)'),
(3, 'Très mauvais (Blessure grave)');

-- --------------------------------------------------------

--
-- Structure de la table `missions`
--

CREATE TABLE `missions` (
  `idMission` int(11) NOT NULL,
  `descriptionMission` longtext DEFAULT NULL,
  `dateEcheanceMission` date DEFAULT NULL,
  `commentaireMission` longtext DEFAULT NULL,
  `estEffectuee` tinyint(4) DEFAULT 0,
  `user_username` varchar(16) NOT NULL,
  `prioriteMission_idPriorite` int(11) NOT NULL,
  `animal_codeAnimal` varchar(16) DEFAULT NULL,
  `enclos_codeEnclos` varchar(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `missions`
--

INSERT INTO `missions` (`idMission`, `descriptionMission`, `dateEcheanceMission`, `commentaireMission`, `estEffectuee`, `user_username`, `prioriteMission_idPriorite`, `animal_codeAnimal`, `enclos_codeEnclos`) VALUES
(1, 'Remplissage des graines enclos A', '2023-04-03', '', 0, 'user', 2, NULL, 'A'),
(2, 'Faire une piqure à TIG1 de l\'enclos A', '2023-04-02', 'Tigrou se porte mieux, son état reste à surveiller.', 1, 'user', 3, 'TIG1', 'A'),
(3, 'Mission de test pour un autre user', '2023-03-31', NULL, 0, 'muriennev', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `niveaualerte`
--

CREATE TABLE `niveaualerte` (
  `idNiveauAlerte` int(11) NOT NULL,
  `libelleNiveauAlerte` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `niveaualerte`
--

INSERT INTO `niveaualerte` (`idNiveauAlerte`, `libelleNiveauAlerte`) VALUES
(1, 'Faible'),
(2, 'Moyen'),
(3, 'Fort'),
(4, 'Très fort');

-- --------------------------------------------------------

--
-- Structure de la table `prioritemission`
--

CREATE TABLE `prioritemission` (
  `idPriorite` int(11) NOT NULL,
  `libellePriorite` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `prioritemission`
--

INSERT INTO `prioritemission` (`idPriorite`, `libellePriorite`) VALUES
(1, 'Faible'),
(2, 'Moyen'),
(3, 'Fort');

-- --------------------------------------------------------

--
-- Structure de la table `race`
--

CREATE TABLE `race` (
  `idRace` int(11) NOT NULL,
  `libelleRace` varchar(45) DEFAULT NULL,
  `descriptionRace` longtext DEFAULT NULL,
  `origine` varchar(45) DEFAULT NULL,
  `regime` varchar(45) DEFAULT NULL,
  `milieuDeVie` varchar(45) DEFAULT NULL,
  `gestation` varchar(45) DEFAULT NULL,
  `tailleMoy` decimal(10,0) DEFAULT NULL,
  `poidsMoy` decimal(10,0) DEFAULT NULL,
  `esperenceDeVie` int(3) DEFAULT NULL,
  `imgRace` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `race`
--

INSERT INTO `race` (`idRace`, `libelleRace`, `descriptionRace`, `origine`, `regime`, `milieuDeVie`, `gestation`, `tailleMoy`, `poidsMoy`, `esperenceDeVie`, `imgRace`) VALUES
(1, 'Tigre', 'Le Tigre est une espèce de mammifère carnivore de la famille des félidés.\r\nC\'est le plus grand félin sauvage et l\'un des plus grands carnivores terrestres.\r\n', 'Afrique du sud', 'Carnivore', 'Safari', '3 mois', '90', '200', 10, 'https://cdn-images.zoobeauval.com/zM1HFnAeuepTkTLUQ_L0DCfeDYc=/730x730/https%3A%2F%2Fs3.eu-west-3.amazonaws.com%2Fimages.zoobeauval.com%2F2020%2F06%2Fsticker-2-5ee1e87822b8c.jpg'),
(2, 'Chimpanzé', 'Le Chimpanzé est un animal appartenant à la famille des Hominidés. Ce genre comprend deux espèces : le Chimpanzé commun et le Chimpanzé nain, plus connu sous le nom de Bonobo.', 'Afrique équatoriale / tropicale', 'Herbivore', 'savanes', '8 mois', '145', '45', 32, 'https://cdn.futura-sciences.com/buildsv6/images/largeoriginal/3/0/9/309f208701_50037129_600px-chimpanzee-head-02.jpg'),
(3, 'Panda', 'Le panda géant est une espèce de mammifères, habituellement classée dans la famille des ursidés, endémique de la Chine centrale. Il fait partie de l\'ordre des Carnivores.', 'Eurasie et Afrique du Nord', 'Herbivore', 'prés', '9 mois', '120', '900', 20, 'https://img.20mn.fr/jIiQJWW4S1mpRq2Xb4SXmCk/1200x768_le-panda-geant-est-un-grand-amaateur-de-bambou\r\n'),
(4, 'Girafe', 'La Girafe du Nord, est une espèce proposée de girafe comprenant trois sous-espèces : la Girafe du Kordofan, Girafe du Soudan ou Girafe d\'Afrique de l\'Ouest ; la Girafe de Nubie.', 'Nord du Caucase', 'Herbivore', 'déserts, montagnes, forêts, plaines, vallées.', '12 mois', '170', '800', 27, 'https://www.parcanimalierlabarben.com/wp-content/uploads/2014/07/girafe-16042020-4-carre.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `idRole` int(11) NOT NULL,
  `libelleRole` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`idRole`, `libelleRole`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `username` varchar(16) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(32) NOT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `roles_idRole` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`username`, `email`, `password`, `lastname`, `firstname`, `roles_idRole`) VALUES
('admin', 'admin@gmail.com', 'Admin123', 'Dupont', 'Jean', 1),
('muriennev', 'muriennevincent@gmail.com', 'Vincent123', 'Murienne', 'Vincent', 2),
('user', 'user@gmail.com', 'User123', 'Murienne', 'Vincent', 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `animal`
--
ALTER TABLE `animal`
  ADD PRIMARY KEY (`codeAnimal`),
  ADD KEY `fk_animal_etatSante1_idx` (`etatSante_idEtatSante`),
  ADD KEY `fk_animal_race1_idx` (`race_idRace`),
  ADD KEY `fk_animal_enclos1_idx` (`enclos_codeEnclos`);

--
-- Index pour la table `avertissement`
--
ALTER TABLE `avertissement`
  ADD PRIMARY KEY (`idAvertissement`),
  ADD KEY `fk_avertissement_niveauAlerte1_idx` (`niveauAlerte_idNiveauAlerte`);

--
-- Index pour la table `enclos`
--
ALTER TABLE `enclos`
  ADD PRIMARY KEY (`codeEnclos`);

--
-- Index pour la table `etatsante`
--
ALTER TABLE `etatsante`
  ADD PRIMARY KEY (`idEtatSante`);

--
-- Index pour la table `missions`
--
ALTER TABLE `missions`
  ADD PRIMARY KEY (`idMission`),
  ADD KEY `fk_missions_user1_idx` (`user_username`),
  ADD KEY `fk_missions_prioriteMission1_idx` (`prioriteMission_idPriorite`),
  ADD KEY `fk_missions_animal1_idx` (`animal_codeAnimal`),
  ADD KEY `fk_missions_enclos1_idx` (`enclos_codeEnclos`);

--
-- Index pour la table `niveaualerte`
--
ALTER TABLE `niveaualerte`
  ADD PRIMARY KEY (`idNiveauAlerte`);

--
-- Index pour la table `prioritemission`
--
ALTER TABLE `prioritemission`
  ADD PRIMARY KEY (`idPriorite`);

--
-- Index pour la table `race`
--
ALTER TABLE `race`
  ADD PRIMARY KEY (`idRace`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRole`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`),
  ADD KEY `fk_user_roles1_idx` (`roles_idRole`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `avertissement`
--
ALTER TABLE `avertissement`
  MODIFY `idAvertissement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `etatsante`
--
ALTER TABLE `etatsante`
  MODIFY `idEtatSante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `missions`
--
ALTER TABLE `missions`
  MODIFY `idMission` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `niveaualerte`
--
ALTER TABLE `niveaualerte`
  MODIFY `idNiveauAlerte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `prioritemission`
--
ALTER TABLE `prioritemission`
  MODIFY `idPriorite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `race`
--
ALTER TABLE `race`
  MODIFY `idRace` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `idRole` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `animal`
--
ALTER TABLE `animal`
  ADD CONSTRAINT `fk_animal_enclos1` FOREIGN KEY (`enclos_codeEnclos`) REFERENCES `enclos` (`codeEnclos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_animal_etatSante1` FOREIGN KEY (`etatSante_idEtatSante`) REFERENCES `etatsante` (`idEtatSante`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_animal_race1` FOREIGN KEY (`race_idRace`) REFERENCES `race` (`idRace`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `avertissement`
--
ALTER TABLE `avertissement`
  ADD CONSTRAINT `fk_avertissement_niveauAlerte1` FOREIGN KEY (`niveauAlerte_idNiveauAlerte`) REFERENCES `niveaualerte` (`idNiveauAlerte`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `missions`
--
ALTER TABLE `missions`
  ADD CONSTRAINT `fk_missions_animal1` FOREIGN KEY (`animal_codeAnimal`) REFERENCES `animal` (`codeAnimal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_missions_enclos1` FOREIGN KEY (`enclos_codeEnclos`) REFERENCES `enclos` (`codeEnclos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_missions_prioriteMission1` FOREIGN KEY (`prioriteMission_idPriorite`) REFERENCES `prioritemission` (`idPriorite`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_missions_user1` FOREIGN KEY (`user_username`) REFERENCES `user` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_roles1` FOREIGN KEY (`roles_idRole`) REFERENCES `roles` (`idRole`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
