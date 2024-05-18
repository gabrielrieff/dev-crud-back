import { v4 } from "uuid";

export class Task {
  public readonly id!: string;

  public title!: string;
  public description!: string | null;
  public userId!: string;
  public created_at: Date;
  public update_at: Date;
  public finish_at?: Date | null;

  constructor(props: Omit<Task, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = v4();
    }

    this.created_at = new Date();
    this.update_at = new Date();
  }

  changeTitle(title: string) {
    this.title = title;
  }

  changeDescription(description: string) {
    this.description = description;
  }
}
