"use server"; // This marks all functions in this file as Server Actions

import emailjs from 'emailjs-com';

export async function sendEmail(formData) {
  const serviceID = process.env.EMAILJS_SERVICE_ID;
  const templateID = process.env.EMAILJS_TEMPLATE_ID;
  const userID = process.env.EMAILJS_USER_ID;

  // Validate environment variables
  if (!serviceID || !templateID || !userID) {
    console.error("EmailJS environment variables are not set!");
    return { error: "Server configuration error." };
  }

  const templateParams = {
    from_name: formData.get('name'),
    from_email: formData.get('email'),
    message: formData.get('message'),
  };

  try {
    await emailjs.send(serviceID, templateID, templateParams, userID);
    return { success: true };
  } catch (error) {
    console.error('EmailJS Error:', error);
    return { error: "Failed to send message." };
  }
}