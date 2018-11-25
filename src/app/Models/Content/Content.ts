import { ArticleType } from './ArticleType';

export class Content {
    id: number;
    author: string;
    title: string;
    types: ArticleType[];
    shortDescription: string;
    articlePreviewAttachments: File[];
    article: string;
    editors: string[];
}
