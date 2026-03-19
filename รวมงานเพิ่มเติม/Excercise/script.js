// ฟังก์ชันสลับโหมด Dark/B&W และ Light/Color
// เรียกใช้ทันทีเมื่อไฟล์ JS โหลด
(function themeSelector() {
    const themeToggleBtn = document.getElementById('mode-toggle');
    const themeLink = document.getElementById('theme-link');

    // ตรวจสอบค่า Theme ที่เก็บไว้ใน localStorage (ถ้าเคยตั้งค่าไว้)
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        themeLink.href = currentTheme;
        if (currentTheme === 'theme-bw.css') {
            themeToggleBtn.textContent = 'เปิดโหมด สีหลัก';
        }
    }

    // ฟังชั่นการคลิกปุ่ม Toggle
    themeToggleBtn.addEventListener('click', () => {
        // ตรวจสอบชื่อไฟล์ CSS ปัจจุบัน
        let themeHref = themeLink.getAttribute('href');
        let nextTheme, buttonText;

        // สลับไฟล์ CSS และข้อความบนปุ่ม
        if (themeHref === 'theme-color.css') {
            nextTheme = 'theme-bw.css';
            buttonText = 'เปิดโหมด สีหลัก';
        } else {
            nextTheme = 'theme-color.css';
            buttonText = 'เปิดโหมด ขาว-ดำ';
        }

        // อัปเดตไฟล์ CSS บนหน้าเว็บและข้อความปุ่ม
        themeLink.href = nextTheme;
        themeToggleBtn.textContent = buttonText;

        // บันทึกค่า Theme ลง localStorage เพื่อให้คงค่าหลัง Refresh
        localStorage.setItem('theme', nextTheme);
    });
})();


// ฟังก์ชันสลับเนื้อหาเมื่อคลิกเมนู
// เรียกใช้เมื่อ DOM พร้อม
document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.menu-link');
    const contentBlocks = document.querySelectorAll('.content-block');

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // ป้องกันการทำ Link Navigation ปกติ

            // 1. จัดการคลาส Active บนปุ่มเมนู
            // เอาคลาส Active ออกจากทุกเมนู
            menuLinks.forEach(item => item.classList.remove('active'));
            // เติมคลาส Active ให้เมนูที่ถูกคลิก
            link.classList.add('active');

            // 2. จัดการคอนเทนต์ที่แสดง
            // เอาคลาส Active ออกจากคอนเทนต์ทุกบล็อก (ซ่อนทั้งหมด)
            contentBlocks.forEach(block => block.classList.remove('active'));
            // ดึง ID ของคอนเทนต์ที่ต้องแสดงจาก Data Attribute ของลิงก์
            const contentIdToShow = link.getAttribute('data-content');
            const blockToShow = document.getElementById(`content-${contentIdToShow}`);
            // เติมคลาส Active ให้คอนเทนต์บล็อกที่ต้องการแสดง (แสดงผล)
            if (blockToShow) {
                blockToShow.classList.add('active');
            }
        });
    });
});