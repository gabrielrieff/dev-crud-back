import { v4 } from "uuid";

export class Task {
  public readonly id!: string;

  public title!: string;
  public description!: string | null;
  public userId!: string;
  public finish_at?: Date | null;

  constructor(props: Omit<Task, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = v4();
    }
  }
}
