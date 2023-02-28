import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm'

export abstract class Model extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string

  @CreateDateColumn() created_at: string

  @UpdateDateColumn() updated_at: string
}
