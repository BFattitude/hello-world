// --- 1. ส่วนการโหลดภาพ (Preload) ---
function preload() {
    // เปลี่ยนจากการสร้างรูปทรงสดๆ เป็นการโหลดไฟล์ภาพ
    this.load.image('monster', 'monster.png'); 
}

// --- 2. ส่วนการสร้างตัวละคร (ในฟังก์ชัน spawnStar เดิม) ---
function spawnMonster(scene) {
    const x = Phaser.Math.Between(50, 350);
    const y = Phaser.Math.Between(50, 400);
    
    // เปลี่ยนจาก .circle เป็น .sprite
    const monster = scene.physics.add.sprite(x, y, 'monster');
    
    // ปรับขนาดรูปภาพ (ถ้ารูปใหญ่เกินไป) ให้เหลือ 15% หรือตามความเหมาะสม
    monster.setScale(0.15); 
    
    // เพิ่มการเคลื่อนไหวนิดๆ ให้มันดูมีชีวิต (เช่น ลอยขึ้นลง)
    scene.tweens.add({
        targets: monster,
        y: y - 20,
        duration: 1000,
        ease: 'Sine.easeInOut',
        yoyo: true,
        loop: -1
    });

    stars.add(monster); // ใส่เข้าไปในกลุ่มเพื่อเช็คการชน
}

// --- 3. ส่วนการชน (Collision) ---
function collectMonster(player, monster) {
    monster.destroy(); // ลบตัวสม่ำเสมอตัวที่ถูกจับ
    score += 20; // สัตว์ประหลาดหายาก ให้คะแนนเยอะหน่อย!
    scoreText.setText('Score: ' + score);
    
    // สุ่มเกิดตัวใหม่
    spawnMonster(this);
}