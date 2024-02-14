
export default function Code({
  meta: { tag, type, ...el },
}) {
let code = "";
Object.entries(el).forEach((i) => (code = code + ` ${i[0]}="${i[1]}"`));
  return (
    <div class="!px-0">
    {`<${tag}${code} >`}
</div>
  )
}
