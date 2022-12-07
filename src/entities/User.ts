import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
export class User {
	@PrimaryGeneratedColumn()
	@Generated('uuid')
	id: string

	@Column({ type: 'text' })
	name: string

	@Column({ type: 'text', unique: true })
	email: string

	@Column({ type: 'text' })
	password: string

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
	public created_at: Date;

	@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
	public updated_at: Date;
}
