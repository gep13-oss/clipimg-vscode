import * as vscode from 'vscode';
import { injectable } from 'inversify';
import { Liquid } from 'liquidjs';

@injectable()
export class TemplateService {
   private liquid: Liquid;
   private defaultTemplates: { [templateConfigKey: string] : string };

    constructor() {
        this.liquid = new Liquid();
        this.defaultTemplates = { };
        this.defaultTemplates['templateBlobName'] = '{{"now" | date: "%Y/%m/%d"}}/{{filename}}';
        this.defaultTemplates['templateBlobUri'] = '{{uri}}?{{sas}}';
        this.defaultTemplates['templateMarkdown'] = '![{{alt}}]({{uri}})';
    }

    async parseAndRender(templateConfigKey: string,
        scope?: object) : Promise<string> {
        let defaultTemplate = this.defaultTemplates[templateConfigKey];

        let config = vscode.workspace.getConfiguration('clipImg');
        let template = config.get(templateConfigKey, defaultTemplate);

        return await this.liquid.parseAndRender(template, scope);
    }
}
