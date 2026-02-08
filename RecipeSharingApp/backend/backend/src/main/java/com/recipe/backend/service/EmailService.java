package com.recipe.backend.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.url:http://localhost:4200}")
    private String appUrl;

    public void sendVerificationEmail(String toEmail, String firstName, String verificationToken) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("Xác nhận email của bạn - Recipe Share");

            String htmlContent = buildVerificationEmailHtml(firstName, verificationToken);
            helper.setText(htmlContent, true);

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send verification email", e);
        }
    }

    private String buildVerificationEmailHtml(String firstName, String verificationToken) {
        String verificationLink = appUrl + "/verify-email?token=" + verificationToken;

        return """
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .container {
                        background-color: #ffffff;
                        border-radius: 10px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        padding: 40px;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                    }
                    .logo {
                        width: 60px;
                        height: 60px;
                        background-color: #f97316;
                        border-radius: 50%;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 30px;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                    .title {
                        color: #1f2937;
                        font-size: 24px;
                        font-weight: bold;
                        margin: 0;
                    }
                    .content {
                        margin: 30px 0;
                    }
                    .button {
                        display: inline-block;
                        background-color: #f97316;
                        color: white;
                        padding: 14px 32px;
                        text-decoration: none;
                        border-radius: 8px;
                        font-weight: 600;
                        margin: 20px 0;
                    }
                    .button:hover {
                        background-color: #ea580c;
                    }
                    .footer {
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid #e5e7eb;
                        text-align: center;
                        color: #6b7280;
                        font-size: 14px;
                    }
                    .link {
                        color: #f97316;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="logo">R</div>
                        <h1 class="title">Recipe Share</h1>
                    </div>
                    
                    <div class="content">
                        <p>Xin chào <strong>%s</strong>,</p>
                        
                        <p>Cảm ơn bạn đã đăng ký tài khoản Recipe Share! Để hoàn tất quá trình đăng ký, vui lòng xác nhận địa chỉ email của bạn bằng cách click vào nút bên dưới:</p>
                        
                        <div style="text-align: center;">
                            <a href="%s" class="button">Xác Nhận Email</a>
                        </div>
                        
                        <p>Hoặc copy và paste link sau vào trình duyệt:</p>
                        <p style="background-color: #f3f4f6; padding: 10px; border-radius: 5px; word-break: break-all;">
                            <a href="%s" class="link">%s</a>
                        </p>
                        
                        <p><strong>Lưu ý:</strong> Link xác nhận này sẽ hết hạn sau 24 giờ.</p>
                        
                        <p>Nếu bạn không tạo tài khoản này, vui lòng bỏ qua email này.</p>
                    </div>
                    
                    <div class="footer">
                        <p>Đây là email tự động, vui lòng không trả lời email này.</p>
                        <p>© 2026 Recipe Share. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(firstName, verificationLink, verificationLink, verificationLink);
    }

    public void sendPasswordResetEmail(String toEmail, String firstName, String resetToken) {
        // TODO: Implement password reset email
        // Similar structure to verification email
    }
}
