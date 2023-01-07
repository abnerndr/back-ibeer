import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./Product";

@Entity("files")
export class File {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "text" })
  public url: string;

  @Column({ type: "text" })
  public name: string;

  @Column({ type: "text" })
  public path: string;

  @OneToOne(() => Product, (product: Product) => product.photo)
  public product: Product;

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
