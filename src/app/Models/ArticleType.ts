export class ArticleType {
    id: number;
    name: string;

    public static areEqual(type1: ArticleType, type2: ArticleType): boolean {
        return type1.id === type2.id && type1.name === type2.name;
    }

    public static indexInArray(type: ArticleType, array: ArticleType[]): number {
        let index = -1;
        for (let i = 0; i < array.length && index === -1; ++i) {
            if (this.areEqual(type, array[i])) {
                index = i;
            }
        }
        return index;
    }
}
