-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 09, 2024 at 10:51 AM
-- Server version: 8.0.30
-- PHP Version: 8.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `check_party`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `fcucode` varchar(20) NOT NULL,
  `emp_name` varchar(200) NOT NULL,
  `emp_dev` varchar(100) NOT NULL,
  `emp_fac` varchar(20) NOT NULL,
  `emp_regis` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`fcucode`, `emp_name`, `emp_dev`, `emp_fac`, `emp_regis`) VALUES
('504100', 'นายสมชาย   ใจดี', 'คลังสินค้า', 'KKS', '1'),
('504101', 'นางสาวรัตนา   พิพัฒน์', 'บรรจุภัณฑ์', 'KKS', '1'),
('504102', 'นางพรทิพย์   สวัสดี', 'ผลิตน้ำ', 'KKP', '1'),
('504103', 'นายจักรพงษ์   บุญทวี', 'คลังสินค้า', 'KKS', '1'),
('504104', 'นางสาวมัลลิกา   ศรีสุข', 'บรรจุภัณฑ์', 'KKS', '1'),
('504105', 'นายวิชาญ   นาคดี', 'ผลิตน้ำ', 'KKP', '1'),
('504106', 'นางสาวกาญจนา   นวลใย', 'บรรจุภัณฑ์', 'KKS', '1'),
('504107', 'นายประเสริฐ   ใจเย็น', 'คลังสินค้า', 'KKS', '1'),
('504108', 'นางสาวจารุวรรณ   รัตนมณี', 'บรรจุภัณฑ์', 'KKS', '1'),
('504109', 'นายวราวุธ   ทองศรี', 'ผลิตน้ำ', 'KKP', '1');

-- --------------------------------------------------------

--
-- Table structure for table `regis`
--

CREATE TABLE `regis` (
  `id_regis` int NOT NULL,
  `name_regis` varchar(50) NOT NULL,
  `pass_regis` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `regis`
--

INSERT INTO `regis` (`id_regis`, `name_regis`, `pass_regis`) VALUES
(1, 'regis1', '1234'),
(2, 'regis2', '5678'),
(3, 'regis3', '1111'),
(4, 'regis4', '6666');

-- --------------------------------------------------------

--
-- Table structure for table `show_register`
--

CREATE TABLE `show_register` (
  `fsucode` varchar(20) NOT NULL,
  `date_regis` date NOT NULL,
  `time_regis` time NOT NULL,
  `user_regis` varchar(200) NOT NULL,
  `card_regis` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `show_register`
--

INSERT INTO `show_register` (`fsucode`, `date_regis`, `time_regis`, `user_regis`, `card_regis`) VALUES
('504107', '2024-10-09', '17:51:26', 'regis1', 'ลงทะเบียนพนักงาน');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `regis`
--
ALTER TABLE `regis`
  ADD PRIMARY KEY (`id_regis`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `regis`
--
ALTER TABLE `regis`
  MODIFY `id_regis` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
