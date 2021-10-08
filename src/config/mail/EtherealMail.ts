import nodemailer from 'nodemailer'
import HandleBarsMailTemplate, {
    IparseMailTemplate,
} from './HandlebarsMailTemplate'

interface IMailContact {
    name: string
    email: string
}

interface ISendMail {
    to: IMailContact
    from?: IMailContact
    subject: string
    templateData: IparseMailTemplate
}

class EherealMail {
    static async sendMail({
        to,
        from,
        subject,
        templateData,
    }: ISendMail): Promise<void> {
        const account = await nodemailer.createTestAccount()

        const mailTemplate = new HandleBarsMailTemplate()

        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        })

        const message = await transporter.sendMail({
            from: {
                name: from?.name || 'Equipe API Vendas',
                address: from?.email || 'naoresponda@apivendas.com.br',
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await mailTemplate.parse(templateData),
        })

        console.log(`Message sent: ${message.messageId}`)
        console.log(`Preview url: ${nodemailer.getTestMessageUrl(message)}`)
    }
}

export default EherealMail
