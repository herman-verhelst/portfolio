import type {Tag} from "~/utils/models/tag";

export class Project {
    public id: number;
    public title: string;
    public subtitle: string;
    public tags: Tag[];
    public link: string;

    constructor(id: number, title: string, subtitle: string, tags: Tag[], link: string) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.tags = tags;
        this.link = link;
    }
}