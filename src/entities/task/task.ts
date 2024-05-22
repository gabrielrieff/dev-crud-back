import { v4 } from "uuid";

export class Task {
  public readonly id!: string;
  public readonly created_at!: Date;
  public readonly update_at!: Date;

  public title!: string;
  public description!: string | null;
  public userId!: string;
  public finish_at?: Date | null;

  constructor(
    props: {
      title: string;
      description: string | null;
      userId: string;
      finish_at?: Date | null;
    },
    id?: string,
    created_at?: Date,
    update_at?: Date
  ) {
    Object.assign(this, props);

    if (!this.id) {
      this.id = v4();
    }

    if (!this.created_at) {
      this.created_at = new Date();
    }

    if (!this.update_at) {
      this.update_at = new Date();
    }
  }

  static create(props: { title: string; description: string; userId: string }) {
    const task = new Task(props);
    return task;
  }

  // changeTitle(title: string) {
  //   if (this.title !== title) {
  //     this.title = title;
  //   }
  // }

  // changeDescription(description: string) {
  //   if (this.description !== description) {
  //     this.description = description;
  //   }
  // }
}
