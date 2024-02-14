import { CodeBlock, monokaiSublime } from 'react-code-blocks';

export default function Code({
  meta: { tag, type, ...el },
}) {
  let code = "";
  Object.entries(el).forEach((i) => (code = code + ` ${i[0]}="${i[1]}"`));
  return (
    <CodeBlock text={`<${tag}${code} >`} language='html' theme={monokaiSublime} showLineNumbers={false} className='code_block'
    />
  )
}
