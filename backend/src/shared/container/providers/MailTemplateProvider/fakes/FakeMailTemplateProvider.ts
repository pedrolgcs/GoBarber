// interface
import IParseMailTemplateTDO from '../dtos/IParseMailTemplateTDO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template }: IParseMailTemplateTDO): Promise<string> {
    return template;
  }
}

export default FakeMailTemplateProvider;
