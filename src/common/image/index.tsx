type ImageViewProps = {
  srcUrl?: string
  alt?: string
  className?: string
}
export function ImageView(props: ImageViewProps) {
  return <img className={props.className} loading='lazy' src={props.srcUrl} alt={props.alt} />
}
