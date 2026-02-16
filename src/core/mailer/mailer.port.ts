export const MAILER_SERVICE = Symbol('MAILER_SERVICE')

export interface MailerPort {
    publish(content: string, recipient: string): Promise<void>
}