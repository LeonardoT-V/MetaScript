export default function Code({
  meta: { tag, type, ...el },
}) {
let code = "";
Object.entries(el).forEach((i) => (code = code + ` ${i[0]}="${i[1]}"`));
  return (
<pre
        style={{
          height: '100%',
          margin: 0,
          padding: 0,
          border: 0
        }}
        className={'!px-0'}
      >
        <code className={`language-html`}>{`<${tag}${code} >`}</code>
      </pre>
  )
}
