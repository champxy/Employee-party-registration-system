document.addEventListener("DOMContentLoaded", function () {
    const background = document.getElementById("background");
  
    function createFirework() {
      const firework = document.createElement("div");
      firework.classList.add("firework");
  
      // กำหนดตำแหน่งสุ่มบนหน้าจอ
      const randomTop = Math.random() * 100;
      const randomLeft = Math.random() * 100;
      firework.style.top = `${randomTop}%`;
      firework.style.left = `${randomLeft}%`;
  
      // สุ่มขนาดและสีของพลุ
      const size = Math.random() * 150 + 10; // ขนาดสุ่ม
      firework.style.width = `${size}px`;
      firework.style.height = `${size}px`;
  
      // สุ่มสี
      const colors = ["#fbbf24", "#ef4444", "#3b82f6", "#22c55e", "#ec4899"];
      firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  
      background.appendChild(firework);
  
      // ลบพลุหลังจากที่มันจบการระเบิด
      setTimeout(() => {
        background.removeChild(firework);
      }, 3000); // 2 วินาทีหลังจากจบการระเบิด
    }
  
    // สร้างพลุทุก ๆ 0.5 วินาที
    setInterval(createFirework, 1000);
  });
  