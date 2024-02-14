import Article from "./AR";
import Code from "./Code";

export default function TwitterSection({ twitter }) {
  const data = {};
  for (const key in twitter) {
    if (Object.prototype.hasOwnProperty.call(twitter, key)) {
      if (twitter[key].name !== undefined) {
        data[twitter[key].name] = twitter[key].content;
      }
    }
  }
  return (
    <Article
      title="Twitter"
      tag="meta"
      id="twitter"
      img={data["twitter:image"] || data["twitter:image:src"]}
    >
      {Object.values(twitter).map((i) => <Code meta={i} />)}
    </Article>

  )
}

