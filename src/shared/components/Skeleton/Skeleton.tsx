import classNames from 'classnames'

const Skeleton = ({ simple = false, className }: { simple?: boolean; className?: string }) => {
  return (
    <div className={classNames('flex animate-pulse items-center gap-4', className)}>
      {!simple && <div className="bg-border-neutral aspect-square h-10 rounded-2xl" />}

      <div className="bg-border-neutral h-10 flex-1 rounded-2xl" />
    </div>
  )
}

export default Skeleton
