import Handlebars from 'handlebars'
import fs from 'fs'
export interface ITemplateVariable {
    [key: string]: string | number
}

export interface IparseMailTemplate {
    file: string
    variables: ITemplateVariable
}

class HandleBarsMailTemplate {
    public async parse({
        file,
        variables,
    }: IparseMailTemplate): Promise<string> {
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf8',
        })
        const parseTemplate = Handlebars.compile(templateFileContent)

        return parseTemplate(variables)
    }
}

export default HandleBarsMailTemplate
