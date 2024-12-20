import { v4 } from "uuid";

export class Task {
  public readonly id!: string;
  public readonly update_at!: Date;

  public userId!: string;
  public title!: string;
  public description!: string | null;
  public created_at!: Date;
  public finish_at?: Date | null;

  constructor(
    props: {
      userId: string;
      title: string;
      description: string | null;
      created_at: Date;
      finish_at?: Date | null;
    },
    id?: string,
    update_at?: Date
  ) {
    Object.assign(this, props);

    if (!this.id) {
      this.id = v4();
    }

    if (!this.created_at) {
      this.created_at = new Date(this.created_at);
    }

    if (!this.update_at) {
      this.update_at = new Date();
    }
  }

  static create(props: {
    userId: string;
    title: string;
    description: string;
    created_at: Date;
  }) {
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
