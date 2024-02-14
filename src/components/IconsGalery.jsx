import Article from "./AR";

export default function IconsGalery({ icons }) {
  return <Article id="icons" title="Galery icons" tag="link">
    <section class="flex flex-col md:flex-row gap-8 flex-wrap">
      {
        icons.map((icon) => (
          <div class="flex flex-col gap-1 items-center">
            <img
              class="rounded max-h-32"
              src={icon.url}
              alt={`${icon?.rel} ${icon?.sizes ?? ""}`}
            />
            <p class="opacity-50 font-light text-xs">
              {icon?.rel} {icon.sizes}
            </p>
          </div>
        ))
      }
    </section>
  </Article>
}


