const Dot = ({ fill = '#022A9A', ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg width="9" height="8" viewBox="0 0 9 8" fill="none" {...props}>
    <circle cx="4.75" cy="4" r="4" fill={fill} />
    <mask
      id="mask0_13249_364"
      style={{ maskType: 'luminance' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="9"
      height="8"
    >
      <circle cx="4.75" cy="4" r="4" fill="white" />
    </mask>
    <g mask="url(#mask0_13249_364)"></g>
  </svg>
)

export default Dot
