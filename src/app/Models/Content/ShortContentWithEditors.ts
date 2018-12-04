import { ContentEdition } from './ContentEdition';

export class ShortContentWithEditors {
    id: number;
    author: string;
    title: string;
    types: string[];
    shortDescription: string;
    editions: ContentEdition[];
    dateOfCreation: Date;
    status: string;
    previewImageUrls: string[];
}
