type SpecifcFieldStructure = {
  [id: string]: SpecifcFieldStructure | true
} | true;

export default SpecifcFieldStructure;