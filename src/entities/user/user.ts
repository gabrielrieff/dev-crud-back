import { v4 } from "uuid";

export class User {
  public readonly id!: string;

  public first_name!: string;
  public last_name!: string;
  public password!: string;
  public email!: string;
  public token?: string;

  constructor(props: Omit<User, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = v4();
    }
  }
}
