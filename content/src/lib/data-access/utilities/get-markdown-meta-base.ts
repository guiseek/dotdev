type Language = `${Lowercase<string>}-${Uppercase<string>}`

const languageBase: Language = 'pt-BR';
const publisherBase: string = 'Conteúdo de Dev';

export const getMarkdownMetaBase = (
  language = languageBase,
  publisher = publisherBase
) => {
  // prettier-ignore
  const base = { title: '', subject: '', author: [], creator: '', description: '', contributor: [] }

  return { ...base, language, publisher } as Record<string, string | string[]>;
};
