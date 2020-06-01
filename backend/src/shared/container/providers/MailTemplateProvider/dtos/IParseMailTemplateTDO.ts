interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailTemplateTDO {
  template: string;
  variables: ITemplateVariables;
}
