import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Company } from "./Company";

@Entity("products")
export class Products {
  @PrimaryGeneratedColumn()
  @Generated("uuid")
  public id: string;

  @Column({ type: "text" })
  public product_name: string;

  @Column({ type: "text" })
  public description: string;

  @Column({ type: "text" })
  public photo_url: string;

  @Column({ type: "simple-array" })
  public categories: string[];

  @OneToMany(() => Company, (company) => company.id)
  @JoinTable()
  public company: Company[];

  @Column({ type: "int" })
  public price_in_cents: number;

  @Column({ type: "int" })
  public discount_in_cents: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updated_at: Date;
}
