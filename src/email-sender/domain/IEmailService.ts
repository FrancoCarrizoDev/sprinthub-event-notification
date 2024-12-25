export const IEmailServiceKey = Symbol('IEmailService');

export interface IEmailService {
  sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string,
  ): Promise<void>;
}
