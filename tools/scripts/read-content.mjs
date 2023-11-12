import { extract, grep, echo, cat, ls } from '../utilities/index.mjs';

const saveContent = echo('assets/content.json');
const content = ls('assets/content').filter(grep(/.md/));
saveContent(content.map((file) => ({ file, meta: extract(cat(file)) })));

const saveRoutes = echo('apps/content/src/routes.txt');
const routes = ls('assets/content', false).filter(grep(/.md/));
saveRoutes(routes.join('\n'));
