import IParseMailTemplateTDO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateTDO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateTDO;
}
