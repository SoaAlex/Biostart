-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 05 fév. 2021 à 11:28
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `biostart`
--

-- --------------------------------------------------------

--
-- Structure de la table `cartridge`
--

DROP TABLE IF EXISTS `cartridge`;
CREATE TABLE IF NOT EXISTS `cartridge` (
  `cartridge_id` int(16) NOT NULL AUTO_INCREMENT,
  `filter_id` int(16) NOT NULL,
  `state` int(2) NOT NULL,
  `actual_volume` float NOT NULL,
  `max_volume` float NOT NULL,
  PRIMARY KEY (`cartridge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `cartridge`
--

INSERT INTO `cartridge` (`cartridge_id`, `filter_id`, `state`, `actual_volume`, `max_volume`) VALUES
(1, 0, 1, 4050, 2000),
(2, 0, 1, 3780, 2000);

-- --------------------------------------------------------

--
-- Structure de la table `data`
--

DROP TABLE IF EXISTS `data`;
CREATE TABLE IF NOT EXISTS `data` (
  `timestamp` int(16) NOT NULL,
  `filter_id` int(16) NOT NULL,
  `flow` int(16) NOT NULL,
  `pressure_c1` float NOT NULL,
  `pressure_c2` float NOT NULL,
  PRIMARY KEY (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `data`
--

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
