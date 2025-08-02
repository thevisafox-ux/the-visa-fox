// EmailJS Configuration
// Replace these with your actual EmailJS credentials

export const emailConfig = {
  // EmailJS User ID (get from https://dashboard.emailjs.com/account)
  USER_ID: "LEkdN8R-v6EWLaIlb", // Your EmailJS Public Key
  
  // EmailJS Service ID - Your SMTP Service
  SERVICE_ID: "service_cb94t6d",
  
  // EmailJS Template ID (get from https://dashboard.emailjs.com/admin)
  TEMPLATE_ID: "template_b25gsf8", // Your EmailJS Template ID
  
  // Email template parameters
  getWelcomeEmailParams: (userData: any) => ({
    to_email: userData.email,
    to_name: `${userData.firstName} ${userData.lastName}`,
    user_name: userData.firstName,
    user_email: userData.email,
    user_area: userData.area,
    user_pincode: userData.pincode,
    user_mobile: userData.mobile,
    message: `Welcome to VisaFox! Your account has been successfully created.`,
    subject: "Welcome to VisaFox - Account Created Successfully!"
  })
};

// EmailJS Template Example:
/*
Subject: Welcome to VisaFox - Account Created Successfully!

Dear {{user_name}},

Welcome to VisaFox! 🎉

Your account has been successfully created with the following details:

📧 Email: {{user_email}}
📱 Mobile: {{user_mobile}}
📍 Area: {{user_area}}
🏷️ Pincode: {{user_pincode}}

We're excited to have you on board and look forward to helping you with all your visa-related needs.

Best regards,
The VisaFox Team
*/ 