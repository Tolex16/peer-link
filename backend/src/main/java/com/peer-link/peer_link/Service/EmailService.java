package com.dcg.digi_cap_group.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
@RequiredArgsConstructor
public class EmailService {

   @Autowired
   private final JavaMailSender javaMailSender;

    public void sendPasswordMail(String to, String firstName, String token) {
    String subject = "Digi Cap Group – Password Reset Request";

    String body =
        "<html>" +
        "<body style=\"font-family: Arial, sans-serif; background-color: #ffffff; margin: 0; padding: 20px; color: #333;\">" +

        "<div style=\"max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.05);\">" +

        "<h2 style=\"color: #1b5e20; margin-top: 0;\">Hello " + firstName + ",</h2>" +

        "<p>We received a request to reset the password for your <strong>Digi Cap Group</strong> account.</p>" +
        "<p>If you initiated this request, click the button below to securely reset your password:</p>" +

        "<div style=\"text-align: center; margin: 30px 0;\">" +
        "<a href=\"" + token + "\" " +
        "style=\"display: inline-block; padding: 14px 28px; background-color: #2e7d32; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;\">" +
        "Reset Password</a>" +
        "</div>" +

        "<p>If the button above doesn’t work, copy and paste this link into your browser:</p>" +
        "<p style=\"word-break: break-all;\">" +
        "<a href=\"" + token + "\" style=\"color: #2e7d32; text-decoration: underline;\">" + token + "</a>" +
        "</p>" +

        "<p><strong>Note:</strong> This link is valid for a limited time. If it expires, please request a new password reset.</p>" +
        "<p>If you did not request this action, you can safely ignore this email.</p>" +

        "<div style=\"margin-top: 35px;\">" +
        "<p>Warm regards,</p>" +
        "<p><strong>Digi Cap Group Team</strong></p>" +
        "</div>" +

        "<hr style=\"margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;\">" +

        "<p style=\"font-size: 12px; color: #888; text-align: center;\">" +
        "This is an automated message. Please do not reply to this email." +
        "</p>" +

        "</div>" +
        "</body>" +
        "</html>";


    MimeMessage message = javaMailSender.createMimeMessage();
    try {
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body, true);
        helper.setFrom(new InternetAddress("info@digicapgroup.org", "The DIGI Team"));
        helper.setReplyTo("noreply@yourdomain.com");

        // Inline logo
        Resource logoResource = new ClassPathResource("logo/icon.png");
        if (logoResource.exists()) {
            helper.addInline("DCG-Logo", logoResource);
            System.out.println("Logo found!");
        } else {
            System.out.println("Logo not found!");
        }

        // Inline signature
        Resource signatureResource = new ClassPathResource("logo/signature.png");
        if (signatureResource.exists()) {
            helper.addInline("signature", signatureResource);
            System.out.println("Signature found!");
        } else {
            System.out.println("Signature not found!");
        }

        javaMailSender.send(message);
    } catch (MessagingException | UnsupportedEncodingException e) {
        e.printStackTrace();
        // Log or throw custom exception
    }
}

    public void sendAccountReactivationMail(String to, String firstName, String lastName) {

    String subject = "Digi Cap Group – Account Reactivation Successful";

    String body =
        "<html>" +
        "<body style=\"font-family: Arial, sans-serif; line-height: 1.7; color: #333; background-color: #ffffff; margin: 0; padding: 20px;\">" +

        "<div style=\"max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.05);\">" +

        "<h2 style=\"color: #1b5e20; text-align: center; margin-top: 0;\">Hello " + firstName  + " " + lastName + ",</h2>" +

        "<p>We’re happy to let you know that your <strong>Digi Cap Group</strong> account has been successfully reactivated.</p>" +
        "<p>You now have full access to your account and can continue managing your investments, tracking performance, and exploring our platform.</p>" +

        "<div style=\"text-align: center; margin: 30px 0;\">" +
        "<a href=\"https://digicapgroup.org/login\" " +
        "style=\"display: inline-block; padding: 14px 28px; color: #ffffff; background-color: #2e7d32; border-radius: 6px; text-decoration: none; font-weight: bold;\">" +
        "Log In to My Account</a>" +
        "</div>" +

        "<div style=\"margin-top: 35px;\">" +
        "<p>Warm regards,</p>" +
        "<p><strong>Digi Cap Group Team</strong></p>" +
        "</div>" +

        "<div style=\"margin-top: 20px; display: flex; justify-content: space-between; align-items: center;\">" +
        "<img src=\"cid:signature\" alt=\"Team Signature\" style=\"width: 70px;\">" +
        "<img src=\"cid:DCG-Logo\" alt=\"Digi Cap Group Logo\" style=\"width: 70px;\">" +
        "</div>" +

        "<hr style=\"margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;\">" +

        "<p style=\"font-size: 12px; color: #888; text-align: center;\">" +
        "This is an automated message. Please do not reply. " +
        "For support, visit our <a href=\"https://digicapgroup.org/contact\" style=\"color: #2e7d32; text-decoration: underline;\">Contact Us</a> page." +
        "</p>" +

        "</div>" +
        "</body>" +
        "</html>";



        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true);
            helper.setFrom(new InternetAddress("info@digicapgroup.org", "The DIGI Team"));
            helper.setReplyTo("noreply@yourdomain.com");

            // Inline logo
            Resource logoResource = new ClassPathResource("logo/icon.png");
            if (logoResource.exists()) {
                helper.addInline("DAA-Logo", logoResource);
                System.out.println("Logo found!");
            } else {
                System.out.println("Logo not found!");
            }

            // Inline signature
            Resource signatureResource = new ClassPathResource("logo/signature.png");
            if (signatureResource.exists()) {
                helper.addInline("signature", signatureResource);
                System.out.println("Signature found!");
            } else {
                System.out.println("Signature not found!");
            }

            javaMailSender.send(message);
        } catch (MessagingException | UnsupportedEncodingException e) {
            e.printStackTrace();
            // Log or throw custom exception
        }
    }

    public void sendWelcomeMail(String to, String firstName, String lastName) {

    String subject = "Welcome to Digi Cap Group";

    String body =
        "<html>" +
        "<body style=\"font-family: Arial, sans-serif; line-height: 1.7; color: #333; background-color: #ffffff; margin: 0; padding: 20px;\">" +

        "<div style=\"max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.05);\">" +

        "<h2 style=\"color: #1b5e20; text-align: center; margin-top: 0;\">Welcome aboard, "
        + firstName + " " + lastName + "!</h2>" +

        "<p>We’re excited to have you join <strong>Digi Cap Group</strong>. Your account has been successfully created and is ready to use.</p>" +

        "<div style=\"text-align: center; margin: 30px 0;\">" +
        "<a href=\"https://digicapgroup.org/login\" " +
        "style=\"display: inline-block; padding: 14px 28px; color: #ffffff; background-color: #2e7d32; border-radius: 6px; text-decoration: none; font-weight: bold;\">" +
        "Log In to Your Account</a>" +
        "</div>" +

        "<div style=\"margin-top: 35px;\">" +
        "<p>Warm regards,</p>" +
        "<p><strong>Digi Cap Group Team</strong></p>" +
        "</div>" +

        "<div style=\"margin-top: 20px; display: flex; justify-content: space-between; align-items: center;\">" +
        "<img src=\"cid:signature\" alt=\"Team Signature\" style=\"width: 70px;\">" +
        "<img src=\"cid:DCG-Logo\" alt=\"Digi Cap Group Logo\" style=\"width: 70px;\">" +
        "</div>" +

        "<hr style=\"margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;\">" +

        "<p style=\"font-size: 12px; color: #888; text-align: center;\">" +
        "This is an automated message. Please do not reply." +
        "</p>" +

        "</div>" +
        "</body>" +
        "</html>";


        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true);
            helper.setFrom(new InternetAddress("info@digicapgroup.org", "The DIGI Team"));
            helper.setReplyTo("noreply@yourdomain.com");

            // Inline logo
            Resource logoResource = new ClassPathResource("logo/icon.png");
            if (logoResource.exists()) {
                helper.addInline("DAA-Logo", logoResource);
                System.out.println("Logo found!");
            } else {
                System.out.println("Logo not found!");
            }

            // Inline signature
            Resource signatureResource = new ClassPathResource("logo/signature.png");
            if (signatureResource.exists()) {
                helper.addInline("signature", signatureResource);
                System.out.println("Signature found!");
            } else {
                System.out.println("Signature not found!");
            }

            javaMailSender.send(message);
        } catch (MessagingException | UnsupportedEncodingException e) {
            e.printStackTrace();
            // Log or throw custom exception
        }
    }

    public void sendInactiveAccountWarningMail(String to, String firstName, String deletionDate) {

    String subject = "Digi Cap Group: Inactive Account Notice";

    String body =
        "<html>" +
        "<body style=\"font-family: Arial, sans-serif; line-height: 1.7; color: #333; background-color: #ffffff; margin: 0; padding: 20px;\">" +

        "<div style=\"max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.05);\">" +

        "<h2 style=\"color: #1b5e20; margin-top: 0;\">Account Activity Reminder</h2>" +

        "<p>Hello " + firstName + ",</p>" +

        "<p>We noticed that your <strong>Digi Cap Group</strong> account has been inactive for an extended period.</p>" +

        "<p>If no action is taken, your account and associated data are scheduled for permanent deletion on:</p>" +

        "<p style=\"font-size: 16px; font-weight: bold; color: #2e7d32;\">" +
        deletionDate +
        "</p>" +

        "<p>To keep your account active and retain access to your data, simply log in before this date.</p>" +

        "<div style=\"text-align: center; margin: 30px 0;\">" +
        "<a href=\"https://digicapgroup.org/login\" " +
        "style=\"display: inline-block; padding: 14px 28px; color: #ffffff; background-color: #2e7d32; border-radius: 6px; text-decoration: none; font-weight: bold;\">" +
        "Log In to Keep My Account</a>" +
        "</div>" +

        "<p>If you no longer wish to maintain your account, no further action is required. Your account will be automatically removed after the stated date.</p>" +

        "<div style=\"margin-top: 35px;\">" +
        "<p>Warm regards,</p>" +
        "<p><strong>Digi Cap Group Team</strong></p>" +
        "</div>" +

        "<div style=\"margin-top: 20px; display: flex; justify-content: space-between; align-items: center;\">" +
        "<img src=\"cid:signature\" alt=\"Team Signature\" style=\"width: 70px;\">" +
        "<img src=\"cid:DCG-Logo\" alt=\"Digi Cap Group Logo\" style=\"width: 70px;\">" +
        "</div>" +

        "<hr style=\"margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;\">" +

        "<p style=\"font-size: 12px; color: #888; text-align: center;\">" +
        "This is an automated message. Please do not reply." +
        "</p>" +

        "</div>" +
        "</body>" +
        "</html>";


        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true);
            helper.setFrom(new InternetAddress("info@digicapgroup.org", "The DIGI Team"));
            helper.setReplyTo("noreply@yourdomain.com");

            // Inline logo
            Resource logoResource = new ClassPathResource("logo/icon.png");
            if (logoResource.exists()) {
                helper.addInline("DAA-Logo", logoResource);
                System.out.println("Logo found!");
            } else {
                System.out.println("Logo not found!");
            }

            // Inline signature
            Resource signatureResource = new ClassPathResource("logo/signature.png");
            if (signatureResource.exists()) {
                helper.addInline("signature", signatureResource);
                System.out.println("Signature found!");
            } else {
                System.out.println("Signature not found!");
            }

            javaMailSender.send(message);
        } catch (MessagingException | UnsupportedEncodingException e) {
            e.printStackTrace();
            // Log or throw custom exception
        }
    }

    public void sendAccountDeletionMail(String to, String firstName, String deletionDate) {
        String subject = "Digi Cap Group: Account Deletion Confirmation";

        String body = "<html>"
                + "<body style=\"font-family: Arial, sans-serif; line-height: 1.7; color: #333; background-color: #ffffff; margin: 0; padding: 20px;\">" +

                "<div style=\"max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.05);\">" +

                 "<h2 style=\"color: #c0392b; text-align: center;\">Account Deletion Notice</h2>"
                + "<p>Dear " + firstName + ",</p>"
                + "<p>We wish to inform you that your <strong>Digi Asset Analytics</strong> account was permanently deleted on <strong>" + deletionDate + "</strong> due to prolonged inactivity.</p>"
                + "<p>All associated personal data, investment records, and account information have been securely removed from our systems in compliance with our data retention policy.</p>"
                + "<p>If you would like to continue using our services in the future, you can easily "
                + "<a href=\"https://digicapgroup.org/register\" style=\"color: #1a73e8; text-decoration: none; font-weight: bold;\">create a new account here</a>.</p>"

                + "<div style=\"margin-top: 30px;\">"
                + "<p>Kind regards,</p>"
                + "<p><strong>The Digi Cap Group Team</strong></p>"
                + "</div>"

                + "<div style=\"text-align: left; margin-top: 25px;\"><img src=\"cid:signature\" alt=\"Team Signature\" style=\"width: 70px;\"></div>"
                + "<div style=\"text-align: right; margin-top: 15px;\"><img src=\"cid:DCG-Logo\" alt=\"Digi Cap Group Logo\" style=\"width: 70px;\"></div>"

                + "<hr style=\"margin: 35px 0; border: none; border-top: 1px solid #ddd;\">"
                + "<p style=\"font-size: 12px; color: #888; text-align: center;\">This is an automated message. Please do not reply.</p>"

                + "</div>"
                + "</body>"
                + "</html>";


        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true);
            helper.setFrom(new InternetAddress("info@digicapgroup.org", "The DIGI Team"));
            helper.setReplyTo("noreply@yourdomain.com");

            // Inline logo
            Resource logoResource = new ClassPathResource("logo/icon.png");
            if (logoResource.exists()) {
                helper.addInline("DCG-Logo", logoResource);
                System.out.println("Logo found!");
            } else {
                System.out.println("Logo not found!");
            }

            // Inline signature
            Resource signatureResource = new ClassPathResource("logo/signature.png");
            if (signatureResource.exists()) {
                helper.addInline("signature", signatureResource);
                System.out.println("Signature found!");
            } else {
                System.out.println("Signature not found!");
            }

            javaMailSender.send(message);
        } catch (MessagingException | UnsupportedEncodingException e) {
            e.printStackTrace();
            // Log or throw custom exception
        }
    }
}