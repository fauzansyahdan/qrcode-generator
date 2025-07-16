// Fungsi untuk clear form
function clearForm() {
    document.getElementById('text').value = '';
    
    // Hapus hasil QR code jika ada
    const resultDiv = document.querySelector('.result');
    if (resultDiv) {
        resultDiv.remove();
    }
}

// Fungsi untuk download QR code
function downloadQR() {
    const qrImage = document.getElementById('qrImage');
    if (!qrImage) return;

    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrImage.src;
    link.click();
}

// Fungsi untuk copy image ke clipboard
async function copyToClipboard() {
    const qrImage = document.getElementById('qrImage');
    if (!qrImage) return;

    try {
        // Convert data URL to blob
        const response = await fetch(qrImage.src);
        const blob = await response.blob();
        
        // Copy to clipboard
        await navigator.clipboard.write([
            new ClipboardItem({
                [blob.type]: blob
            })
        ]);
        
        // Show success message
        showNotification('QR Code berhasil disalin ke clipboard!', 'success');
    } catch (error) {
        showNotification('Gagal menyalin ke clipboard', 'error');
    }
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    if (type === 'success') {
        notification.style.background = '#28a745';
    } else {
        notification.style.background = '#dc3545';
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS animation for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Auto-resize textarea
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('text');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }
});