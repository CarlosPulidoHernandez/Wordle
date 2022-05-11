CREATE DATABASE  IF NOT EXISTS `wordleplayer` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `wordleplayer`;
-- MySQL dump 10.13  Distrib 8.0.26, for macos11 (x86_64)
--
-- Host: localhost    Database: wordleplayer
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `palabras`
--

DROP TABLE IF EXISTS `palabras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `palabras` (
  `palabra_id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `palabra` varchar(25) NOT NULL,
  `posicion` int DEFAULT NULL,
  `a1` bit(1) DEFAULT NULL,
  `a2` bit(1) DEFAULT NULL,
  `a3` bit(1) DEFAULT NULL,
  `a4` bit(1) DEFAULT NULL,
  `a5` bit(1) DEFAULT NULL,
  `b1` bit(1) DEFAULT NULL,
  `b2` bit(1) DEFAULT NULL,
  `b3` bit(1) DEFAULT NULL,
  `b4` bit(1) DEFAULT NULL,
  `b5` bit(1) DEFAULT NULL,
  `c1` bit(1) DEFAULT NULL,
  `c2` bit(1) DEFAULT NULL,
  `c3` bit(1) DEFAULT NULL,
  `c4` bit(1) DEFAULT NULL,
  `c5` bit(1) DEFAULT NULL,
  `d1` bit(1) DEFAULT NULL,
  `d2` bit(1) DEFAULT NULL,
  `d3` bit(1) DEFAULT NULL,
  `d4` bit(1) DEFAULT NULL,
  `d5` bit(1) DEFAULT NULL,
  `e1` bit(1) DEFAULT NULL,
  `e2` bit(1) DEFAULT NULL,
  `e3` bit(1) DEFAULT NULL,
  `e4` bit(1) DEFAULT NULL,
  `e5` bit(1) DEFAULT NULL,
  `f1` bit(1) DEFAULT NULL,
  `f2` bit(1) DEFAULT NULL,
  `f3` bit(1) DEFAULT NULL,
  `f4` bit(1) DEFAULT NULL,
  `f5` bit(1) DEFAULT NULL,
  `g1` bit(1) DEFAULT NULL,
  `g2` bit(1) DEFAULT NULL,
  `g3` bit(1) DEFAULT NULL,
  `g4` bit(1) DEFAULT NULL,
  `g5` bit(1) DEFAULT NULL,
  `gn1` bit(1) DEFAULT NULL,
  `gn2` bit(1) DEFAULT NULL,
  `gn3` bit(1) DEFAULT NULL,
  `gn4` bit(1) DEFAULT NULL,
  `gn5` bit(1) DEFAULT NULL,
  `h1` bit(1) DEFAULT NULL,
  `h2` bit(1) DEFAULT NULL,
  `h3` bit(1) DEFAULT NULL,
  `h4` bit(1) DEFAULT NULL,
  `h5` bit(1) DEFAULT NULL,
  `i1` bit(1) DEFAULT NULL,
  `i2` bit(1) DEFAULT NULL,
  `i3` bit(1) DEFAULT NULL,
  `i4` bit(1) DEFAULT NULL,
  `i5` bit(1) DEFAULT NULL,
  `j1` bit(1) DEFAULT NULL,
  `j2` bit(1) DEFAULT NULL,
  `j3` bit(1) DEFAULT NULL,
  `j4` bit(1) DEFAULT NULL,
  `j5` bit(1) DEFAULT NULL,
  `k1` bit(1) DEFAULT NULL,
  `k2` bit(1) DEFAULT NULL,
  `k3` bit(1) DEFAULT NULL,
  `k4` bit(1) DEFAULT NULL,
  `k5` bit(1) DEFAULT NULL,
  `l1` bit(1) DEFAULT NULL,
  `l2` bit(1) DEFAULT NULL,
  `l3` bit(1) DEFAULT NULL,
  `l4` bit(1) DEFAULT NULL,
  `l5` bit(1) DEFAULT NULL,
  `m1` bit(1) DEFAULT NULL,
  `m2` bit(1) DEFAULT NULL,
  `m3` bit(1) DEFAULT NULL,
  `m4` bit(1) DEFAULT NULL,
  `m5` bit(1) DEFAULT NULL,
  `n1` bit(1) DEFAULT NULL,
  `n2` bit(1) DEFAULT NULL,
  `n3` bit(1) DEFAULT NULL,
  `n4` bit(1) DEFAULT NULL,
  `n5` bit(1) DEFAULT NULL,
  `o1` bit(1) DEFAULT NULL,
  `o2` bit(1) DEFAULT NULL,
  `o3` bit(1) DEFAULT NULL,
  `o4` bit(1) DEFAULT NULL,
  `o5` bit(1) DEFAULT NULL,
  `p1` bit(1) DEFAULT NULL,
  `p2` bit(1) DEFAULT NULL,
  `p3` bit(1) DEFAULT NULL,
  `p4` bit(1) DEFAULT NULL,
  `p5` bit(1) DEFAULT NULL,
  `q1` bit(1) DEFAULT NULL,
  `q2` bit(1) DEFAULT NULL,
  `q3` bit(1) DEFAULT NULL,
  `q4` bit(1) DEFAULT NULL,
  `q5` bit(1) DEFAULT NULL,
  `r1` bit(1) DEFAULT NULL,
  `r2` bit(1) DEFAULT NULL,
  `r3` bit(1) DEFAULT NULL,
  `r4` bit(1) DEFAULT NULL,
  `r5` bit(1) DEFAULT NULL,
  `s1` bit(1) DEFAULT NULL,
  `s2` bit(1) DEFAULT NULL,
  `s3` bit(1) DEFAULT NULL,
  `s4` bit(1) DEFAULT NULL,
  `s5` bit(1) DEFAULT NULL,
  `t1` bit(1) DEFAULT NULL,
  `t2` bit(1) DEFAULT NULL,
  `t3` bit(1) DEFAULT NULL,
  `t4` bit(1) DEFAULT NULL,
  `t5` bit(1) DEFAULT NULL,
  `u1` bit(1) DEFAULT NULL,
  `u2` bit(1) DEFAULT NULL,
  `u3` bit(1) DEFAULT NULL,
  `u4` bit(1) DEFAULT NULL,
  `u5` bit(1) DEFAULT NULL,
  `v1` bit(1) DEFAULT NULL,
  `v2` bit(1) DEFAULT NULL,
  `v3` bit(1) DEFAULT NULL,
  `v4` bit(1) DEFAULT NULL,
  `v5` bit(1) DEFAULT NULL,
  `w1` bit(1) DEFAULT NULL,
  `w2` bit(1) DEFAULT NULL,
  `w3` bit(1) DEFAULT NULL,
  `w4` bit(1) DEFAULT NULL,
  `w5` bit(1) DEFAULT NULL,
  `x1` bit(1) DEFAULT NULL,
  `x2` bit(1) DEFAULT NULL,
  `x3` bit(1) DEFAULT NULL,
  `x4` bit(1) DEFAULT NULL,
  `x5` bit(1) DEFAULT NULL,
  `y1` bit(1) DEFAULT NULL,
  `y2` bit(1) DEFAULT NULL,
  `y3` bit(1) DEFAULT NULL,
  `y4` bit(1) DEFAULT NULL,
  `y5` bit(1) DEFAULT NULL,
  `z1` bit(1) DEFAULT NULL,
  `z2` bit(1) DEFAULT NULL,
  `z3` bit(1) DEFAULT NULL,
  `z4` bit(1) DEFAULT NULL,
  `z5` bit(1) DEFAULT NULL,
  `a` bit(1) DEFAULT NULL,
  `b` bit(1) DEFAULT NULL,
  `c` bit(1) DEFAULT NULL,
  `d` bit(1) DEFAULT NULL,
  `e` bit(1) DEFAULT NULL,
  `f` bit(1) DEFAULT NULL,
  `g` bit(1) DEFAULT NULL,
  `gn` bit(1) DEFAULT NULL,
  `h` bit(1) DEFAULT NULL,
  `i` bit(1) DEFAULT NULL,
  `j` bit(1) DEFAULT NULL,
  `k` bit(1) DEFAULT NULL,
  `l` bit(1) DEFAULT NULL,
  `m` bit(1) DEFAULT NULL,
  `n` bit(1) DEFAULT NULL,
  `o` bit(1) DEFAULT NULL,
  `p` bit(1) DEFAULT NULL,
  `q` bit(1) DEFAULT NULL,
  `r` bit(1) DEFAULT NULL,
  `s` bit(1) DEFAULT NULL,
  `t` bit(1) DEFAULT NULL,
  `u` bit(1) DEFAULT NULL,
  `v` bit(1) DEFAULT NULL,
  `w` bit(1) DEFAULT NULL,
  `x` bit(1) DEFAULT NULL,
  `y` bit(1) DEFAULT NULL,
  `z` bit(1) DEFAULT NULL,
  PRIMARY KEY (`palabra_id`),
  UNIQUE KEY `PALABRA_UNICA` (`palabra`)
) ENGINE=InnoDB AUTO_INCREMENT=58009 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-02 11:22:16
