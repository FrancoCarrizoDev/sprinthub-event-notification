export const EmailServiceTokens = {
  SendGrid: Symbol('SendGridEmailService'),
  Mock: Symbol('MockEmailService'),
  IEmailService: Symbol('IEmailService'), // Token para la interfaz
};
