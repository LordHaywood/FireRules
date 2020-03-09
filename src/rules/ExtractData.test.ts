import { FieldExtractor } from "../config/generic/ConditionsConfigs";
import ProcessDataExtraction from "./ExtractData";

describe('ExtractData', () => {
  it('string', () => {
    const test: FieldExtractor = "testString";
    expect(ProcessDataExtraction(test, ['collectionName', '{docId}'])).toBe('"testString"');
  });
  
  it('number', () => {
    const test: FieldExtractor = 3456;
    expect(ProcessDataExtraction(test, ['collectionName', '{docId}'])).toBe('3456');
  });
  
  it('data', () => {
    const test: FieldExtractor = ["data", "dataField"];
    expect(ProcessDataExtraction(test, ['collectionName', '{docId}'])).toBe('resource.data.dataField');
  });
  
  it('param (invalid param format)', () => {
    const test: FieldExtractor = ["param", "{paramName}"];
    expect(() => ProcessDataExtraction(test, ['collectionName', '{docId}'])).toThrow(`Param '{paramName}' must be in [a-zA-Z_-]+ format`);
  });
  
  it('param (invalid document path)', () => {
    const test: FieldExtractor = ["param", "paramName"];
    const docPath: string[] = ['collectionName'];
    expect(() => ProcessDataExtraction(test, docPath)).toThrow(`Invalid document path 'collectionName'`);
  });
  
  it('param (throws incorrect param)', () => {
    const test: FieldExtractor = ["param", "paramName"];
    expect(() => ProcessDataExtraction(test, ['collectionName', '{docId}'])).toThrow(`Invalid param paramName, must be one of ['docId']`);
  });
  
  it('param (correct param)', () => {
    const test: FieldExtractor = ["param", "docId"];
    expect(ProcessDataExtraction(test, ['collectionName', '{docId}'])).toBe("docId");
  });
  
  it('postData', () => {
    const test: FieldExtractor = ["postData", "dataField"];
    expect(ProcessDataExtraction(test, ['collectionName', 'docId'])).toBe('request.resource.data.dataField');
  });
  
  it('prevData', () => {
    const test: FieldExtractor = ["prevData", "dataField"];
    expect(ProcessDataExtraction(test, ['collectionName', 'docId'])).toBe('resource.data.dataField');
  });

  it('externalDocData (throw incorrect document path)', () => {
    const test1: FieldExtractor = ["externalDocData", ['users', '{uid}'], "dataField"];
    expect(() => ProcessDataExtraction(test1, ['collectionName'])).toThrow(`Invalid document path 'collectionName'`);

    const test2: FieldExtractor = ["externalDocData", ['users'], "dataField"];
    expect(() => ProcessDataExtraction(test2, ['collectionName', 'docId'])).toThrow(`Invalid document path 'users'`);
  });
  
  it('externalDocData (allow direct path)', () => {
    const test: FieldExtractor = ["externalDocData", ['users', 'uid'], "dataField"];
    expect(ProcessDataExtraction(test, ['collectionName', '{docId}'])).toBe('get(/databases/$(database)/documents/users/uid).data.dataField');
  });
  
  it('externalDocData (throw no params)', () => {
    const test: FieldExtractor = ["externalDocData", ['users', '{uid}'], "dataField"];
    expect(() => ProcessDataExtraction(test, ['collectionName', 'docId'])).toThrow(`Invalid param {uid}, document path has no params`);
  });
  
  it('externalDocData (throw incorrect param)', () => {
    const test: FieldExtractor = ["externalDocData", ['users', '{uid}'], "dataField"];
    expect(() => ProcessDataExtraction(test, ['collectionName', '{docId}'])).toThrow(`Invalid param {uid}, must be one of [{docId}]`);
  });
  
  it('externalDocData (correct param)', () => {
    const test: FieldExtractor = ["externalDocData", ['users', '{uid}'], "dataField"];
    expect(ProcessDataExtraction(test, ['collectionName', '{uid}'])).toBe('get(/databases/$(database)/documents/users/{uid}).data.dataField');
  });
});