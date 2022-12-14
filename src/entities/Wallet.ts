import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Company } from "./Company";

@Entity("wallet")
export class Wallet {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "int", default: 0 })
  public account_receipt_amount: number;

  @Column({ type: "int", default: 0 })
  public withdrawn_amount: number;

  @OneToOne(() => Company, (company: Company) => company.wallet)
  @JoinColumn({ name: "company_id" })
  public company: Company;

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
