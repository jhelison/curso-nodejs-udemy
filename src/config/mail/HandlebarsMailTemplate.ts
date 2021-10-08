import Handlebars from 'handlebars'

export interface ITemplateVariable {
    [key: string]: string | number
}

export interface IparseMailTemplate {
    template: string
    variables: ITemplateVariable
}

class HandleBarsMailTemplate {
    public async parse({
        template,
        variables,
    }: IparseMailTemplate): Promise<string> {
        const parseTemplate = Handlebars.compile(template)

        return parseTemplate(variables)
    }
}

export default HandleBarsMailTemplate
