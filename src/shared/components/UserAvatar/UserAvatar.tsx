import type { HTMLAttributes } from 'react'
import classNames from 'classnames'

export interface UserAvatarProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  src: string
  size?: number
}

const UserAvatar = ({ name, src, size = 40, className, ...props }: UserAvatarProps) => (
  <div className={classNames('flex items-center gap-2', className)} {...props}>
    <img src={src} width={size} height={size} alt={`${name} avatar`} />
    <span>{name}</span>
  </div>
)

export default UserAvatar
