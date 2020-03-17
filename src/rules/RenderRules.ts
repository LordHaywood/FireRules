type RenderedConfig = {
	[path: string]: {
		create?: string,
		read?: string,
		update?: string,
		delete?: string
	}
};

const Indent = (amount: number = 0) => `  `.repeat(amount);

const RenderRules = (renderRules: RenderedConfig): string => {
  const docRules: string[] = Object.keys(renderRules).sort().reduce((output: string[], path: string) => {
    const pathConfig = renderRules[path];
    let pathOut: string = '';
    pathOut += `${Indent(2)}match ${path} {\n`;
    if (pathConfig.create)
      pathOut += `${Indent(3)}allow create: if ${pathConfig.create};\n`;
    if (pathConfig.read)
      pathOut += `${Indent(3)}allow read: if ${pathConfig.read};\n`;
    if (pathConfig.update)
      pathOut += `${Indent(3)}allow update: if ${pathConfig.update};\n`;
    if (pathConfig.delete)
      pathOut += `${Indent(3)}allow delete: if ${pathConfig.delete};\n`;
    pathOut += `${Indent(2)}}\n`;

    output.push(pathOut);

    return output;
  }, []);

  return [
    `rules_version = '2';\n`,
    `service cloud.firestore {\n`,
    Indent(1) + `match /databases/{database}/documents {\n`,
    docRules.join(''),
    Indent(1) + `}\n`,
    `}`
  ].join('');
}