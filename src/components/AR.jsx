
export default function AR({title, tag, id, img, ...props}) {
  if(!title) {
    return
  }
  return (
    <article class="w-full space-y-2" id={`${id}`}>
    <header class="relative group">
      <a href={`#${id}`} class="opacity-80 font-medium text-xl">
        {title}
        <span class="opacity-60 text-xs ">{` <${tag} >`}</span>
      </a>
      <p class=" absolute top-0 -left-3 md:-left-4  group-hover:text-cyan-600 group-hover:opacity-60 text-xl md:opacity-20 transition-all opacity-0">
        #
      </p>
    </header>
    <div {...props} class="space-y-1.5">
      {img && (
        <div class="aspect-video">
          <img
            src={img}
            class="rounded aspect-video object-cover"
            alt={`${title} image`}
          />
        </div>
      )}
      {props.children}
    </div>
  </article>
  )
}
