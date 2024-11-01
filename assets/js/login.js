// Ẩn register-container khi trang được tải
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.register-container').style.display = 'none';
});

// Chuyển sang trang đăng ký
function showRegisterPage() {
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.register-container').style.display = 'block';
}

// Quay lại trang đăng nhập
document.querySelector('.back-icon').addEventListener('click', function() {
    document.querySelector('.register-container').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
});

   
// Cập nhật số điện thoại hiển thị
function updatePhoneNumber() {
    const phoneInput = document.getElementById('phone');
    const displayPhoneNumber = document.getElementById('display-phone-number');
    displayPhoneNumber.textContent = phoneInput.value;
}



// Kiểm tra thông tin đăng ký khi nhấn nút đăng ký
document.getElementById('register-btn').addEventListener('click', function() {
    // Lấy giá trị từ các trường nhập
    const fullName = document.querySelector('input[placeholder="Họ & tên*"]').value.trim();
    const email = document.querySelector('input[placeholder="Email*"]').value.trim();
    const password = document.querySelector('input[placeholder="Mật khẩu*"]').value;
    const confirmPassword = document.querySelector('input[placeholder="Xác nhận mật khẩu*"]').value;
    const agreement = document.getElementById('agreement').checked;

    // Kiểm tra họ tên
    if (!fullName) {
        alert('Vui lòng nhập họ tên.');
        return;
    }

    // Kiểm tra email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailPattern.test(email)) {
        alert('Vui lòng nhập địa chỉ email hợp lệ.');
        return; 
    }

    // Kiểm tra mật khẩu
    if (password.length < 6) {
        alert('Mật khẩu phải có ít nhất 6 ký tự.');
        return; 
    }

    // Kiểm tra mật khẩu xác nhận
    if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp.');
        return;
    }

    // Kiểm tra checkbox đồng ý
    if (!agreement) {
        alert('Vui lòng đồng ý với điều khoản.');
        return;
    }

    // Hiển thị modal khi đăng ký thành công
    document.getElementById('success-modal').style.display = 'block';
});

// Đóng modal khi nhấn vào nút đóng hoặc ra ngoài modal
document.querySelector('.close').addEventListener('click', closeModal);
window.addEventListener('click', function(event) {
    const modal = document.getElementById('success-modal');
    if (event.target === modal) {
        closeModal();
    }
});

// Hàm đóng modal
function closeModal() {
    document.getElementById('success-modal').style.display = 'none';
}
