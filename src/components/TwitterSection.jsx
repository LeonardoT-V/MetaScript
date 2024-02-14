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
      <section class="space-y-1">
        {
          Object.entries(data).map(
            (data) =>
              data[0] !== "image" && (
                <div class="text-sm  gap-x-0.5">
                  <p class="inline-flex opacity-80 font-medium capitalize">
                    {data[0]}:
                  </p>
                  {data[0] === "creator" || data[0] === "site" ? (
                    <a
                      href={`https://twitter.com/${data[1]}`}
                      target="_blank"
                      class="opacity-80 text-cyan-600"
                    >
                      {data[1]}
                    </a>
                  ) : (
                    <span class="opacity-60 ">
                      {!data[1].includes("https") ? (
                        (data[1])
                      ) : (
                        <a
                          class="text-cyan-600"
                          href={data[1]}
                          target="_blank"
                        >
                          Open link
                        </a>
                      )}
                    </span>
                  )}
                </div>
              ),
          )
        }
      </section>
      {Object.values(twitter).map((i) => <Code meta={i} />)}
    </Article>

  )
}

