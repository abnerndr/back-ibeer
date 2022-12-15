import { Company } from './Company'
import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    @Generated("uuid")
    public id: string;


    @ManyToOne(() => Company, company => company.products)
    company: Company

    @Column({ type: "text" })
    public product_name: string;

    @Column({ type: "text" })
    public description?: string;

    @Column({ type: "text" })
    public photo_url?: string;

    @Column({ type: "simple-array" })
    public categories: string[];


    @Column({ type: "int" })
    public price_in_cents: number;

    @Column({ type: "int" })
    public discount_in_cents?: number;

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
