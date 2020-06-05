interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailTemplateTDO {
  file: string;
  variables: ITemplateVariables;
}
