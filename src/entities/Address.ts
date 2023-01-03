import { Column } from "typeorm";

export class Address {
  @Column()
  public street: string;

  @Column()
  public street_number: string;

  @Column()
  public zip_code: string;

  @Column()
  public state: string;

  @Column()
  public city: string;

  @Column()
  public country: string;
}
