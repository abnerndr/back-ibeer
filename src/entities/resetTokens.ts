import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("reset_tokens")
export class ResetTokens {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "text" })
  public email: string;

  @Column({ type: "text" })
  public token: string;

  @Column({ type: "int", default: 0 })
  public used: number;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  public expiration: Date;

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
