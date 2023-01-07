import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "text" })
  public product_name: string;

  @Column({ type: "text" })
  public product_description: string;

  @Column({ type: "text" })
  public product_amount: string;

  @Column({ type: "text" })
  public product_id: string;

  @Column({ type: "text" })
  public company_id: string;

  @Column({ type: "text" })
  public method: string;

  @Column({ type: "text" })
  public description: string;

  @Column({ type: "simple-json", default: {} })
  public product: {};

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
