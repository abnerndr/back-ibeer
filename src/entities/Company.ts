import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./Product";
import { Wallet } from "./Wallet";

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "uuid", nullable: true })
  public company_id?: string;

  @Column({ type: "simple-json", default: {}, nullable: true })
  public stripe_customer: {};

  @Column({ type: "simple-json", default: {}, nullable: true })
  public stripe_subscription: {};

  @Column({ type: "text" })
  public company_name: string;

  @Column({ type: "text" })
  public user_name: string;

  @Column({ type: "text", unique: true })
  public email: string;

  @Column({ type: "text" })
  public password: string;

  @Column({ type: "text", unique: true })
  public document: string;

  @Column({ type: "text" })
  public cellphone: string;

  @Column({ type: "text" })
  public description: string;

  @OneToMany("Product", (product: Product) => product.company, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  public products: Array<Product>;

  @OneToOne("Wallet", (wallet: Wallet) => wallet.company, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  public wallet: Wallet;

  @Column({ type: "simple-array" })
  public roles: string[];

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
