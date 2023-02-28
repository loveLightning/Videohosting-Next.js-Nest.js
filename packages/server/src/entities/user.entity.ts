import { Column, Index, Entity, BeforeInsert } from 'typeorm'
import { Model } from './model.entity'

export enum RoleEnumTypes {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User extends Model {
  @Index('email_index')
  @Column({
    unique: true,
  })
  email: string

  @Column()
  password: string

  @Column({
    type: 'enum',
    enum: RoleEnumTypes,
    default: RoleEnumTypes.USER,
  })
  user: RoleEnumTypes.USER

  @Column({
    default: 'default.png',
  })
  photo: string

  @Column({
    default: false,
  })
  verified: boolean

  toJSON() {
    return { ...this, password: undefined, verified: undefined }
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12)
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string,
  ) {
    return await bcrypt
  }
}
