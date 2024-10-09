<?php include_once('db.php') ?>
<?php


class check_party extends db
{
    public function checkregis($opt)
    {
        $sql = "SELECT * FROM regis WHERE name_regis = ? AND pass_regis = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(1, $opt['name_regis']);
        $stmt->bindParam(2, $opt['pass_regis']);
        $stmt->execute();
        $count = $stmt->rowCount();
        if ($count > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function checkuserorid($opt)
    {
        $sql = "SELECT * FROM employee WHERE 1=1";
        $params = [];

       
        if (!empty($opt['emp_name'])) {
            $sql .= " AND emp_name LIKE ?";
            $params[] = '%' . $opt['emp_name'] . '%'; 
        }

        // ถ้ากรอก fcucode ให้ค้นหาตามรหัส FCU
        if (!empty($opt['fcucode'])) {
            $sql .= " AND fcucode LIKE ?";
            $params[] = '%' . $opt['fcucode'] . '%'; 
        }

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);

        if ($stmt->rowCount() > 0) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            return ['status' => 'error', 'message' => 'Not found'];
        }
    }

    public function getdata($fucode)
    {
        $sql = "SELECT * FROM show_register WHERE fsucode = ?";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(1, $fucode);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function addreserve($otp)
    {
        $sql = "INSERT INTO show_register (fsucode, date_regis, time_regis, user_regis, card_regis) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(1, $otp['fcucode']);
        $stmt->bindParam(2, $otp['date']);
        $stmt->bindParam(3, $otp['time']);
        $stmt->bindParam(4, $otp['emp_name']);
        $stmt->bindParam(5, $otp['card']);
        $stmt->execute();
        if($stmt == true){
            return ['status' => 'success'];
        }else{
            return ['status' => 'error', 'message' => 'Not found'];
        }
    }

    public function getInvitationCount()
    {
        $sql = "SELECT COUNT(*) as count FROM employee";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['count'];
    }

    public function getRegisteredCount()
    {
        $sql = "SELECT COUNT(*) as count FROM show_register";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['count'];
    }

    public function getEmployeeData()
    {
        $sql = "SELECT * FROM employee";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
/* $cus = new customer();
$cus->addcustomer("champ","thailand","09808080","123"); */
?>