import IParseMailTemplateTDO from '../dtos/IParseMailTemplateTDO';

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateTDO): Promise<string>;
}
