SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;

DROP TABLE IF EXISTS `data`;
DROP TABLE IF EXISTS `cartridge`;

CREATE TABLE IF NOT EXISTS `cartridge` (
  `cartridge_id` int(16) NOT NULL AUTO_INCREMENT,
  `filter_id` int(16) NOT NULL,
  `state` int(2) NOT NULL,
  `actual_volume` float(16) NOT NULL,
  `max_volume` float(16) NOT NULL,
   PRIMARY KEY(cartridge_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `data` (
  `timestamp` int(16) NOT NULL,
  `filter_id` int(16) NOT NULL,
  `volume` float(16) NOT NULL,
  `pressure_c1` float(16) NOT NULL,
  `pressure_c2` float(16) NOT NULL,
   PRIMARY KEY(timestamp)
) ENGINE=InnoDB;

INSERT INTO `cartridge` (filter_id,state,actual_volume,max_volume)
VALUES ('0','1','0','2000'),
('0','1','0','2000');





