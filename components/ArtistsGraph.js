import { Sigma } from 'react-sigma'
import ForceLink from 'react-sigma/lib/ForceLink'

export default ({ artists }) => (
  <Sigma
    graph={artists}
    renderer="webgl"
    style={{ width: '100vw', height: '100vh' }}
    settings={{
      drawEdges: true,
      clone: false,
      immutable: true,
      verbose: true,
      labelSize: 'proportional'
    }}
  >
    <ForceLink gravity={1.5} randomize="globally" />
  </Sigma>
)
