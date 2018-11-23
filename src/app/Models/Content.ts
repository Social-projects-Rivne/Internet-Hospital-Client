import { ArticleType } from './ArticleType';

export class Content {
    id: number;
    author: string;
    title: string;
    types: ArticleType[];
    shortBody: string;
    slides: File[];
    article: string;
    editors: string[];
}
