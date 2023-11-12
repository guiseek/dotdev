const languageBase = 'pt-BR';
const publisherBase = 'Conteúdo de Dev';

export const base = (language = languageBase, publisher = publisherBase) => {
  // prettier-ignore
  const base = { title: '', subject: '', author: [], creator: '', description: '', contributor: [] }

  return { ...base, language, publisher };
};
