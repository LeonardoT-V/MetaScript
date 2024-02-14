import AR from './AR'
import Code from './Code'

export default function RestData({ data }) {
  return (
    Object.getOwnPropertyNames(data).map((meta) => (
      <AR
        client:visible
        id={data[meta].name}
        title={data[meta]?.name?.replaceAll("-", " ")}
        tag={data[meta].tag}
      >
        <Code meta={data[meta]} />
      </AR>
    ))
  )
}
