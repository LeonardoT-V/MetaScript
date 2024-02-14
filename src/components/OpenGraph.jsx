import AR from "./AR";
import Code from "./Code";

export default function OpenGraph({ og }) {
  let ogData = {};
  og.forEach((meta) => {
    ogData[meta.property] = meta.content;
  })

  return (
    <AR slot='nmame' title="Open Graph" id="og" tag="meta" img={ogData["og:image"]}>
      {Object.values(og).map((i) => <Code  meta={i} />)}
    </AR>
  )
}